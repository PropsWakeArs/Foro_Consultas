Drop database if exists foroconsulta;
create database foroconsulta;
use foroconsulta;

-- drop tables

drop table if exists usuarios;
drop table if exists comentario;

CREATE TABLE usuarios (
    id_Boleta INTEGER not NULL primary key,
    e_mail VARCHAR (45) not NULL,
    pNombre VARCHAR (45) not NULL,
    sNombre VARCHAR (45) NULL,
    pApellido VARCHAR (45) not NULL,
    sApellido VARCHAR (45) NULL,
    carrera VARCHAR (1) not NULL,
    pass_User VARCHAR (60) not NULL,
    conf_User INTEGER (1) not NULL
);

CREATE TABLE comentario (
    id_Come INTEGER not NULL primary key AUTO_INCREMENT,
    usuarios_id_Boleta INTEGER not NULL,
    fch_Come DATE not NULL,
    hra_Come TIME not NULL,
    tema_Conme VARCHAR (1) not NULL,
    come VARCHAR (200) NULL,
    FOREIGN KEY (usuarios_id_Boleta) REFERENCES usuarios (id_Boleta)
);

INSERT INTO usuarios VALUES( 2015000001, 'admin@admin.com','admin','admin','admin','admin',"2","$2a$08$PYQY54cHO1QcDiQcXkxPIO0luJojKr/VP5nawu8xzCnWqsP3MujWK",1);



