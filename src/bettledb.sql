/*
Navicat MySQL Data Transfer

Source Server         : chen
Source Server Version : 80020
Source Host           : localhost:3306
Source Database       : bettledb

Target Server Type    : MYSQL
Target Server Version : 80020
File Encoding         : 65001

Date: 2021-01-08 12:43:51
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for feedback
-- ----------------------------
DROP TABLE IF EXISTS `feedback`;
CREATE TABLE `feedback` (
  `custid` int NOT NULL,
  `name` varchar(11) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `email` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `message` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  KEY `Feedback_ibfk_1` (`custid`) USING BTREE,
  CONSTRAINT `Feedback_ibfk_1` FOREIGN KEY (`custid`) REFERENCES `users` (`custid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of feedback
-- ----------------------------
INSERT INTO `feedback` VALUES ('2', 'wanghaifei', '2805995532@qq.com', '17673802509', '22222223');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `goodid` int NOT NULL AUTO_INCREMENT,
  `goodname` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `Goodsprice` decimal(10,2) DEFAULT NULL,
  `introduce` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `picone` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `pictwo` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `picthree` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `picfour` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `inventory` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `status` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`goodid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', '宇航员', '50.00', '液态硅胶手机壳、全包防摔，文艺太空', '1.1.jpg', '1.2.jpg', '1.3.jpg', '1.4.jpg', '100', '0');
INSERT INTO `goods` VALUES ('2', '看报', '50.00', '手机壳全包镜头、防摔、限量版', '2.1.jpg', '2.2.jpg', '2.3.jpg', '2.4.jpg', '100', '0');
INSERT INTO `goods` VALUES ('3', '富士山插画', '50.00', '液态硅胶手机壳、软套', '3.1.jpg', '3.2.jpg', '3.3.jpg', '3.4.jpg', '99', '1');
INSERT INTO `goods` VALUES ('4', '渔人码头', '50.00', '液态硅胶直边手机壳、内置超纤细绒不伤机', '4.1.jpg', '4.2.jpg', '4.3.jpg', '4.4.jpg', '100', '0');
INSERT INTO `goods` VALUES ('5', '66号公路', '50.00', '液态硅胶、软套', '5.1.jpg', '5.2.jpg', '5.3.jpg', '5.4.jpg', '99', '1');
INSERT INTO `goods` VALUES ('6', '三川志', '50.00', '全包软壳、情侣、色块文字', '6.1.jpg', '6.2.jpg', '6.3.jpg', '6.4.jpg', '100', '0');
INSERT INTO `goods` VALUES ('7', '俄罗斯方块', '50.00', '硅胶全包、游戏、情侣', '7.1.jpg', '7.2.jpg', '7.3.jpg', '7.4.jpg', '99', '1');
INSERT INTO `goods` VALUES ('8', '富士山下', '50.00', '手机壳全包镜头、保护套液态硅胶', '8.1.jpg', '8.2.jpg', '8.3.jpg', '8.4.jpg', '98', '1');

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `orderid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `goodid` int NOT NULL,
  `model` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `ordertime` datetime DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `status` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  PRIMARY KEY (`orderid`) USING BTREE,
  KEY `userid` (`userid`) USING BTREE,
  KEY `orders_ibfk_2` (`goodid`) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`custid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`goodid`) REFERENCES `goods` (`goodid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('20', '4', '8', '', null, '1.00', '0');
INSERT INTO `orders` VALUES ('21', '4', '5', '', null, '1.00', '0');
INSERT INTO `orders` VALUES ('22', '4', '7', null, null, '1.00', '0');
INSERT INTO `orders` VALUES ('23', '1', '8', '1', null, '1.00', '0');
INSERT INTO `orders` VALUES ('24', '1', '3', '长', null, '1.00', '0');
INSERT INTO `orders` VALUES ('25', '4', '5', '123465', null, '1.00', '0');

-- ----------------------------
-- Table structure for sales
-- ----------------------------
DROP TABLE IF EXISTS `sales`;
CREATE TABLE `sales` (
  `saleid` int NOT NULL AUTO_INCREMENT,
  `goodname` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `mainpic` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Vonepic` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Vtwopic` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Vthreepic` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Vfourpic` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `Vfifthdpic` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contentone` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contenttwo` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contentthree` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contentfour` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `contentfifth` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `status` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  `Viecpic` char(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  PRIMARY KEY (`saleid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of sales
-- ----------------------------
INSERT INTO `sales` VALUES ('1', '油画日出', '40.00', '12.1.jpg', 'true.png', 'true.png', 'true.png', 'true.png', 'true.png', 'reduced rate', 'Turnkey lens', 'liquid silicone rubber', 'New Arrival', 'exemption from postage', '0', 'th.png');
INSERT INTO `sales` VALUES ('2', '男孩和猫', '40.00', '14.1.jpg', 'true.png', 'true.png', 'true.png', 'true.png', 'true.png', 'reduced rate', 'Turnkey lens', 'liquid silicone rubber', 'New Arrival', 'exemption from postage', '0', 'th.png');
INSERT INTO `sales` VALUES ('3', '海绵宝宝与派大星', '40.00', '15.1.jpg', 'true.png', 'true.png', 'true.png', 'true.png', 'true.png', 'reduced rate', 'Turnkey lens', 'liquid silicone rubber', 'New Arrival', 'exemption from postage', '0', 'th.png');
INSERT INTO `sales` VALUES ('4', '原创可爱午休猫猫', '40.00', '13.1.jpg', 'true.png', 'true.png', 'true.png', 'true.png', 'true.png', 'reduced rate', 'Turnkey lens', 'liquid silicone rubber', 'New Arrival', 'exemption from postage', '0', 'th.png');

-- ----------------------------
-- Table structure for shopcarts
-- ----------------------------
DROP TABLE IF EXISTS `shopcarts`;
CREATE TABLE `shopcarts` (
  `scid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `goodid` int NOT NULL,
  `pic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `saleprice` decimal(10,2) DEFAULT NULL,
  `model` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `quantity` int DEFAULT '1',
  `amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`scid`) USING BTREE,
  KEY `userid` (`userid`) USING BTREE,
  KEY `goodid` (`goodid`) USING BTREE,
  CONSTRAINT `shopcarts_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `users` (`custid`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `shopcarts_ibfk_2` FOREIGN KEY (`goodid`) REFERENCES `goods` (`goodid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of shopcarts
-- ----------------------------

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `custid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `sex` varchar(10) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `birthday` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `address` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `phone` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `role` varchar(1) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT '0',
  PRIMARY KEY (`custid`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 ROW_FORMAT=DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', 'admin', '12345678', '男', '', '湖南省长沙市天心区', '15678945777', '1');
INSERT INTO `users` VALUES ('2', 'wanghaifei', '123456', '男', '03.06', '湖南省长沙市卡开福区', '13548954321', '0');
INSERT INTO `users` VALUES ('4', 'zhoujie', '123456', '女', '', '高老庄', '17673802509', '0');
INSERT INTO `users` VALUES ('9', 'liulei', '456789', null, '', '', '', '0');
