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
    MUNDO INT DEFAULT 1,
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

database(`CREATE TABLE IF NOT EXISTS VARIAVEIS (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME_USER VARCHAR(100),
    AUMENTO_MPS DOUBLE DEFAULT 1,
    AUMENTO_CLICK DOUBLE DEFAULT 1
)`)

database(`CREATE TABLE IF NOT EXISTS COMPRAVEIS (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    DESCRICAO VARCHAR(200),
    CUSTO BIGINT,
    MUNDO INT DEFAULT 1,
    COMPRADO TINYINT DEFAULT 0,
    NOME_USER VARCHAR(100)
)`).then(result => {
    console.log("Tabela compraveis Criada!")
}).catch(erro => {
    console.log("Tabela compraveis com erro!");
})