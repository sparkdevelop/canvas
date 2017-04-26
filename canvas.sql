/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2017-04-24 14:11:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cooperation
-- ----------------------------
DROP TABLE IF EXISTS `cooperation`;
CREATE TABLE `cooperation` (
  `username` varchar(255) NOT NULL,
  `canvasid` int(255) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `par` varchar(255) DEFAULT NULL,
  `wor` varchar(255) DEFAULT NULL,
  `rel` varchar(255) DEFAULT NULL,
  `res` varchar(255) DEFAULT NULL,
  `pat` varchar(255) DEFAULT NULL,
  `fra` varchar(255) DEFAULT NULL,
  `rev` varchar(255) DEFAULT NULL,
  `cos` varchar(255) DEFAULT NULL,
  `cus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`canvasid`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Table structure for matches
-- ----------------------------
DROP TABLE IF EXISTS `matches`;
CREATE TABLE `matches` (
  `username` varchar(255) NOT NULL,
  `canvasid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=gb2312;
SET FOREIGN_KEY_CHECKS=1;
