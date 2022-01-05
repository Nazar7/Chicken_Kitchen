const wasteLimit = require('../data/tipAmount.json');

class TipsService {
    constructor() {
        this.max_tip = 0
    }

    getTipsValue() {
        this. getRandomChanceOfTips() == 0 ? this.max_tip : this.max_tip = wasteLimit['max tip']
        // console.log("rundomTips - " + this.max_tip)
        return this.max_tip;
    }

    getRandomChanceOfTips() {
        let rundomTips =  Math.round(Math.random());
        return rundomTips
    }

}
const tipsService = new TipsService();

module.exports = tipsService;