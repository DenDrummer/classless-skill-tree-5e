/**
 * A class with utility functions that can be used anywhere
 */
export class SkillTreeUtils {
    /**
     * Check if an id is valid
     * @param {string} id the id you want to check the validity of.  
     * Uses the Regular Expression `/^[a-zA-Z0-9]+([_\-]?[a-z-A-Z0-9]+)*$/`  
     * This means that the id must be alphanumeric, but may have dashes and underscores in the middle, one at a time.
     * @returns true if this is a valid id, false if it is invalid.
     */
    static isValidId(id) {
        return id.match(/^[a-zA-Z]+([_\-]?[a-z-A-Z0-9]+)*$/).length > 0;
    }

    /**
     * 
     * @param {string} color The string you want to check whether or not it is a valid HEX-code for a color.  
     * Uses the Regular Expression `/^#[0-9A-F]{6}$/`
     * @returns true if this is a valid HEX color code, false if it is invalid.
     */
    static isValidColor(color) {
        return color.match(/^#[0-9A-F]{6}$/).length > 0;
    }
}