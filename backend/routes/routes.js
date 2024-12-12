const express = require('express'),
router = express.Router(),
db = require('../database'),
request = require('request'),
http = require('http'),
compress = require('compression'),
path = require('path'),
userService = require('../services/userServices'),
productService = require('../services/productServices');
homeService = require('../services/dashboardServices');
const { login } = require('../services/authServices');
const verifyToken = require('./middleware');
const jwt = require('jsonwebtoken');



// Login route
router.post('/login', login);

// routing to the userServices
router.post('/getuser',userService.getEntireUser);
router.post('/getroles',userService.getUserRoles);
router.post('/getDesignation',userService.getallDesignations);
router.post('/createuser',userService.addUser);
router.post('/getviewData',userService.getviewData);
router.post('/updateuser',userService.modifyUser);
router.post('/deleteuserid',userService.deleteUser);

// routing to the productService
router.get('/getbrand',productService.getAllBrand);
router.get('/getcategory',productService.getAllCategory);
router.post('/createproduct',productService.addproduct);
router.get('/getproductlist',productService.getAllproducts);
router.post('/getproductDetails',productService.getProductData);
router.post('/updateproduct',productService.modifyProduct);
router.post('/deleteproductid',productService.deleteProduct);

router.post('/addsoldproduct',productService.addSales);
router.get('/getsaleslist',productService.getAllSales);
router.post('/generateInvoice',productService.invoiceGeneration);
router.post('/downloadInvoice',productService.invoiceDownload);

// to get details in dashboard
router.get('/getDetails',homeService.getAllDetails)

module.exports = router;
