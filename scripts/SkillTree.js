import { SkillNode } from "./SkillNode.js";

export class SkillTree {
    title = '';
    rootNodes = [new SkillNode()];
    skillNodes = [new SkillNode()];

    constructor(){
        this.findRootNodes();
        console.log("CST5E | SkillTree instance created");
    }

    // static defineSchema() {
    //     return {
    //         title: String,
    //         skillNodes: Array = [new SkillNode()]
    //     };
    // }

    // prepareDerivedData() {
    //     this.findRootNodes();
    // }
    
    findRootNodes() {
        this.rootNodes = this.skillNodes;

        this.skillNodes.forEach(skillNode => {
            skillNode.childNodes.forEach(childNode => {
                this.rootNodes.filter(rootNode => {
                    return rootNode.id != childNode.id;
                });
            });
        });

        return this.rootNodes;
    }

    validateTree() {
        skillNodes.forEach(skillNode => {
            if (!skillNode.validateTree(skillNode.id)) {
                return false;
            }
        });
        return true;
    }
}

console.log("CST5E | SkillTree Loaded");
