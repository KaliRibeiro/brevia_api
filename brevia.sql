DROP DATABASE brevia;
CREATE DATABASE brevia;

USE brevia;

CREATE TABLE categoria(
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(25) NOT NULL
);

CREATE TABLE noticia (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo TEXT NOT NULL,
    post TEXT NOT NULL,
    dataPost  VARCHAR(45), 
    imagem TEXT NOT NULL, 
    categoria_id INT NOT NULL,
    Foreign Key (categoria_id) REFERENCES categoria(id)
);




CREATE  TABLE usuario(
    id INT PRIMARY KEY AUTO_INCREMENT,
    email varchar(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    administrador BOOLEAN DEFAULT 0

) ;


CREATE TABLE usuario_has_categoria(
    usuario_id INT,
    categoria_id INT,
    Foreign Key (usuario_id) REFERENCES usuario(id),
    Foreign Key (categoria_id) REFERENCES categoria(id)
);

INSERT INTO categoria (nome) VALUES ("moda"), ("sustentabilidade"), ("esporte"), ("tendencia");

INSERT INTO usuario(email, senha, administrador) VALUES ("user","user", 0);

INSERT INTO usuario(email, senha, administrador) VALUES ("admin", "admin", 1);

