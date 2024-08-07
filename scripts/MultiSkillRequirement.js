import { SkillRequirement } from "./SkillRequirement.js";

/**
 * A class representing a group of requirements of which the specified amount is required to unlock the parent item.
 * @typedef {Object} MultiSkillRequirement
 * @property {Array<RequiredSkill|SkillRequirement>} requiredItems An array of required items.  \
 *      These items are either a {@link SkillNode} or a {@link RequiredSkill}.  \
 *      This list must contain at least one valid item to be valid.
 * @property {number} requiredNumber The number of these items required to unlock the parent item.
 */
export class MultiSkillRequirement extends SkillRequirement {
    /**
     * Create a requirement group
     * @param {Array<RequiredSkill|SkillRequirement>} requiredItems An array of required items.  \
     *      These items are either a {@link SkillNode} or a {@link RequiredSkill}.  \
     *      This list must contain at least one valid item to be valid.
     * @param {number} requiredNumber The number of these items required to unlock the parent item.  \
     *      Default: 1
     */
    constructor(requiredItems, requiredNumber = 1) {
        this.requiredNumber = requiredNumber;
        this.requiredItems = requiredItems;

        SkillTreeUtils.log(false, "MultiSkillRequirement created");
        console.log(this);
    }
}
