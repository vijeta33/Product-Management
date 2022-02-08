const express = require('express');
const router = express.Router();

//---------------------------Project----------------------------//
const AWSController = require('../controllers/aws');
const cartController = require('../controllers/cartController');
const orderController = require('../controllers/orderController');
const productController = require('../controllers/productContoller');
const userController = require('../controllers/userController');
const myMiddleware = require('../middleWares/middleWare');
const validator = require('../validation/validation');


router.post("/write-file-aws", AWSController.myAws) 

//-------------------------------USer routes--------------------//

router.post('/register', validator.checkUser, userController.createUser) 
router.post('/login', userController.userLogin) 
router.get('/user/:userId/profile', myMiddleware.checkLogin, userController.getuserById) 
router.put('/user/:userId/profile', myMiddleware.checkLogin, validator.checkUserupdate, userController.updateProfile) 

//--------------------------Product Routes----------------------------//

router.post('/products', validator.checkProduct, productController.createProduct) 
router.get('/products', productController.productByQuery) 
router.get('/products/:productId', productController.productByParams) 
router.put('/products/:productId', validator.checkProductUpdate, productController.updateProductById) 
router.delete('/products/:productId', productController.deleteProductById) 

//-----------------------------Cart routes---------------//

router.post('/users/:userId/cart', myMiddleware.checkLogin, validator.authorizer, cartController.createCart) 
router.put('/users/:userId/cart', myMiddleware.checkLogin, validator.authorizer, cartController.updateCart) 
router.get('/users/:userId/cart', myMiddleware.checkLogin, validator.authorizer, cartController.getCart) 
router.delete('/users/:userId/cart', myMiddleware.checkLogin, validator.authorizer, cartController.deleteCart) 

//----------------------------------Order routes-----------------------------//

router.post('/users/:userId/orders', myMiddleware.checkLogin, validator.authorizer, orderController.creatOrder) 
router.put('/users/:userId/orders', myMiddleware.checkLogin, validator.checkOrder, orderController.cancelOrder) 


module.exports = router;


