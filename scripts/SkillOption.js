/**
 * A class representing an option of a {@link SkillNode}
 * @typedef {Object} SkillOption
 * @property {string} title
 * @property {string} description
 * @property {Array<number>} costs
 * @property {boolean} repeatable
 * @property {number} level
 */
export class SkillOption {
    /**
     * Create an option for a Skill
     * @param {string} title
     * @param {string} description
     * @param {Array<number>} costs A list of costs per level of this option.  \
     *      Requires at least a single entry.
     * @param {boolean} repeatable Whether the costs form a loop,  \
     *      making this option possible to be bought "infinitely"
     * @param {number} level The current amount of levels bought into this option.
     */
    constructor(title, description, costs = [1], repeatable = true, level = 0) {
        if (costs.length === 0) {
            throw new Error("");
        }

        this.title = title;
        this.description = description;
        this.costs = costs;
        this.repeatable = repeatable;
        this.level = level;
    }

    /**
     * Get the cost of the next level of this option, if available.
     * @returns {number|undefined} A number representing the cost to buy the next level of this option,  \
     *      or undefined if no new level is available
     */
    getCurrentCost() {
        if (this.level >= this.costs.length && !this.repeatable) {
            return;
        }

        return this.costs[this.level % this.costs.length];
    }

    /**
     * Get the total of of points spent on upgrading this option.
     * @returns {number} a number representing the total amount of points spent
     */
    getPointsSpent() {
        let totalCost = 0;

        for (let i = 0; i < this.level; i++) {
            totalCost += this.costs[i % this.costs.length];
        }

        return totalCost;
    }
}
