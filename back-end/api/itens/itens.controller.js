const express = require("express");
const router = express.Router();

const usersHandler = require("./itens.handler");

router.get("/", (req, res) => {
    usersHandler.buscarItens().then((resposta) => res.json(resposta));
})

router.get("/:id", (req, res) => {
    usersHandler.buscarPorId(req.params.id).then((resposta) => res.json(resposta));
})

router.post("/", (req, res) => {
    usersHandler.criarItem(req.body).then((resposta) => res.json(resposta));
})

module.exports = router;