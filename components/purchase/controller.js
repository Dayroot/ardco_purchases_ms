const store = require('./store');

function createPurchase(data) {
    return store.create(data);
}

function getPurchase(filterPurchase){
    return store.get(filterPurchase)
}

function updatePurchase(data){
    if(!data._id){
        return Promise.reject('Invalid data');
    }
    return store.update(data)
}

function deletePurchase(id){
    if(!id){
        return Promise.reject('Invalid data');
    }
    return store.delete(id);
}

module.exports = {
    createPurchase,
    getPurchase,
    updatePurchase,
    deletePurchase,
}