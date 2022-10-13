const transactionController = require('../controllers/transactionController')
const authentication = require('../middleware/authentication')
const router = require('express').Router()



router.get("/qris", authentication, transactionController.qrisPayment)




module.exports = router