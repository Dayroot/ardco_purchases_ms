const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const purchaseSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    userId: {
        type: String,
        required: true,
    },
    products: [{
        productId: {
            type: String,
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
        enum: {
            values: ['en espera', 'despachado','entregado'],
            message: '{VALUE} is not supported'
        }
    },
    
});

purchaseSchema.pre('findOneAndUpdate', function (next) {
    this.options.runValidators = true
    next()
})

const model = mongoose.model('Purchase', purchaseSchema);
module.exports = model;