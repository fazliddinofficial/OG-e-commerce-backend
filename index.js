const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./modules/products/model/product');
const Joi = require('joi');
const { validateCreatedProduction } = require('./modules/users/validations');

app.use(express.json())

const PORT = 9000;

app.post('/', async (req, res) => {

    try {
        const { error, value } = validateCreatedProduction(req.body);
        if (error) {
            res.status(400).json(error)
            return;
        }
        const product = await Product.create(value);
        res.status(201).send(product)
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while creating the product')
    }
})
app.delete('/delete', (req, res) => {
    res.send('delete method')
})

app.get('/', (req, res) => {
    res.send('this is get request')
});
app.put('/put', (req, res) => {
    res.send('put method is working')
})


mongoose.connect(process.env.MONGODB_URL).then(console.log('Mongodb connected'))
app.listen(PORT, () => console.log(`sever run on ${PORT}`));