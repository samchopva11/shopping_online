const MyConstants = {
    DB_SERVER: process.env.DB_SERVER || 'cluster1.reu0rg8.mongodb.net',
    DB_USER: process.env.DB_USER || 'nguyenanhquoc077_db_user',
    DB_PASS: process.env.DB_PASS || 'As01868441031',
    DB_DATABASE: process.env.DB_DATABASE || 'shoppingonline',
    EMAIL_USER: process.env.EMAIL_USER || 'samchopva113@gmail.com',
    EMAIL_PASS: process.env.EMAIL_PASS || 'dsob qlsk ibjo zskr',
    JWT_SECRET: process.env.JWT_SECRET || 'caigicungduoc',
    JWT_EXPIRES: process.env.JWT_EXPIRES || '3600000',
};
module.exports = MyConstants;
