import { ClasslessSkillTree5E } from "./ClassLessSkillTree.js";
import { RequiredSkill } from "./RequiredSkill.js";
import { SkillNode } from "./SkillNode.js";
import { SkillRequirement } from "./SkillRequirement.js";
import { SkillTree } from "./SkillTree.js";
import { SkillTreeUtils } from "./SkillTreeUtils.js";

SkillTreeUtils.log(false, "Main Loaded!");

Hooks.once("devModeReady", ({ registerPackageDebugFlag }) => {
    SkillTreeUtils.log(false, "Dev Mode Ready");
    registerPackageDebugFlag(ClasslessSkillTree5E.ID);
});

Hooks.on("init", () => {
    SkillTreeUtils.log(false, "Main Initialized!");
});

Hooks.on("ready", () => {
    SkillTreeUtils.log(false, "Main Available!");

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
            new SkillRequirement("OR", [
                new RequiredSkill(testSkillNode, 1, "<="),
            ]),
        ]
    );

    const testSkillTree = new SkillTree(
        "Test Tree",
        "This is a test to see if the Skill Tree class works.",
        [testSkillNode, testDependentNode]
    );

    const errorMessages = testSkillTree.validateTree();
    if (errorMessages.length > 0) {
        SkillTreeUtils.log(false, "Errors found in the Skill Tree:");
        errorMessages.forEach((errorMsg) => {
            console.warn(`CST5E | ${errorMsg}`);
        });
    }
});
