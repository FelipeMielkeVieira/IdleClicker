const crud = require("../../crud");

async function buscarUsuarios() {
    const dados = await crud.get("Users");
    return dados;
}

async function buscarPorNome(nome) {
    try {
        const dados = await crud.getWithFilter("Users", "nome", "==", nome);
        return dados[0];
    } catch (erro) {
        return { erro: "ID Inválido!" }
    }
}

async function criarUsuario(dado) {

    if (!dado.nome) {
        return { erro: "Digite o nome (nome)!" }
    }
    if (!dado.senha) {
        return { erro: "Digite a senha (senha)!" }
    }

    const usuarioExistente = await crud.getWithFilter("Users", "nome", "==", dado.nome);
    if (!usuarioExistente[0]) {
        dado.criacao = new Date();
        const dados = await crud.save("Users", undefined, dado);
        return dados;
    } else {
        return { erro: "Nome Inválido!" }
    }
}

module.exports = {
    buscarUsuarios,
    buscarPorNome,
    criarUsuario
}