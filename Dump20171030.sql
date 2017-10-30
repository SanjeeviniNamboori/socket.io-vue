-- MySQL dump 10.13  Distrib 5.7.20, for Linux (x86_64)
--
-- Host: localhost    Database: VoltusWave
-- ------------------------------------------------------
-- Server version	5.7.20-0ubuntu0.16.04.1

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
-- Table structure for table `chatmessages`
--

DROP TABLE IF EXISTS `chatmessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chatmessages` (
  `messageid` int(11) NOT NULL AUTO_INCREMENT,
  `usermessage` varchar(45) DEFAULT NULL,
  `userid` varchar(45) DEFAULT NULL,
  `roomid` varchar(45) DEFAULT NULL,
  `dateandtime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`messageid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chatmessages`
--

LOCK TABLES `chatmessages` WRITE;
/*!40000 ALTER TABLE `chatmessages` DISABLE KEYS */;
INSERT INTO `chatmessages` VALUES (1,'Hi all.','2','1','2017-10-18 12:50:56.538'),(2,'hi','4','1','2017-10-20 10:28:41.553'),(3,'hello','1','1','2017-10-20 10:28:46.559'),(4,'hi','4','1','2017-10-20 16:39:27.628'),(5,'hey','4','1','2017-10-20 16:40:31.033'),(6,'lol','2','9','2017-10-20 16:41:02.103'),(7,'hey','1','1','2017-10-20 17:03:20.366'),(8,'hello sanjeevini','4','1','2017-10-20 17:03:27.198'),(9,'I am in room3','4','4','2017-10-20 17:04:03.423'),(10,'heylo are you there','1','1','2017-10-20 17:04:13.982'),(11,'i am also in room2','1','4','2017-10-20 17:04:45.727'),(12,'hey','4','9','2017-10-20 17:04:45.727'),(13,'hi','1','1','2017-10-23 16:58:45.969'),(14,'hi','1','4','2017-10-23 17:12:51.672'),(15,'hi Roopesh','2','1','2017-10-23 17:17:14.811'),(16,'dsfasfs','1','1','2017-10-23 17:17:32.954'),(17,'room2','1','4','2017-10-23 17:17:52.506'),(18,'hi','2','4','2017-10-23 17:17:59.130'),(19,'hi','1','1','2017-10-23 18:24:23.201'),(20,'hello','2','1','2017-10-23 18:24:32.325'),(21,'in Room 1 Msg 1','1','2','2017-10-23 18:24:48.397'),(22,'in Room 1 Msg 2','2','2','2017-10-23 18:24:56.903'),(23,'in Room 2 Msg 1','1','4','2017-10-23 18:25:11.750'),(24,'in Room 2 Msg 2','2','4','2017-10-23 18:25:19.317'),(25,'hi','1','1','2017-10-24 11:12:55.101'),(26,'hi qwerty','2','1','2017-10-25 12:18:13.708'),(27,'hi','1','1','2017-10-25 16:03:40.632'),(28,'hello','1','4','2017-10-26 11:08:03.100'),(29,'hi','2','1','2017-10-26 11:57:30.687'),(30,'hi','2','1','2017-10-26 15:13:49.744');
/*!40000 ALTER TABLE `chatmessages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rooms` (
  `roomid` int(11) NOT NULL AUTO_INCREMENT,
  `roomname` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`roomid`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'default'),(2,'room1'),(4,'room2'),(5,'room3'),(6,'room4'),(7,'room5'),(8,'room6'),(9,'room7'),(10,'room8'),(11,'room9'),(12,'room10'),(13,'room11'),(14,'room12'),(15,'room13'),(16,'room14'),(17,'room15'),(18,'room16');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `displayname` varchar(45) DEFAULT NULL,
  `imageurl` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'sanjeevini','sanjeevini','sanjeevini','abc'),(2,'roopesh','roopesh','roopesh','roopesh'),(3,'Mahesh','1234','Mahi','ewfiowe'),(4,'test','test','test','test'),(14,'venkatBharadwaj','1234','Bharath','helloo'),(15,'qwerty','qwerty','qwerty','imageurlhere'),(16,'teja','teja','teja','www.teja.com'),(25,'reshma','sanju','','');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertousermessages`
--

DROP TABLE IF EXISTS `usertousermessages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `usertousermessages` (
  `usermid` int(11) NOT NULL AUTO_INCREMENT,
  `senderid` int(11) DEFAULT NULL,
  `receiverid` int(11) DEFAULT NULL,
  `message` varchar(45) DEFAULT NULL,
  `dateandtime` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`usermid`)
) ENGINE=InnoDB AUTO_INCREMENT=63 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertousermessages`
--

LOCK TABLES `usertousermessages` WRITE;
/*!40000 ALTER TABLE `usertousermessages` DISABLE KEYS */;
INSERT INTO `usertousermessages` VALUES (1,NULL,NULL,NULL,'2017-10-25 17:34:00.188'),(2,NULL,NULL,NULL,'2017-10-25 17:35:01.295'),(3,1,1,'hi','2017-10-25 17:35:01.295'),(4,NULL,NULL,NULL,'2017-10-25 17:35:01.295'),(5,NULL,NULL,NULL,'2017-10-25 17:35:01.295'),(6,NULL,NULL,NULL,'2017-10-25 17:54:24.145'),(7,NULL,NULL,NULL,'2017-10-25 17:55:57.890'),(8,1,14,'hello','2017-10-26 10:50:29.891'),(9,2,14,'hi','2017-10-26 10:58:46.216'),(10,2,14,'hello','2017-10-26 10:58:46.216'),(11,1,16,'hi teja','2017-10-26 11:08:03.100'),(12,1,16,'hdshf','2017-10-26 11:08:03.100'),(13,1,4,'hi test','2017-10-26 11:33:04.885'),(14,2,2,'hi','2017-10-26 11:35:53.258'),(15,1,2,'hi roopesh','2017-10-26 11:37:24.105'),(16,2,1,'hey','2017-10-26 11:37:24.105'),(17,2,2,'hi','2017-10-26 15:13:49.744'),(18,2,1,'hi ','2017-10-26 15:22:02.438'),(19,1,2,'hi','2017-10-26 16:02:02.009'),(20,1,2,'hey','2017-10-26 16:04:50.556'),(21,1,2,'hello','2017-10-26 16:11:35.091'),(22,NULL,NULL,'Hello Good morning.','2017-10-27 10:41:53.098'),(23,NULL,NULL,'hi','2017-10-27 10:48:46.537'),(24,NULL,NULL,'hi','2017-10-27 11:04:28.602'),(25,2,1,'hey','2017-10-27 11:08:52.030'),(26,2,1,'hi sanjeevini','2017-10-27 11:15:12.255'),(27,2,1,'hello','2017-10-27 15:02:29.847'),(28,2,1,'whatsup','2017-10-27 15:07:54.296'),(29,2,1,'good afternnon','2017-10-27 15:09:41.403'),(30,2,1,'hi sanjeevini','2017-10-27 15:25:25.331'),(31,1,2,'hi ','2017-10-27 15:34:38.570'),(32,2,1,'hello','2017-10-27 16:22:37.640'),(33,2,1,'Hi. testing','2017-10-27 16:30:50.001'),(34,1,2,'hey','2017-10-27 16:36:17.659'),(35,1,2,'hello','2017-10-27 16:40:58.293'),(36,NULL,NULL,NULL,'2017-10-27 16:45:47.739'),(37,2,1,'test message','2017-10-27 16:48:00.360'),(38,1,2,'teju','2017-10-27 16:51:10.903'),(39,2,1,'hello','2017-10-27 17:42:25.935'),(40,2,1,'hey','2017-10-27 17:42:25.935'),(41,1,2,'teju','2017-10-27 17:42:25.935'),(42,2,1,'hello good morning','2017-10-30 11:08:37.736'),(43,2,1,'hey','2017-10-30 11:10:44.810'),(44,1,2,'hello good morning','2017-10-30 11:10:44.810'),(45,1,2,'hey','2017-10-30 11:18:06.763'),(46,2,1,'hi','2017-10-30 11:18:06.763'),(47,1,15,'hi qwerty','2017-10-30 11:18:06.763'),(48,1,2,'hello ','2017-10-30 11:24:27.679'),(49,2,1,'hey','2017-10-30 11:24:27.679'),(50,1,2,'good','2017-10-30 16:07:10.330'),(51,2,1,'hey','2017-10-30 16:12:49.913'),(52,1,2,'hey alive?','2017-10-30 16:15:43.184'),(53,1,2,'test message','2017-10-30 16:15:43.184'),(54,1,15,'hi','2017-10-30 16:27:39.187'),(55,2,4,'you are receiver test','2017-10-30 16:27:39.187'),(56,2,15,'hey','2017-10-30 16:27:39.187'),(57,1,2,'hi','2017-10-30 16:27:39.187'),(58,1,2,'hello','2017-10-30 16:34:32.578'),(59,1,15,'hello','2017-10-30 16:34:32.578'),(60,1,15,'qwerty','2017-10-30 16:34:32.578'),(61,15,2,'i am qwerty','2017-10-30 16:34:32.578'),(62,2,15,'hi','2017-10-30 16:34:32.578');
/*!40000 ALTER TABLE `usertousermessages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'VoltusWave'
--
/*!50003 DROP PROCEDURE IF EXISTS `addmessage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `addmessage`( in_usermessage     VARCHAR(45), in_userid     VARCHAR(45), in_roomid VARCHAR(45), in_dateandtime     VARCHAR(45) )
BEGIN 

    INSERT INTO VoltusWave.chatmessages
         (usermessage , userid , roomid, dateandtime)
    VALUES 
         (in_usermessage,in_userid,in_roomid,in_dateandtime);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_rooms` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_rooms`( in_roomname     VARCHAR(45) )
BEGIN 

    INSERT INTO VoltusWave.rooms
         (roomname)
    VALUES 
         (in_roomname);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `add_users_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `add_users_data`( in_username     VARCHAR(45), in_password     VARCHAR(45), in_displayname  VARCHAR(45), in_imageurl     VARCHAR(45) )
BEGIN 

    INSERT INTO VoltusWave.users
         (username, password, displayname, imageurl)
    VALUES 
         (in_username,in_password,in_displayname,in_imageurl);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAllUsers` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllUsers`( )
BEGIN
SELECT users.userid , users.username 
FROM
`users` ;

    
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getOneToOneMessage` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getOneToOneMessage`( IN p_id INT(11) , p_id1 INT(11) )
BEGIN
SELECT `usertousermessages`.`message`, `users`.username
FROM
`usertousermessages` 

INNER JOIN 

`users` ON `usertousermessages`.`senderid` = `users`.`userid`                         
    
   
    WHERE  (`senderid` = p_id AND `receiverid` = p_id1)
    OR 
    (`receiverid` = p_id AND `senderid` = p_id1); 
    
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `login`(
        IN   p_username                   VARCHAR(45)       , 
        IN   p_password                      VARCHAR(45)   
     )
BEGIN 

    SELECT *                                   
    
    FROM   users
    WHERE  username = p_username AND password = p_password ; 

end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `roomMessages` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `roomMessages`( IN p_roomid VARCHAR(45) )
BEGIN
SELECT chatmessages.usermessage , users.username 
FROM
`chatmessages` 
INNER JOIN 
`users` ON `chatmessages`.`userid` = `users`.`userid`                                   
    
   
    WHERE  `roomid` = p_roomid ; 
    
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `roomsList` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `roomsList`(  )
BEGIN
SELECT *                                   
    
    FROM   rooms;
    
    
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `usertousermessages` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `usertousermessages`( in_senderid    INT(11), in_receiverid    INT(11), in_message VARCHAR(45), in_dateandtime     VARCHAR(45) )
BEGIN 

    INSERT INTO VoltusWave.usertousermessages
         (senderid , receiverid , message, dateandtime)
    VALUES 
         (in_senderid,in_receiverid,in_message,in_dateandtime);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-10-30 16:48:16
