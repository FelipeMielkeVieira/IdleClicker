inserirRota('/criar_moedas_iniciais', function (dados, resposta) {
    console.log(dados)

    database(`INSERT INTO MOEDAS (NOME_USER, MOEDAS_COMPUTADOR) VALUES 
    ("${dados.nome}", 0);
    `)
        .then(result => {
            console.log('Moedas inseridas com sucesso!')
            resposta({ message: 'Moedas inseridas com sucesso!' })
        }).catch(erro => {
            console.log('Erro ao inserir moedas!')
            resposta({ erro: 'Erro ao inserir moedas!' })
        });
})

inserirRota('/buscar_moedas', function (dados, resposta) {
    database(`SELECT * FROM MOEDAS WHERE NOME_USER == "${dados.nome}" LIMIT 1`).then(result => {
        resposta(result);
    }).catch(erro => {
        console.log('Erro ao buscar moedas!')
    })
    return resposta;
})

inserirRota('/atualizar_moedas', function (dados, resposta) {
    database(`UPDATE MOEDAS SET MOEDAS_COMPUTADOR = ${dados.moedasComputador} WHERE NOME_USER == "${dados.nome}"`).then(result => {
        resposta(result);
    }).catch(erro => {
        console.log('Erro ao atualizar moedas!')
    })
})