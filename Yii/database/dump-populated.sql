-- MySQL dump 10.13  Distrib 5.7.22, for Linux (x86_64)
--
-- Host: localhost    Database: skifree_kotovich
-- ------------------------------------------------------
-- Server version	5.7.22-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curso` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) COLLATE utf8_unicode_ci NOT NULL,
  `sigla` varchar(4) COLLATE utf8_unicode_ci NOT NULL,
  `descricao` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `nome` (`nome`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'Ciência da Computação','CC','Um curso muito massa'),(2,'Engenharia de Software','ES','Um curso muito massa'),(3,'Mestrando','PPGI','Dor e sofrimento.'),(4,'Sistemas de Informação','SI','Um curso muito massa');
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jogada`
--

DROP TABLE IF EXISTS `jogada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `jogada` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `pontuacao` int(11) NOT NULL,
  `data_hora` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk-jogada-user` (`id_user`),
  CONSTRAINT `fk-jogada-user` FOREIGN KEY (`id_user`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jogada`
--

LOCK TABLES `jogada` WRITE;
/*!40000 ALTER TABLE `jogada` DISABLE KEYS */;
INSERT INTO `jogada` VALUES (110,10,740,'05/07/2018 01:29:22'),(111,10,870,'05/07/2018 01:29:37'),(112,10,4910,'05/07/2018 01:30:10');
/*!40000 ALTER TABLE `jogada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migration`
--

DROP TABLE IF EXISTS `migration`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migration` (
  `version` varchar(180) NOT NULL,
  `apply_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`version`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migration`
--

LOCK TABLES `migration` WRITE;
/*!40000 ALTER TABLE `migration` DISABLE KEYS */;
INSERT INTO `migration` VALUES ('m130524_201442_init',1530577553);
/*!40000 ALTER TABLE `migration` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `auth_key` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password_reset_token` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `id_curso` int(11) NOT NULL,
  `status` smallint(6) NOT NULL DEFAULT '10',
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `password_reset_token` (`password_reset_token`),
  KEY `fk-user-curso` (`id_curso`),
  CONSTRAINT `fk-user-curso` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Xyahvier','_1NS9vHrXz7-WEB9CFse-9UvjFlbfAoZ','$2y$13$jrbBSoSvovAqy5Cq5QIFZemByrL/Fvd/osCRutdJomYLp6UbW6GAm',NULL,'ruanggb@gmai.com',1,10,1,1530731771),(2,'tyrone','y5hsY1O7x1nc_YUUV64P4Qb0PCO6CgTC','$2y$13$abmeqsx3tRkrt8ECDUyvNO1s6Qi3oOq76X02HZulBaJQ9qMZzB.Qe',NULL,'tyrone@gmail.com',2,10,1530592359,1530592359),(4,'demetra','QKjKmsUBL2aTQ6dka9cmAfBXnbAeOIKW','$2y$13$QIa/ghAy1V6jUBhprGwDh.w6tz.Hx/AnZAAJoV98WH3Aes6MXPOMC',NULL,'demetra@gmail.com',2,10,1530592585,1530592585),(5,'Ruanggb','qVTmhGbA88iPzXb0dNMf70dzblpxULEV','$2y$13$.QD6SGCbUIGs5ii2Py6.2e97tmTiJbP5dW.nyl9keyuIFJQCkD7.m','_FxYk60QKQDJ3K9YZlPVWz4YnYQYrLWZ_1530749032','ruanggb@gmail.com',1,10,3,1530749032),(6,'Eribeiro','dM-k-tjhAaYRMbv2Y1SsBMFlKzHO799z','$2y$13$fwgXGySe5/zMPP.yuOESSOtCxxsH13qWgVkTHIZNliuAIBOukiBtS',NULL,'erick.ribeiro.16@gmail.com',1,10,4,1530715684),(8,'taigo','MFYvC8QcGqvKJtgRVijfyQFZym5JisrS','$2y$13$sGti4.ULx/6klCmIwjABu.rQgkG5PeWWXpTcypzz9L7jdn/AM2Q.W',NULL,'tss@icomp.ufam.edu.br',1,10,1530729677,1530729677),(9,'Dimitri','aLbEpv4FjgAT_6mrIXdQtOSizVmIOgDm','$2y$13$.lsx0gD/3dPUj4vXWBCqVO3r/s5ILgWP6dysMUSjU2i2Zs8X4R1i6',NULL,'dimitri@gmail.com',1,10,1530730689,1530730689),(10,'Ruan Gabriel','Jr_ZcnEB6WK4X_KHVbw2RivFAtC-oDAx','$2y$13$W/LH8fMsxBqrG9gcYESGfOcr9UFbYbH4hb/Rj1qbTCQdzkMyQkdOC',NULL,'rggb@gmail.com',1,10,1530749065,1530749065);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'skifree_kotovich'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-07-04 21:31:29
