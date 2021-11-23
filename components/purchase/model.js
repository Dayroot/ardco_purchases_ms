const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const purchaseSchema = new Schema({
    data: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: String,
        required: true,
    },
    products: [{
        product: {
            type: Schema.ObjectId,
            ref: 'Product'
        },
        quantity:{
            type: Number,
            default:1
        }
    }],
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    
});

const model = mongoose.model('Purchase', purchaseSchema);
module.exports = model;