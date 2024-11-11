-- Deletes the database user
DROP USER 'g4cuisiner-user'@'localhost';

-- Delete the database
DROP DATABASE `g4cuisiner-db`;

-- Shows users privileges
SHOW GRANTS FOR 'g4cuisiner-user'@'localhost';
-- or for server
SHOW GRANTS FOR 'g4cuisiner-user'@'%';

-- Shows all tables for the database
SHOW TABLES FROM `g4cuisiner-db`;

-- Shows all users
SELECT User FROM mysql.user;

-- Shows all databases
SHOW DATABASES;