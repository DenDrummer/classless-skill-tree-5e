import { SkillNode } from "./SkillNode.js";

/** A class representing a skill being required and at what level(s) the requirement is met. */
export class RequiredSkill{
    /** 
     * Create a dependency on a {@link SkillNode} and define at which level(s) this requirement is met.
     * @param {SkillNode} skill The {@link SkillNode} that is being depended on.
     * @param {number = 1} [requiredLevel] The level the required skill is being compared to. Defaults to 1.
     * @param {"<" | "<=" | "==" | ">=" | ">"} [requirementType] 
    */
    constructor(skill, requiredLevel = 1, requirementType) {
        this.skill = skill;
        this.requiredLevel = requiredLevel;
        this.requirementType = requirementType;
        this.drawLine = drawLine;
        
        console.log("CST5E | RequiredSkill created");
        console.log(this);
    }
}
