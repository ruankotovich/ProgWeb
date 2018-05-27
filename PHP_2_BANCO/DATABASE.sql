CREATE TABLE `mensagem` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `website` varchar(64) DEFAULT NULL,
  `mensagem` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `curso` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) DEFAULT NULL,
  `sigla` char(4) DEFAULT NULL,
  `descricao` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


CREATE TABLE `jogada` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `pontuacao` int(11) DEFAULT NULL,
  `data_hora` varchar(45) DEFAULT NULL,
  `id_user` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jogada_user_FK` (`id_user`),
  CONSTRAINT `jogada_user_FK` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `id_curso` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_curso_FK` (`id_curso`),
  CONSTRAINT `user_curso_FK` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


GRANT ALL PRIVILEGES ON *.* TO 'root'@'%.example.com' 
    IDENTIFIED BY 'some_characters' 
    WITH GRANT OPTION;
FLUSH PRIVILEGES;
