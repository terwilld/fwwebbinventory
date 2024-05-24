const express = require('express')
const catchAsync = require('../utils/catchAsync');
const router = express.Router();
const customer = require('../controllers/customer.js')

router.get('/', catchAsync(customer.index))


// router.get('/new', checkAuthentication, campgrounds.renderNewForm)
router.get('/new', customer.renderNewForm)


router.post('/',
    // checkAuthentication,
    // validateInventory,
    catchAsync(customer.createInventory));



router.get('/:id', catchAsync(customer.showInventory))

module.exports = router;