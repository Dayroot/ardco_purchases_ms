const Model = require('./model');

async function createPurchase(purchase){
    const newPurchase = new Model(purchase);
    return await newPurchase.save();
}

async function getPurchase(filterPurchase){
    let filter = {};
    if(filterPurchase){
        filter = { _id: filterPurchase };
    }
    return await Model.find(filter)
}

async function updatePurchase(data){
    const result = await Model.findOneAndUpdate(
        { _id: data._id },
        data,
        { new: true }
    );

    if(!result){
        return Promise.reject('Id not valid');
    }
    return result
}

async function deletePurchase(id){
    const purchaseDeleted = await Model.deleteOne( { _id: id } );
    if(!purchaseDeleted){
        return Promise.reject('Id not valid');
    }
    return purchaseDeleted
}

module.exports = {
    create: createPurchase,
    get: getPurchase,
    update: updatePurchase,
    delete: deletePurchase,
}