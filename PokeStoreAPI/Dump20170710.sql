CREATE DATABASE  IF NOT EXISTS `pkmnStoreDev` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `pkmnStoreDev`;
-- MySQL dump 10.13  Distrib 5.5.55, for debian-linux-gnu (x86_64)
--
-- Host: 127.0.0.1    Database: pkmnStoreDev
-- ------------------------------------------------------
-- Server version	5.5.55-0ubuntu0.14.04.1

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
-- Table structure for table `pokemons`
--

DROP TABLE IF EXISTS `pokemons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pokemons` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `stock` int(11) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pokemons`
--

LOCK TABLES `pokemons` WRITE;
/*!40000 ALTER TABLE `pokemons` DISABLE KEYS */;
INSERT INTO `pokemons` VALUES (88,'Bulbasaur',251,10,'2017-07-08 12:07:00','2017-07-10 14:12:37','7d8a0d660122917ecd4dd31a312b0d3e'),(89,'Charmander',251,5,'2017-07-08 12:10:00','2017-07-10 14:14:01','76b2c08b23a88ceee27c5fcde6545319'),(90,'Squirtle',251,7,'2017-07-08 12:12:00','2017-07-10 14:17:10','94a6147223db931cd27dd1d66703333b'),(91,'Pikachu',200,20,'2017-07-09 15:09:53','2017-07-09 15:09:53',''),(92,'Mew',1000,1,'2017-07-09 15:43:27','2017-07-09 15:43:27',''),(93,'Mewtwo',1000,1,'2017-07-09 15:45:28','2017-07-09 15:45:28',''),(94,'Charmeleon',500,5,'2017-07-09 16:13:26','2017-07-09 16:13:26','');
/*!40000 ALTER TABLE `pokemons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchases`
--

DROP TABLE IF EXISTS `purchases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `purchases` (
  `id` int(11) NOT NULL,
  `pokemon_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `card_number` varchar(255) NOT NULL,
  `card_expiration_date` int(11) NOT NULL,
  `card_holder_name` varchar(255) NOT NULL,
  `card_cvv` int(11) NOT NULL,
  `status` varchar(255) NOT NULL,
  `amount` decimal(10,0) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchases`
--

LOCK TABLES `purchases` WRITE;
/*!40000 ALTER TABLE `purchases` DISABLE KEYS */;
INSERT INTO `purchases` VALUES (0,88,1,'4024007138010896',1050,'Ash Ketchum',123,'refused',25100,'2017-07-10 14:41:30','2017-07-10 14:41:30');
/*!40000 ALTER TABLE `purchases` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-07-10 11:44:37
