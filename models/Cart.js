const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
    userId: {
        type: String,
    },
    items: [{
        productId: {
            type: String,
        },
        name: String,
        imageKey:  {
            type: String,
            required: true},
        description:  {
             type: String,
            required: true},
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            deafult: 1
        },
        price: Number
    }],
    bill: {
        type: Number,
        required: true,
        default: 0
    }
    //desc kidhsr hain ?
});

module.exports = Cart = mongoose.model('cart', CartSchema);