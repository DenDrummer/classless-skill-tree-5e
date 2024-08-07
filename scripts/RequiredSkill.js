import { SkillNode } from "./SkillNode.js";

/**
 * A class representing a skill being required and at what level(s) the requirement is met.
 * @typedef {Object} RequiredSkill
 * @property {SkillNode} skill The {@link SkillNode} that is being depended on.
 * @property {number} requiredLevel The level the required skill is being compared to.  \
 *      Default: 1
 * @property {"<" | "<=" | "==" | ">=" | ">"} requirementType How the current level of the required skill is compared to the required level of said skill.  \
 *      Default: "<="
 * @property {boolean} drawLine Whether to draw the line of this node to the required node.  \
 *      Default: true
 */
export class RequiredSkill {
    /**
     * Create a dependency on a {@link SkillNode} and define at which level(s) this requirement is met.
     * @param {SkillNode} skill The {@link SkillNode} that is being depended on.
     * @param {number} requiredLevel The level the required skill is being compared to.  \
     *      Defaults: 1
     * @param {"<" | "<=" | "==" | ">=" | ">"} requirementType How the current level of the required skill is compared to the required level of said skill.  \
     *      Default: "<="
     * @param {boolean} drawLine Whether to draw the line of this node to the required node.  \
     *      Default: true
     */
    constructor(
        skill,
        requiredLevel = 1,
        requirementType = "<=",
        drawLine = true,
    ) {
        /** @type {SkillNode} */
        this.skill = skill;
        /** @type {number} */
        this.requiredLevel = requiredLevel;
        /** @type {"<" | "<=" | "==" | ">=" | ">"} */
        this.requirementType = requirementType;
        /** @type {boolean} */
        this.drawLine = drawLine;

        SkillTreeUtils.log(false, "RequiredSkill created");
        console.log(this);
    }
}
