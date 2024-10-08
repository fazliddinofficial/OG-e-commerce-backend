const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config()
const PORT = 9000;
const productSchema = require('./modules/products/model/product')

app.post('/create', (req, res) => {
    res.send('post method is working')
})
app.delete('/delete', (req, res) => {
    res.send('delete method')
})

app.get('/', (req, res) => {
    res.send('It works fine')
});
app.put('/put', (req, res) => {
    res.send('put method is working')
})




mongoose.connect(process.env.MONGODB_URL).then(console.log('Mongodb connected'))
app.listen(PORT, () => console.log(`sever run on ${PORT}`));