import { RequiredSkill } from "./RequiredSkill.js";
import { SkillRequirement } from "./SkillRequirement.js";
import { SkillTree } from "./SkillTree.js";
import { SkillTreeUtils } from "./SkillTreeUtils.js";

/**
 * A class representing a node in the {@link SkillTree}
 */
export class SkillNode {
    /**
     * Creates a new node representing a skill.
     * @param {string} id The id of the skill, used to link a {@link RequiredSkill} to this one.  
     *      Only shown and editable in GM-view.
     * @param {string} title The title of the skill.  
     *      Should be a single line of text. 
     * @param {string} description The title of the skill
     * @param {string} color the HEX color code for this color
     * @param {number} x The horizontal position of the node in the {@link SkillTree}.  
     *      0 is intended to be the "center" and positive numbers are to the right of it.
     * @param {number} y The vertical position of the node in the {@link SkillTree}.  
     *      0 is intended to be the "center" and positive numbers are down of it.
     * @param {[SkillRequirement]} [requirements=[]] A list of other require
     * @param {number} [level=0] The current amount of times this node has been bought.
     */
    constructor(
        id,
        title,
        description,
        color,
        x,
        y,
        requirements = [],
        level = 0
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.color = color;
        this.x = x;
        this.y = y;
        this.requirements = requirements;
        this.level = level;

        console.log("CST5E | SkillNode instance created");
        console.log(this);
    }
    
    /**
     * Check if this Skill Node is completely valid
     * @returns {[string]} a list of validation-error messages.
     */
    validate() {
        const errorMessages = []

        if (!SkillTreeUtils.isValidId(this.id)) {
            errorMessages.push(`"${this.id}" is not a valid id.`);
        }

        if (!SkillTreeUtils.isValidColor(this.color)) {
            errorMessages.push(`"${this.color}" (found in "${this.id}") is not a valid color code.`);
        }

        return errorMessages
    }
}

console.log("CST5E | SkillNode Loaded");
