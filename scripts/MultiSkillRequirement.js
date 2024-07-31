import { SkillRequirement } from "./SkillRequirement.js";

/** A class representing a group of requirements of which the specified amount is required to unlock the parent item. */
export class MultiSkillRequirement extends SkillRequirement {
    /** 
     * Create a requirement group
     * @param {"AND" | "OR" | "XOR" | "N"} requiredNumber The number of items required to unlock the parent item.
     * @param {[RequiredSkill | SkillRequirement]} requiredItems An array of required items. These items are either a {@link SkillNode} or a {@link RequiredSkill}.  
     *    This list must contain at least one valid item to be valid.
    */
    constructor(requiredNumber, requiredItems) {
        this.requiredNumber = requiredNumber;
        this.requiredItems = requiredItems;

        console.log("CST5E | MultiSkillRequirement created");
        console.log(this);
    }
}
