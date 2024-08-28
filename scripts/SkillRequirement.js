import { RequiredSkill } from "./RequiredSkill.js";
import { SkillNode } from "./SkillNode.js";

/**
 * Class representing a requirement group to unlock a Skill
 * @typedef {Object} SkillRequirement
 * @property {Array<RequiredSkill|SkillRequirement>} requiredItems An array of required items. These items are either a {@link SkillNode} or a {@link RequiredSkill}.  \
 *      This list must contain at least one valid item to be valid.
 * @property {"AND" | "OR" | "XOR" | "XNOR"} requirementType The way multiple required skills of sub-requirements interact with each other here:  \
 *      - AND  : All items are required to unlock the parent item.  \
 *      - OR   : Only 1 item is required to unlock the parent item.  \
 *      - XOR  : An odd amount of items is required to unlock the parent item.  \
 *      - XNOR : An even amount of items is required to unlock the parent item.  \
 *      Default: OR
 */
export class SkillRequirement {
    /**
     * Create a requirement group
     * @param {Array<RequiredSkill|SkillRequirement>} requiredItems An array of required items. These items are either a {@link SkillNode} or a {@link RequiredSkill}.  \
     *      This list must contain at least one valid item to be valid.
     * @param {"AND" | "OR" | "XOR" | "XNOR"} requirementType The way multiple required skills of sub-requirements interact with each other here:  \
     *      - AND  : All items are required to unlock the parent item.  \
     *      - OR   : Only 1 item is required to unlock the parent item.  \
     *      - XOR  : An odd amount of items is required to unlock the parent item.  \
     *      - XNOR : An even amount of items is required to unlock the parent item.  \
     *      Default: OR
     */
    constructor(requiredItems, requirementType = "OR") {
        /** @type {Array<RequiredSkill|SkillRequirement>} */
        this.requiredItems = requiredItems;
        /** @type {"AND" | "OR" | "XOR" | "XNOR"} */
        this.requirementType = requirementType;

        SkillTreeUtils.log(false, "SkillRequirement created");
        console.log(this);
    }

    /**
     * Gets all skills this requirement (and its sub-requirements) directly depend upon.  \
     *      Does not include the parents of its parent nodes recursively.
     * @returns {Set<SkillNode>}
     */
    getDirectParentSkills() {
        /** @type {Set<SkillNode>} */
        let parentSkills = new Set();

        this.requiredItems.forEach((requiredItem) => {
            // Object.getPrototypeOf(x).constructor.name is used to get which of the possible classes it was
            // if you know an easier way... PLEASE tell me
            /** @type {string} */
            const itemType =
                Object.getPrototypeOf(requiredItem).constructor.name;

            switch (itemType) {
                case RequiredSkill.name:
                    /** @type {RequiredSkill} */
                    const skillItem = requiredItem;
                    parentSkills.add(skillItem.skill);
                    break;

                case SkillRequirement.name:
                    /** @type {SkillRequirement} */
                    const requirementItem = requiredItem;
                    requirementItem.requiredItems.forEach(
                        (/** @type {SkillRequirement} */ subRequirement) => {
                            subRequirement
                                .getDirectParentSkills()
                                .forEach((parentSkill) => {
                                    parentSkills.add(parentSkill);
                                });
                        },
                    );
                    break;

                default:
                    throw new Error(
                        `Unknown item in list of requiredItems:\nType of: ${itemType}\n${requiredItem}`,
                    );
            }
        });

        return parentSkills;
    }
}
