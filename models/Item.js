const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ItemSchema = new Schema({
    itemName: {
        type: String,
        required: true
    },
    itemDescription: {
        type: String,
        default: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model("items", ItemSchema);
