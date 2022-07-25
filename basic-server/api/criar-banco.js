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
    CUSTO BIGINT,
    NOME_USER varchar(100)
)`).then(result => {
    console.log("Tabela itens Criada!")
}).catch(erro => {
    console.log("Tabela itens com erro!");
})

database(`CREATE TABLE IF NOT EXISTS MOEDAS (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME_USER VARCHAR(100),
    MOEDAS_COMPUTADOR INTEGER
)`).then(result => {
    console.log("Tabela moedas Criada!")
}).catch(erro => {
    console.log("Tabela moedas com erro!");
})

database(`CREATE TABLE IF NOT EXISTS COMPRAVEIS (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME_ITEM VARCHAR(100),
    DESCRICAO VARCHAR(200),
    CUSTO BIGINT,
    NOME_USER VARCHAR(100)
)`).then(result => {
    console.log("Tabela compraveis Criada!")
}).catch(erro => {
    console.log("Tabela compraveis com erro!");
})