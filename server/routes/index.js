const router = require("express").Router();
const userRouter = require("./user")
const apiRouter = require("./api")
const transactionRouter = require("./transaction")

// router.get("/", (req, res) => res.send("Hello World!"));
router.use("/user", userRouter)
router.use("/", apiRouter)
router.use("/transaction", transactionRouter)





module.exports = router;
