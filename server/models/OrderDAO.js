require('../utils/MongooseUtil');
const Models = require('./Models');

const OrderDAO= {
    async insert(order){
        const mongooser = require('mongoose');
        order._id = new mongooser.Types.ObjectId();
        const result = await Models.Order.create(order);
        return result;
    },

    async selectByCustID(_cid){
        const query = {'customer._id': _cid};
        const orders = await Models.Order.find(query).exec();
        return orders;
    },
}
module.exports = OrderDAO;
