inserirRota('/criar_compraveis_iniciais', function (dados, resposta) {
    console.log(dados)

    database(`INSERT INTO COMPRAVEIS (DESCRICAO, CUSTO, NOME_USER) VALUES 
    ("Aumenta as moedas de Click em +1", 50, "${dados.nome}"),
    ("Aumenta as moedas de Click em +25% moedas por segundo", 100, "${dados.nome}"),
    ("Cursor dá 25% mais moedas", 100, "${dados.nome}"),
    ("Aumenta o Mps em 5%", 200, "${dados.nome}"),
    ("Tecla dá 50% mais moedas", 350, "${dados.nome}"),
    ("Aumenta o Mps em 10%", 400, "${dados.nome}"),
    ("Ganha uma bolsa de moedas de tempos em tempos", 500, "${dados.nome}");
        `)
        .then(result => {
            console.log('Compráveis automáticos inseridos com sucesso!')
            resposta({ message: 'Compráveis automáticos inseridos com sucesso!' })
        }).catch(erro => {
            console.log('Erro ao inserir Compráveis!')
            resposta({ erro: 'Erro ao inserir Compráveis!' })
        });
})

inserirRota('/atualizar_compraveis', function (dados, resposta) {
    database(`UPDATE COMPRAVEIS SET COMPRADO = 1 WHERE CODIGO == ${dados.codigo}`).then(() => {
        console.log("Compráveis editado!");
    }).catch(erro => {
        console.log("Erro nos compráveis!")
    });
})

inserirRota('/buscar_compraveis', function (dados, resposta) {
    database(`SELECT * FROM COMPRAVEIS WHERE NOME_USER == "${dados.nome}" AND COMPRADO == 0`).then(result => {
        resposta(result);
    }).catch(erro => {
        console.log('Erro ao buscar Compráveis!')
    })
    return resposta;
})