inserirRota('/criar_itens_iniciais', function (dados, resposta) {
    console.log(dados)

    database(`INSERT INTO ITENS (NOME, QUANTIDADE, MULTIPLICADOR, CUSTO, NOME_USER) VALUES 
    ('Cursor', 0, 1, 20, "${dados.nome}"),
    ('Tecla', 0, 1, 200, "${dados.nome}"),
    ('Barra de Espaço', 0, 1, 1260, "${dados.nome}"),
    ('Ctrl', 0, 1, 7560, "${dados.nome}"),
    ('Shift', 0, 1, 34920, "${dados.nome}"),
    ('Caps Lock', 0, 1, 150980, "${dados.nome}"),
    ('Alt + F4', 0, 1, 15090000, "${dados.nome}"),
    ('Teclado Completo', 0, 1, 670000000, "${dados.nome}"),
    ('Mouse', 0, 1, 23000000000, "${dados.nome}"),
    ('Auto-Clicker', 0, 1, 4000000000000, "${dados.nome}"),
    ('Processador', 0, 1, 700000000000000, "${dados.nome}"),
    ('Monitor', 0, 1, 50000000000000000, "${dados.nome}"),
    ('Placa de Vídeo', 0, 1, 120000000000000000000, "${dados.nome}"),
    ('Computador', 0, 1, 60000000000000000000000, "${dados.nome}"),
    ('O Jogo', 0, 1, 1000000000000000000000000000, "${dados.nome}");
        `)
        .then(result => {
            console.log('Itens automáticos inseridos com sucesso!')
            resposta({ message: 'Itens automáticos inseridos com sucesso!' })
        }).catch(erro => {
            console.log('Erro ao inserir itens!')
            resposta({ erro: 'Erro ao inserir itens!' })
        });
})

inserirRota('/atualizar_itens', function (dados, resposta) {
    database(`UPDATE ITENS SET QUANTIDADE = ${dados.quantidade} WHERE CODIGO == ${dados.codigo}`);
    database(`UPDATE ITENS SET MULTIPLICADOR = ${dados.multiplicador} WHERE CODIGO == ${dados.codigo}`);
    database(`UPDATE ITENS SET CUSTO = ${dados.custo} WHERE CODIGO == ${dados.codigo}`);
})

inserirRota('/buscar_itens', function (dados, resposta) {
    database(`SELECT * FROM ITENS WHERE NOME_USER == "${dados.nome}"`).then(result => {
        resposta(result);
    }).catch(erro => {
        console.log('Erro ao buscar itens!')
    })
    return resposta;
})