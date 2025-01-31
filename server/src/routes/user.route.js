const express = require("express")
const router = express.Router()
const { signOut, test} = require("../controllers/user.controller.js")

router.get("/test", test)
router.post("/signout", signOut)

module.exports = router 