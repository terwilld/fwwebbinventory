const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const opts = { toJSON: { virtuals: true } };

const InventorySchema = new Schema({
    firstName: String,
    lastName: String,
    city: String,
    state: String,
    // geometry: {
    //     type: {
    //         type: String, // Don't do `{ location: { type: String } }`
    //         enum: ['Point'], // 'location.type' must be 'Point'
    //         required: true
    //     },
    //     coordinates: {
    //         type: [Number],
    //         required: true
    //     }
    // },

    zipcode: String,
    inventory: [
        {
            inventoryName: String,
            inventoryValue: Number
        }
    ]


    // image: String
    // images: [ImageSchema],

    // author: {
    //     type: Schema.Types.ObjectId,
    //     ref: "User"
    // },
    // reviews: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Review"
    // }]
}, opts);



module.exports = mongoose.model('Inventory', InventorySchema)

