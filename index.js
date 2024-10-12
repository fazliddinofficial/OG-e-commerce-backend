const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const Product = require('./modules/products/model/product');
const Joi = require('joi');
const { validateCreatedProduction } = require('./modules/users/validations');

app.use(express.json())

const PORT = 9000;

app.post('/api/post', async (req, res) => {

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
});
app.put('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product) {
            return res.status(404).send('wrong action');
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
        console.log('product updated')
    } catch (error) {
        res.status(500).send(error)
    }
})

app.get('/api/products', async (req, res) => {
    try {
        const foundProduct = await Product.find({})
        res.status(200).json(foundProduct);
    } catch (error) {
        res.status(404).send('not found')
    }
})
app.get('/api/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const foundProduct = await Product.findById(id)
        res.status(200).json(foundProduct);
        console.log(foundProduct)
    } catch (error) {
        res.status(404).send('product not found')
    }
})


app.delete('/api/products/product', async (req, res) => {
    try {
        const product = req.body
        const foundProduct = await Product.findOneAndDelete(product);
        if (!foundProduct) {
            return res.status(404).send('product not found')
        }
        res.status(200).send('deleted successfully')

    } catch (error) {
        res.status(400).send('error during deleting the product')
    }
})
app.put('/put', (req, res) => {
    res.send('put method is working')
})


mongoose.connect(process.env.MONGODB_URL).then(console.log('Mongodb connected'))
app.listen(PORT, () => console.log(`sever run on ${PORT}`));