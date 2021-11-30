const Model = require('./model');

async function createPurchase(purchase){
    const newPurchase = new Model(purchase);
    return await newPurchase.save();
}

async function getPurchase(filterPurchase){
    return await Model.find(filterPurchase)
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

async function changeProductStatus(data){
    let productIndex;

    const purchase = await Model.findOne({ _id: data.purchaseId });
    
    if(!purchase){
        return Promise.reject('Invalid data');
    }
    
    purchase.products.forEach( (prod, index) => {
        if(prod.product == data.product)
            productIndex = index;  
    });
    
    const currentStatus = {status: purchase.products[productIndex].status };
    purchase.products[productIndex].status = data.status;
    await purchase.save();
    const result = purchase.products[productIndex];

    return { update: result, before:currentStatus }
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
    changeStatus: changeProductStatus,
    delete: deletePurchase,
}