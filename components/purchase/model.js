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
        product: {
            type: String,
        },
        quantity:{
            type: Number,
            default:1
        },
        status: {
            type: String,
            required: true,
            default: 'en espera',
            enum: {
                values: ['en espera', 'despachado','entregado'],
                message: '{VALUE} is not supported'
            }
        },
    }],
    total: {
        type: Number,
        required: true,
    },
    
});

purchaseSchema.pre('findOneAndUpdate', function (next) {
    this.options.runValidators = true;
    next();
})

const model = mongoose.model('Purchase', purchaseSchema);
module.exports = model;