const router = require('express').Router()

router.use("/user",require("./user_auth_route"))

module.exports = router;