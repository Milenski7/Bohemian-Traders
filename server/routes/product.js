const express = require('express');
const router = express.Router();
const { Product } = require('../models/Product');
const formidable = require('formidable');
const multiparty = require('multiparty');
const fs = require('fs');

router.get("/:link", async (req, res, next) => {
    try {
        const products = await Product.find({ link: req.params.link }).select('_id title price category');
        if (!products) return res.status(404).send('Products not found...');
        res.send(products);
    } catch (ex) {
        console.error(ex);
        next();
    }
});

router.get("/individual/:id", async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).send('Product could not be found...');
        res.send(product);
    } catch (ex) {
        console.error(ex);
        next();
    }
});

router.post("/products/search", async (req, res, next) => {
    try {
        const products = await Product.find({ title: { $regex: `${req.body.text}` } }).limit(req.body.splice).select('title _id thumbnail price link');
        if (!products) return res.status(404).send("products not found...");
        res.send(products);
    } catch (ex) {
        console.error(ex);
        next();
    }
});

router.get('/get-product-ids/:category', async (req, res, next) => {
    try {
        const products = await Product.find({ link: req.params.category }).select('_id');
        if (!products) return res.status(404).send('products not found...');
        res.send(products);
    } catch (ex) {
        console.error(ex);
        next();
    }
});

router.post("/get-cart-item", async (req, res, next) => {
    try {
        const cart = [...req.body.cart];
        let ids = [];
        cart.map(item => ids.push(item._id));
        const products = await Product.find({ _id: { $in: ids } }).select('_id title description price thumbnail quantity');
        if (!products) return res.status(404).send('Product not found...');
        res.send(products);
    } catch (ex) {
        console.error(ex);
        next();
    }
});

router.put("/update-quantity/:id", async (req, res, next) => {
    try {
        const product = await Product.updateOne({ _id: req.params.id }, {
            quantity: req.body.quantity
        });
        if (!product) return res.status(404).send('Product not found ...');
        res.send('product quantity updated successfully');
    } catch (ex) {
        console.error(ex);
        next();
    }
});

router.get('/get-photo/:id', async (req, res, next) => {
    try {
        const photo = await Product.findById(req.params.id).select('thumbnail');
        res.send(photo.thumbnail.data);
    } catch (ex) {
        console.error(ex);
        next();
    }
});

router.post("/new", async (req, res, next) => {
    try {
        let form = new multiparty.Form();
        form.keepExtensions = true;
        form.parse(req, async (err, fields, files) => {
            if (err) return res.status(400).send('Invalid request.');
            const { title, description, price, category, link } = fields;
            if (!title || !description || !price || !category || !link) {
                return res.status(400).send('All fields are required.');
            };
            let product = new Product({
                title: fields.title[0], description: fields.description[0], price: fields.price[0], category: fields.category[0],
                link: fields.link[0]
            });
            if (files.thumbnail) {
                if (files.thumbnail[0].size > 2000000) {
                    return res.status(400).send('Image could not be larger than 2MB.');
                }
                product.thumbnail.data = fs.readFileSync(files.thumbnail[0].path);
                product.thumbnail.contentType = files.thumbnail[0].headers['content-type'];
            };
            if (files.photos) {
                files.photos.map(photo => {
                    const curPhoto = { data: fs.readFileSync(photo.path), contentType: photo.headers['content-type'] };
                    product.photos.push(curPhoto);
                });
            };
            await product.save();
            res.send('Product created successfully');
        })
    } catch (ex) {
        console.error(ex);
        next();
    }
});

module.exports = router;