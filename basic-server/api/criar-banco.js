database(`CREATE TABLE IF NOT EXISTS USER (
    CODIGO INTEGER PRIMARY KEY AUTOINCREMENT,
    NOME varchar(100),
    SENHA varchar(30),
    EMAIL varchar(100),
    TELEFONE varchar(20),
    CRIACAO DATE
    )`)
    .then(result => {
        console.log('Tabela User Criada!')
    }).catch(erro => {
        console.log('Tabela User com erro!')
    });