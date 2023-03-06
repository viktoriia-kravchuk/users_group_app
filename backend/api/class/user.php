<?php
    class User{

        // conn
        private $conn;

        // table
        private $dbTable = "User";

        // col
        public $id;
        public $firstname;
        public $lastname;
        public $username;
        public $password;
        public $date_of_birth;
        public $user_groups;
      
        // db conn
        public function __construct($db){
            $this->conn = $db;
        }

        // GET Users
        public function getUsers(){
            $sqlQuery = "SELECT id, username, password, firstname, lastname, dob
               FROM " . $this->dbTable . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }


        // CREATE User
        public function createUser(){
            $sqlQuery = "INSERT INTO
                        ". $this->dbTable ."
                    SET
                    firstname = :firstname, 
                    lastname = :lastname, 
                    username = :username,
                    password = :password,
                    dob = :date_of_birth";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->firstname=htmlspecialchars(strip_tags($this->firstname));
            $this->lastname=htmlspecialchars(strip_tags($this->lastname));
            $this->username=htmlspecialchars(strip_tags($this->username));
            $this->password=htmlspecialchars(strip_tags($this->password));
            $this->date_of_birth=htmlspecialchars(strip_tags($this->date_of_birth));
                   
            // bind data
            $stmt->bindParam(":firstname", $this->firstname);
            $stmt->bindParam(":lastname", $this->lastname);
            $stmt->bindParam(":username", $this->username);
            $stmt->bindParam(":password", $this->password);
            $stmt->bindParam(":date_of_birth", $this->date_of_birth);
           
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

       // GET User
       public function getSingleUser(){
        $sqlQuery = "SELECT
                    id, username, password, firstname, lastname, dob
                  FROM
                    ". $this->dbTable ."
                WHERE 
                   id = ?
                LIMIT 0,1";

        $stmt = $this->conn->prepare($sqlQuery);

        $stmt->bindParam(1, $this->id);

        $stmt->execute();

        $dataRow = $stmt->fetch(PDO::FETCH_ASSOC);
        
        $this->id = $dataRow['id'];
        $this->firstname = $dataRow['firstname'];
        $this->lastname = $dataRow['lastname'];
        $this->username = $dataRow['username'];
        $this->password = $dataRow['password'];
        $this->date_of_birth = $dataRow['dob'];
      
    }      
        

        // UPDATE User
        public function updateUser(){
            $sqlQuery = "UPDATE
                        ". $this->dbTable ."
                    SET
                    firstname = :firstname, 
                    lastname = :lastname, 
                    username = :username,
                    password = :password,
                    dob = :date_of_birth
                    WHERE 
                        id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->firstname=htmlspecialchars(strip_tags($this->firstname));
            $this->lastname=htmlspecialchars(strip_tags($this->lastname));
            $this->username=htmlspecialchars(strip_tags($this->username));
            $this->password=htmlspecialchars(strip_tags($this->password));
            $this->date_of_birth=htmlspecialchars(strip_tags($this->date_of_birth));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(":firstname", $this->firstname);
            $stmt->bindParam(":lastname", $this->lastname);
            $stmt->bindParam(":username", $this->username);
            $stmt->bindParam(":password", $this->password);
            $stmt->bindParam(":date_of_birth", $this->date_of_birth);
            $stmt->bindParam(":id", $this->id);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // DELETE User
        function deleteUser(){
            $sqlQuery = "DELETE FROM " . $this->dbTable . " WHERE id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            $stmt->bindParam(1, $this->id);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }

    }
?>

