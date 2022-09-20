const express = require("express");
const router = express.Router();
const usersController = require("./users/users.controller");
const itensController = require("./itens/itens.controller");

router.use("/users", usersController);
router.use("/itens", itensController);

module.exports = router;