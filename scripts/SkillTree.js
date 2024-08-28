import { SkillNode } from "./SkillNode.js";
import { SkillRequirement } from "./SkillRequirement.js";

/**
 * A class representing a Skill Tree
 * @typedef {Object} SkillTree
 * @property {string} title The title of the {@link SkillTree}.
 *      Should be a single line of text.
 * @property {string} description The description of the {@link SkillTree}.
 *      Should be a multiline piece of formatted text.
 * @property {Array<SkillNode>} skillNodes An array of {@link SkillNode}s
 */
export class SkillTree {
    /**
     * Create a new instance of a Skill Tree
     * @param {string} title The title of the {@link SkillTree}.
     * Should be a single line of text.
     * @param {string} description The description of the {@link SkillTree}.
     *      Should be a multiline piece of formatted text.
     * @param {Array<SkillNode>} skillNodes An array of {@link SkillNode}s
     */
    constructor(title, description, skillNodes) {
        this.title = title;
        this.description = description;
        this.skillNodes = skillNodes;
        this.rootNodes = this.findRootNodes();

        SkillTreeUtils.log(false, "SkillTree instance created");
        console.log(this);
    }

    /**
     *
     * @returns {Array<SkillNode>} a list of {@link SkillNode}s that have no requirements, and thus are root nodes.
     * Root nodes are always unlocked.
     */
    findRootNodes() {
        SkillTreeUtils.log(false, "Finding root nodes");
        return this.skillNodes.filter((skillNode) => {
            return skillNode.requirements.length == 0;
        });
    }

    /**
     * Checks if this skill tree is completely valid.  \
     *      Returns all the error messages in the current tree.
     * @returns
     */
    validateTree() {
        /**
         * @type {Array<string>}
         */
        const errorMessages = [];

        //#region --- AT LEAST ONE ROOT NODE ---
        if (this.rootNodes.length == 0) {
            errorMessages.push(
                "There are no root-nodes. Make sure you have at least 1 node without requirements",
            );
        }
        //#endregion --- AT LEAST ONE ROOT NODE ---

        //#region --- ALL SKILL NODE IDS UNIQUE ---
        const skillIds = new Set();
        const warnedIds = new Set();
        this.skillNodes.forEach((skillNode) => {
            const id = skillNode.id;

            // also check if the node itself is valid
            errorMessages.push(...skillNode.validate());

            if (skillIds.has(id) && !warnedIds.has(id)) {
                errorMessages.push(`Multiple nodes with id "${id}".`);
                warnedIds.add(id);
            } else {
                skillIds.add(id);
            }
        });
        //#endregion --- ALL SKILL NODE IDS UNIQUE ---

        //#region --- ALL REQUIREMENTS VALID ---
        this.skillNodes.forEach((skillNode) => {
            skillNode.requirements.forEach((requirement) => {
                const parentSkills = requirement.getDirectParentSkills();
                parentSkills.forEach((parentSkill) => {
                    if (!skillIds.has(parentSkill.id)) {
                        errorMessages.push(
                            `Skill "${skillNode.id}" requires skill "${parentSkill.id}", which does not exist in this skill tree.`,
                        );
                    }
                });
            });
        });
        //#endregion --- ALL REQUIREMENTS VALID ---

        return errorMessages;
    }
}

SkillTreeUtils.log(false, "SkillTree Loaded");
