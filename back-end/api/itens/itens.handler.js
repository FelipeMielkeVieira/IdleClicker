const crud = require("../../crud");

async function buscarItens() {
    const dados = await crud.get("Itens");
    return dados;
}

async function buscarPorId(id) {
    try {
        const dados = await crud.getById("Itens", id);
        return dados;
    } catch (erro) {
        return { erro: "ID Inválido!" }
    }
}

async function criarItem(dado) {

    let dados = [];
    if (dado[1] != undefined) {
        for (const item of dado) {
            item.quantidade = 0;
            item.multiplicador = 1;

            dados.push(await crud.save("Itens", undefined, item));
        }
    } else {
        dado.quantidade = 0;
        dado.multiplicador = 1;
        dados = await crud.save("Itens", undefined, dado);
    }
    return dados;
}

module.exports = {
    buscarItens,
    buscarPorId,
    criarItem
}