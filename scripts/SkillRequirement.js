import { RequiredSkill } from "./RequiredSkill.js";
import { SkillNode } from "./SkillNode.js";

/** Class representing a requirement group to unlock a Skill */
export class SkillRequirement {
    /** 
     * Create a requirement group
     * @param {"AND" | "OR" | "XOR" | "XNOR"} requirementType The way multiple required skills of sub-requirements interact with each other here:  
     *      - AND  : All items are required to unlock the parent item.
     *      - OR   : Only 1 item is required to unlock the parent item.
     *      - XOR  : An odd amount of items is required to unlock the parent item.
     *      - XNOR : An even amount of items is required to unlock the parent item.
     * @param {[RequiredSkill | SkillRequirement]} requiredItems An array of required items. These items are either a {@link SkillNode} or a {@link RequiredSkill}.  
     *    This list must contain at least one valid item to be valid.
    */
    constructor(requirementType, requiredItems) {
        this.requirementType = requirementType;
        this.requiredItems = requiredItems;
        
        console.log("CST5E | SkillRequirement created");
        console.log(this);
    }

    /**
     * Gets all skills this requirement and its sub-requirements depend upon
     * @returns {Set<SkillNode>}
     */
    getParentSkills() {
        let parentSkills = new Set();

        this.requiredItems.forEach(requiredItem => {
            switch (Object.getPrototypeOf(requiredItem).constructor.name) {
                case RequiredSkill.name:
                    parentSkills.add(requiredItem.skill);
                    break;
            
                case SkillRequirement.name:
                    requiredItem.requiredItems.forEach(subRequirement => {
                        (SkillRequirement)(subRequirement).getParentSkills().forEach(parentSkill => {
                            parentSkills.add((SkillNode)(parentSkill));
                        })
                    });
                    break;
                
                default:
                    throw new Error(`Unknown item in list of requiredItems:\nType of: ${typeof requiredItem}\n${requiredItem}`);
            }
        });

        return parentSkills;
    }
}
