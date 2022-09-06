inserirRota('/criar_variaveis_iniciais', function (dados, resposta) {
    console.log(dados)

    database(`INSERT INTO VARIAVEIS (NOME_USER) VALUES ("${dados.nome}");
        `)
        .then(result => {
            console.log('Variáveis automáticos inseridos com sucesso!')
            resposta({ message: 'Variáveis automáticos inseridos com sucesso!' })
        }).catch(erro => {
            console.log('Erro ao inserir Variáveis!')
            resposta({ erro: 'Erro ao inserir Variáveis!' })
        });
})

inserirRota('/atualizar_variaveis', function (dados, resposta) {
    database(`UPDATE VARIAVEIS SET AUMENTO_MPS = ${dados.aumento_mps} WHERE NOME_USER == "${dados.nome}"`);
    database(`UPDATE VARIAVEIS SET AUMENTO_CLICK = ${dados.aumento_click} WHERE NOME_USER == "${dados.nome}"`).then(() => {
        console.log("Variáveis Atualizadas!")
    }).catch(erro => {
        console.log("Erro nas variáveis!")
    });
})

inserirRota('/buscar_variaveis', function (dados, resposta) {
    database(`SELECT * FROM VARIAVEIS WHERE NOME_USER == "${dados.nome}" LIMIT 1`).then(result => {
        resposta(result);
    }).catch(erro => {
        console.log('Erro ao buscar Variáveis!')
    })
    return resposta;
})