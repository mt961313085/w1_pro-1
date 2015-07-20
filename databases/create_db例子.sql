/* ------------------------  create user_db -------------------------------- */
CREATE DATABASE IF NOT EXISTS `user_db` DEFAULT CHARACTER SET `utf8`;
CREATE TABLE IF NOT EXISTS user_db.user_table (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`uid` CHAR(32) UNIQUE DEFAULT '',
	`name` VARCHAR(60) DEFAULT 'Anonymous',
	`passwd` VARCHAR(32) NOT NULL DEFAULT 'NULL',
	`doas` CHAR(32) DEFAULT 'NULL',
	`state` ENUM('on-line','off-line','forbidden','merge','unknown','inactive') NOT NULL DEFAULT 'inactive',
	`type` ENUM('sway','weixin','company','admin') NOT NULL DEFAULT 'sway',
	`icon` VARCHAR(200) DEFAULT '',
	`logint` BIGINT NOT NULL DEFAULT 0,
	`logoutt` BIGINT NOT NULL DEFAULT 0,
	`phone` VARCHAR(20) DEFAULT '',
	`mail`	VARCHAR(64) UNIQUE DEFAULT '',
	`dnum`	INT DEFAULT 5,
	PRIMARY KEY ( `id` )
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* ------------------------  create dev_db -------------------------------- */
CREATE DATABASE IF NOT EXISTS `dev_db` DEFAULT CHARACTER SET `utf8`;
CREATE TABLE IF NOT EXISTS dev_db.dev_table (
	`guid1` CHAR(32) UNIQUE DEFAULT '',
	`guid2` CHAR(32) DEFAULT '',
	`name` VARCHAR(30) DEFAULT 'DEV',
	`model` VARCHAR(40) DEFAULT 'swaytech-1',
	`maker` VARCHAR(40) DEFAULT 'swaytech',
	`k` VARCHAR(32) NOT NULL DEFAULT 'NULL',
	`state` ENUM('running','stopping','error','unknown','need_data','inactive') NOT NULL DEFAULT 'unknown',
	`owner` CHAR(32) DEFAULT '',
	`t` ENUM('up','op','mix','unknown') NOT NULL DEFAULT 'unknown',
	`intv` INT DEFAULT 60,						/* 更新间隔 */
	`d_ip` VARCHAR(65) DEFAULT '',
	`d_port` INT DEFAULT -1,
	`l_ip` VARCHAR(65) DEFAULT '',
	`l_port` INT DEFAULT -1,
	`timezone` INT DEFAULT 8,					/* 设备所在地时区 */
	`cell` CHAR(16) DEFAULT '',
	`longitude` DOUBLE DEFAULT 0,
	`latitude` DOUBLE DEFAULT 0,
	`height`  DOUBLE DEFAULT 0,
	`logo` VARCHAR(64) DEFAULT 'default',
	PRIMARY KEY ( `guid1`, `guid2` )
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS dev_db.dev_fun (
	`dev_id` CHAR(32) NOT NULL,
	`fun_id` INT NOT NULL,
	`fun_name` VARCHAR(100) DEFAULT '',
	`remark` VARCHAR(200) DEFAULT '',
	`m` ENUM('a','m','b','unknown') NOT NULL DEFAULT 'b',
	`valid` ENUM('y','n') NOT NULL DEFAULT 'y',
	`p_num` INT DEFAULT 0,
	`p1` BIGINT NOT NULL DEFAULT 0,
	`p2` BIGINT NOT NULL DEFAULT 0,
	`p3` BIGINT NOT NULL DEFAULT 0,
	`p4` BIGINT NOT NULL DEFAULT 0,
	`p1_name` VARCHAR(60) DEFAULT '',
	`p2_name` VARCHAR(60) DEFAULT '',
	`p3_name` VARCHAR(60) DEFAULT '',
	`p4_name` VARCHAR(60) DEFAULT '',
	`p1_remark` VARCHAR(200) DEFAULT '',
	`p2_remark` VARCHAR(200) DEFAULT '',
	`p3_remark` VARCHAR(200) DEFAULT '',
	`p4_remark` VARCHAR(200) DEFAULT '',
	`ret_v` VARCHAR(200) DEFAULT '',
	`ret_t` BIGINT DEFAULT 0,
	PRIMARY KEY ( `dev_id`, `fun_id` )
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS dev_db.share_table (
	`guid1` CHAR(32) NOT NULL,
	`uid` CHAR(32) DEFAULT '',
	`owner` CHAR(32) DEFAULT '',
	`owner_name` CHAR(60) DEFAULT '',
	`auth` ENUM('op','view','forbidden','unknown') NOT NULL DEFAULT 'view',
	PRIMARY KEY ( `guid1`, `uid` )
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* ------------------------  create cell_db --------------------------------*/
CREATE DATABASE IF NOT EXISTS `cell_db` DEFAULT CHARACTER SET `utf8`;
CREATE TABLE IF NOT EXISTS cell_db.cell_table (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) DEFAULT 'NO NAME',
	`cell_id` CHAR(32) UNIQUE DEFAULT '',
	`owner` CHAR(32) DEFAULT '',
	`state` ENUM('running','stopping','merged','unknown') NOT NULL DEFAULT 'unknown',
	`dev_table` VARCHAR(100) NOT NULL DEFAULT 'NULL',
	`data_table` VARCHAR(100) NOT NULL DEFAULT 'NULL',
	`share_table` VARCHAR(100) NOT NULL DEFAULT 'NULL',
	`found` BIGINT DEFAULT 0,
	`cell_ip` VARBINARY(32) DEFAULT '\0',
	`cell_port` INT DEFAULT 0,	
	`peer_ip` VARBINARY(32) DEFAULT '\0',
	`peer_port` INT DEFAULT 0,	
	PRIMARY KEY ( `id` )
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS cell_db.cell_form (
	`c_id` CHAR(32) DEFAULT '',
	`remark` VARCHAR(100) NOT NULL DEFAULT 'NULL',
	`dev_id` CHAR(32) DEFAULT '',
	`p_dev` CHAR(32) DEFAULT '',
	PRIMARY KEY ( `c_id`, `dev_id` )
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS cell_db.share_table (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`uid` CHAR(32) DEFAULT '',
	`if_dev` BOOLEAN DEFAULT FALSE,
	`c_did` CHAR(32) DEFAULT '',
	`auth` ENUM('op','view','forbidden','unknown') NOT NULL DEFAULT 'view',
	PRIMARY KEY ( `id` )
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/* ------------------------  create data_db --------------------------------*/
CREATE DATABASE IF NOT EXISTS `data_db` DEFAULT CHARACTER SET `utf8`;
CREATE TABLE IF NOT EXISTS data_db.unit_table (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
	`unit` VARCHAR(30) UNIQUE,
	PRIMARY KEY ( `id` )
) ENGINE=InnoDB DEFAULT CHARSET=utf8;