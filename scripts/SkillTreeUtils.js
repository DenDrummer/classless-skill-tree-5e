import { ClasslessSkillTree5E } from "./ClassLessSkillTree";

/**
 * A class with utility functions that can be used anywhere
 */
export class SkillTreeUtils {
    /**
     * Checks if an id is valid
     * @param {string} id the id you want to check the validity of.  \
     *      Uses the Regular Expression `/^[a-zA-Z0-9]+([_\-]?[a-z-A-Z0-9]+)*$/`  \
     *      This means that the id must be alphanumeric, but may have dashes and underscores in the middle, one at a time.
     * @returns {boolean} true if this is a valid id, false if it is invalid.
     */
    static isValidId(id) {
        return id.match(/^[a-zA-Z]+([_\-]?[a-z-A-Z0-9]+)*$/).length > 0;
    }

    /**
     * Checks if a string is a HEX color code
     * @param {string} color The string you want to check whether or not it is a valid HEX-code for a color.  \
     *      Uses the Regular Expression `/^#[0-9A-F]{6}$/`
     * @returns {boolean} true if this is a valid HEX color code, false if it is invalid.
     */
    static isValidColor(color) {
        return color.match(/^#[0-9A-F]{6}$/).length > 0;
    }

    /**
     * Output a log to the console with the package prefix if debug mode is on or force is true.
     * @param {boolean} force Whether to force output, or let Foundry Dev Mode setting decide.
     * @param  {...any} args The arguments you would otherwise give to console.log()
     */
    static log(force, ...args) {
        const shouldLog =
            force ||
            game.modules
                .get("_dev-mode")
                ?.api?.getPackageDebugValue(ClasslessSkillTree5E.ID);

        if (shouldLog) {
            console.log(`${ClasslessSkillTree5E.ID} | `, ...args);
        }
    }

    /**
     * Output a warning to the console with the package prefix if debug mode is on or force is true.
     * @param {boolean} force Whether to force output, or let Foundry Dev Mode setting decide.
     * @param  {...any} args The arguments you would otherwise give to console.warn()
     */
    static warn(force, ...args) {
        const shouldLog =
            force ||
            game.modules
                .get("_dev-mode")
                ?.api?.getPackageDebugValue(ClasslessSkillTree5E.ID);

        if (shouldLog) {
            console.warn(`${ClasslessSkillTree5E.ID} | `, ...args);
        }
    }
}
