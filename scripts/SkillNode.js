export class SkillNode {
    x = 0;
    y = 0;
    id = 'default';
    title = 'Default';
    description = 'Default skill node';
    childNodes = Array<SkillNode>([]);

    constructor() {
        this.childNodes = [];
        console.log("CST5E | SkillNode instance created");
    }

    validateTree(treePath){
        console.log("CST5E | Validating Tree Path: " + treePath);

        const pathNodes = treePath.split(".")

        let nodeA, nodeB;
        for (let i = 0; i < pathNodes.length; i++) {
            nodeA = pathNodes[i];

            for (let j = i+1; j < pathNodes.length; j++) {
                nodeB = pathNodes[j];

                if (nodeA===nodeB) {
                    return false;
                }
            }
        }

        childNodes.forEach(childNode => {
            if(!childNode.validateTree(treePath+"."+childNode.id)){
                return false;
            }
        });
        
        return true;
    }
}

console.log("CST5E | SkillNode Loaded");
