const mongoose = require("mongoose");

const emiSchema = new mongoose.Schema({
    EMI: {type: Number, required: true},
    Principal_amount: {type: String, required: true},
    rate: {type: String, required: true},
    months: {type: String, required: true},
    userId: {type: String, required: true},
},{
    timestamps: true
})

const EMImodel = mongoose.model("emi", emiSchema)

module.exports = {EMImodel}