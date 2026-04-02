require('../utils/MongooseUtil');
const Models = require('../models/Models');

const CustomerDAO = {

    async selectByID(_id){
        const customer = await Models.Customer.findById(_id).exec();
        return customer;
    },

    async selectAll(){
        const query = {};
        const customers = await Models.Customer.find(query).exec();
        return customers;
    },

    async selectByUsernameOrEmail(username, email){
        const query = {$or: [{username:username}, {email:email}]};
        const customer = await Models.Customer.findOne(query);
        return customer;
    
    },

    async selectByUsernameAndPassword(username, password){
        const query = {username: username, password: password};
        const customer = await Models.Customer.findOne(query);
        return customer;
    },
    
    async insert(customer){
        // customer._id nên để Mongoose tự sinh ra nếu không cần thiết phải khởi tạo thủ công
        // hoặc đảm bảo mongoose đã được require ở đầu file để tránh lặp lại
        const result = await Models.Customer.create(customer);
        return result;
    
    },

    async active(_id, token, active){
        const query = {_id: _id, token: token};
        const newvalues = {active: active};
        const result = await Models.Customer.findOneAndUpdate(query, newvalues, {new: true});
        return result;
    },

    async update(customer){
        // Chỉ cập nhật những trường được cung cấp, bỏ qua các trường undefined/null
        const newvalues = {};
        if (customer.username) newvalues.username = customer.username;
        if (customer.password) newvalues.password = customer.password; 
        if (customer.name) newvalues.name = customer.name;
        if (customer.phone) newvalues.phone = customer.phone;
        if (customer.email) newvalues.email = customer.email;

        const result = await Models.Customer.findByIdAndUpdate(customer._id, newvalues, {new : true});
        return result;
    }
}
module.exports = CustomerDAO;