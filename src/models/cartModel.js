const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const cartSchema = new mongoose.Schema({

    userId: {
        type: ObjectId,
        required: true,
        ref: 'User',
        unique: true,
        trim: true
    },

    items: [{
        _id: false,
        productId: {
            type: ObjectId,
            required: true,
            ref: 'Product',
            trim: true
        },
        quantity: { // minimum 1
            type: Number,
            required: true,
            trim: true
        }
    }],

    totalPrice: { // comment: "Holds total price of all the items in the cart"
        type: Number,
        required: true,
        trim: true
    },

    totalItems: { // comment: "Holds total number of items in the cart"
        type: Number,
        required: true,
        trim: true
    },

},
    { timestamps: true }
)


module.exports = mongoose.model('Cart', cartSchema)