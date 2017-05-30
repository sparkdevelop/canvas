/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2017-05-30 16:45:22
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cooperation
-- ----------------------------
DROP TABLE IF EXISTS `cooperation`;
CREATE TABLE `cooperation` (
  `username` longtext NOT NULL,
  `canvasid` int(11) NOT NULL AUTO_INCREMENT,
  `filename` longtext NOT NULL,
  `par` longtext,
  `wor` longtext,
  `rel` longtext,
  `res` longtext,
  `pat` longtext,
  `fra` longtext,
  `rev` longtext,
  `cos` longtext,
  `cus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`canvasid`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=gb2312;

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
