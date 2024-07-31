import { SkillNode } from "./SkillNode.js";
import { SkillRequirement } from "./SkillRequirement.js";

/** A class representing a Skill Tree */
export class SkillTree {
    /**
     * Create a new instance of a Skill Tree
     * @param {string} title The title of the {@link SkillTree}.  
     * Should be a single line of text.
     * @param {string} description The description of the {@link SkillTree}.
     * Should be a multiline piece of formatted text.
     * @param {[SkillNode]} skillNodes An array of {@link SkillNode}s
     */
    constructor(title, description, skillNodes) {
        this.title = title;
        this.description = description;
        this.skillNodes = skillNodes;
        this.rootNodes = this.findRootNodes();

        console.log("CST5E | SkillTree instance created");
        console.log(this);
    }
    
    /**
     * 
     * @returns {boolean} a list of {@link SkillNode}s that have no requirements, and thus are root nodes.
     * Root nodes are always unlocked.
     */
    findRootNodes() {
        console.log("CST5E | Finding root nodes")
        return this.skillNodes.filter(skillNode => {
            return skillNode.requirements.length == 0
        });
    }

    /**
     * Checks if this skill tree is completely valid.  
     * returns all the error messages in the current tree.
     * @returns {[string]}
     */
    validateTree() {
        const errorMessages = [];
        if (this.rootNodes.length == 0
        ) {
            errorMessages.add("There are no root-nodes. Make sure you have at least 1 node without requirements");
        }

        const skillIds = new Set();
        const warnedIds = new Set();
        this.skillNodes.forEach(skillNode => {
            const id = skillNode.id;

            if (skillIds.has(id) && !warnedIds.has(id)) {
                errorMessages.add(`Multiple nodes with id "${id}".`);
                warnedIds.add(id);
            } else {
                skillIds.add(id);
            }
        });

        this.skillNodes.forEach(skillNode => {
            skillNode.requirements.forEach(requirement => {
                const parentSkills = requirement.getParentSkills()
                parentSkills.forEach(parentSkill => {
                    if (!skillIds.has(parentSkill.id)) {
                        errorMessages.add(`Skill "${skillNode.id}" requires skill "${parentSkill.id}", which does not exist in this skill tree.`);
                    }
                })
            });
        });

        return errorMessages;
    }
}

console.log("CST5E | SkillTree Loaded");
