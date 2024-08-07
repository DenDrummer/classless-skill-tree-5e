import { RequiredSkill } from "./RequiredSkill.js";
import { SkillOption } from "./SkillOption.js";
import { SkillRequirement } from "./SkillRequirement.js";
import { SkillTree } from "./SkillTree.js";
import { SkillTreeUtils } from "./SkillTreeUtils.js";

/**
 * A class representing a node in the {@link SkillTree}
 * @typedef {Object} SkillNode
 * @property {string} id The id of the skill, used to link a {@link RequiredSkill} to this one.  \
 *      Only shown and editable in GM-view.
 * @property {string} title The title of the skill.  \
 *      Should be a single line of text.
 * @property {string} description The title of the skill
 * @property {string} color the HEX color code for this color
 * @property {number} x The horizontal position of the node in the {@link SkillTree}.  \
 *      0 is intended to be the "center" and positive numbers are to the right of it.
 * @property {number} y The vertical position of the node in the {@link SkillTree}.  \
 *      0 is intended to be the "center" and positive numbers are down of it.
 * @property {Array<SkillRequirement>} requirements A list of other require
 * @property {Array<SkillOption>} options SubOptions. These are the things the user effectively "buys" with points.
 */
export class SkillNode {
    /**
     * Creates a new node representing a skill.
     * @param {string} id The id of the skill, used to link a {@link RequiredSkill} to this one.  \
     *      Only shown and editable in GM-view.
     * @param {string} title The title of the skill.  \
     *      Should be a single line of text.
     * @param {string} description The title of the skill
     * @param {string} color the HEX color code for this color
     * @param {number} x The horizontal position of the node in the {@link SkillTree}.  \
     *      0 is intended to be the "center" and positive numbers are to the right of it.
     * @param {number} y The vertical position of the node in the {@link SkillTree}.  \
     *      0 is intended to be the "center" and positive numbers are down of it.
     * @param {Array<SkillRequirement>} requirements A list of other require
     * @param {Array<SkillOption>} options SubOptions
     */
    constructor(
        id,
        title,
        description,
        color,
        x,
        y,
        requirements = [],
        options = [],
    ) {
        /** @type {string} */
        this.id = id;
        /** @type {string} */
        this.title = title;
        /** @type {string} */
        this.description = description;
        /** @type {string} */
        this.color = color;
        /** @type {number} */
        this.x = x;
        /** @type {number} */
        this.y = y;
        /** @type {Array<SkillRequirement>} */
        this.requirements = requirements;
        /** @type {Array<SkillOption>} */
        this.options = options;

        SkillTreeUtils.log(false, "SkillNode instance created");
        console.log(this);
    }

    /**
     * Check if this Skill Node is completely valid
     * @returns {Array<string>} a list of validation-error messages.
     */
    validate() {
        /** @type {Array<string>} */
        const errorMessages = [];

        if (!SkillTreeUtils.isValidId(this.id)) {
            errorMessages.push(`"${this.id}" is not a valid id.`);
        }

        if (!SkillTreeUtils.isValidColor(this.color)) {
            errorMessages.push(
                `"${this.color}" (found in "${this.id}") is not a valid color code.`,
            );
        }

        return errorMessages;
    }

    /**
     * Get the total of levels of this Skill and its sub-options
     * @returns {number} a number representing the total level of the node itself and its sub-options
     */
    totalLevel() {
        let total = this.level;

        this.options.forEach((option) => {
            total += option.level;
        });

        return total;
    }

    /**
     * Get the lowest cost possible to unlock this Skill Node
     * @returns {number} a number representing the lowest cost possible to unlock this node
     */
    getLowestCost() {
        let lowestCost = Number.MAX_SAFE_INTEGER;

        this.options.forEach((option) => {
            lowestCost = Math.min(lowestCost, option.getCurrentCost());
        });

        return lowestCost;
    }

    /**
     * Get the least amount of points you will need to spend to unlock this node.
     * @returns {number} A number representing the amount of points you will need to spend.
     */
    getCheapestPathCost() {
        if (this.totalLevel > 0 || this.requirements.length === 0) {
            return 0;
        }

        let pathCost = this.getLowestCost();

        const requirements = [...this.requirements];

        requirements.forEach((requirement) => {
            const parentSkills = [...requirement.getDirectParentSkills()];

            parentSkills.forEach((parentSkill) => {
                parentSkill.cost = parentSkill.getCheapestPathCost();
            });

            parentSkills.sort((a, b) => {
                return a.cost - b.cost;
            });

            SkillTreeUtils.log(false, "cheapest vs most expensive?");
            console.log(parentSkills);
        });

        return pathCost;
    }
}
