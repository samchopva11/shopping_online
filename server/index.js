const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Tải các biến môi trường từ file .env
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
app.use(cors()); // Cho phép tất cả các domain truy cập (có thể giới hạn sau)
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from server!' });
});

//apis

app.use('/api/customer', require('./api/customer.js'));
app.use('/api/admin', require('./api/admin.js'));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
