
--
-- Database: `user_group_db`
--

-- --------------------------------------------------------

--
-- Table structure


CREATE TABLE User (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    dob DATE NOT NULL
);

CREATE TABLE `Group` (
    id INT PRIMARY KEY AUTO_INCREMENT,
    groupname VARCHAR(50) NOT NULL
);

CREATE TABLE UserGroup (
    user_id INT,
    group_id INT,
    PRIMARY KEY (user_id, group_id),
    FOREIGN KEY (user_id) REFERENCES User(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES `Group`(id) ON DELETE CASCADE
);


INSERT INTO `user_group_db`.`User` (`id`, `username`, `password`, `firstname`, `lastname`, `dob`) VALUES ('1', 'User', 'User', 'User', 'User', '2000-05-06');

INSERT INTO `user_group_db`.`Group` (`id`, `groupname`) VALUES ('1', 'Group1');

INSERT INTO `user_group_db`.`UserGroup` (`user_id`, `group_id`) VALUES ('1', '1');
