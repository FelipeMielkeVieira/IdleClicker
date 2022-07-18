database(`CREATE TABLE IF NOT EXISTS USER (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME varchar(100),
    SENHA varchar(30),
    CRIACAO DATE
    )`)
    .then(result => {
        console.log('Tabela User Criada!')
    }).catch(erro => {
        console.log('Tabela User com erro!')
});

database(`CREATE TABLE IF NOT EXISTS ITENS (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME VARCHAR(100),
    QUANTIDADE INTEGER,
    MULTIPLICADOR INTEGER,
    CUSTO DOUBLE
)`).then(result => {
    console.log("Tabela itens Criada!")
}).catch(erro => {
    console.log("Tabela itens com erro!");
})