const express = require("express");
const router = express.Router();

const usersHandler = require("./users.handler");

router.get("/", (req, res) => {
    usersHandler.buscarUsuarios().then((resposta) => res.json(resposta));
})

router.get("/:nome", (req, res) => {
    usersHandler.buscarPorNome(req.params.nome).then((resposta) => res.json(resposta));
})

router.post("/", (req, res) => {
    usersHandler.criarUsuario(req.body).then((resposta) => res.json(resposta));
})

module.exports = router;