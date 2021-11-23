
const purchase = require('../components/purchase/network');

const routes = function(server){
    
    server.use('/purchase', purchase);
}

module.exports = routes;