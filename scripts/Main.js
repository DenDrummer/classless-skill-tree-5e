import { RequiredSkill } from "./RequiredSkill.js";
import { SkillNode } from "./SkillNode.js";
import { SkillRequirement } from "./SkillRequirement.js";
import { SkillTree } from "./SkillTree.js";

console.log("CST5E | Main Loaded!");

Hooks.on("init", () => {
    console.log("CST5E | Main Initialized!");
});

Hooks.on("init", () => {
    console.log("CST5E | Main Available!");
    
    const testSkillNode = new SkillNode(
        "TestNode",
        "Test Node",
        "This is a test node to see if the Skill Node class works.",
        "#FFFFFF",
        0,
        0,
        []
    );

    const testDependentNode = new SkillNode(
        "DependentNode",
        "Dependent Node",
        "This is a test node to see if Skill Node requirements work",
        "#FFFFFF",
        100,
        0,
        [
            new SkillRequirement(
                "OR",
                [
                    testSkillNode
                ]
            )
        ]
    )
    
    const testSkillTree = new SkillTree(
        "Test Tree",
        "This is a test to see if the Skill Tree class works.",
        [
            testSkillNode,
            testDependentNode
        ]
    );

    const errorMessages = testSkillTree.validateTree();
    if (errorMessages.length > 0) {
        console.log("CST5E | Errors found in the Skill Tree:");
        errorMessages.forEach(errorMsg => {
            console.warn(`CST5E | ${errorMsg}`);
        });
    }
});
