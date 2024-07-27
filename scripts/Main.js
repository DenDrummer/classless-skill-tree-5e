import { SkillTree } from "./SkillTree.js";


console.log("CST5E | Main Loaded!");

Hooks.on("init", () => {
    console.log("CST5E | Main Initialized!");
    // Object.assign(CONFIG.JournalEntryPage.dataModels, {
    //     "classless-skill-tree-5e": SkillTree
    // });
});

Hooks.on("init", () => {
    console.log("CST5E | Main Available!");
    
    console.log(new SkillTree());
});
