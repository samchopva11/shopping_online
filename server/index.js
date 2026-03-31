const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const bodyParser = require('body-parser');
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

//deployment

const path = require('path');
// '/admin' serve the files at client-admin/build/* as static files
app.use('/admin', express.static(path.join(__dirname, '../client-admin/build')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client-admin/build', 'index.html'));
});

// '/customer' serve the files at client-customer/build/* as static files
app.use('/customer', express.static(path.join(__dirname, '../client-customer/build')));
app.get('/customer/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client-customer/build', 'index.html'));
});