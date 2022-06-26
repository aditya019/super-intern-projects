const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        maxlength: 100
    },
    stage: {
        type: Number,
        required: true,
        enum: [1,2,3]
    }
});

module.exports = mongoose.model("Product", productSchema);