import mongoose from 'mongoose';
const { Schema } = mongoose;

const alertSchema = new Schema({
    _id: String,

    network: Number,
    score: Number,
    age: Number,
    suggestedPrice: Number,

    sku: {
        number: Number,
        description: String,
        master: Number,
        status: Number,
        price: Number,
        blendedCost: Number,

        subDept: String,
        dept: Number,
        cls: Number,
        ctgy: Number,
        subcls: Number,
        subsubcls: Number,
        quantity: Number,

        lastPrice: Number,
        lastChange: Date,
    },

    market: {
        name: String,
        number: String,
        mirror: Boolean,
    },

    r12: {
        dollars: Number,
        units: Number
    },

    retailLocked: Boolean,

    competitors: [ { name: String, price: Number } ],


    /**
     * Removed
     */
    // scoreRankIndicator: String,
    // priceExceptionId: String,
    // priceExceptionRuleTypeCode: Number,
    // multipleCompetitionFlag: Boolean,
    // suggestRetailSatisfyRuleFlag: Boolean,
    // currentRetailSatisfyRuleFlag: Boolean,
    // initMarkupDollar: Number,
    // initMarkupPercent: Number,
    // inventory: Number,
    // markup: Number,
    // priceEngineNetworkId: Number,
    // priceEngineRuleName: String,
    // priceExceptionRulePriorityNumber: Number,
});

const AlertModel = mongoose.model( 'alerts', alertSchema );
export default AlertModel;
