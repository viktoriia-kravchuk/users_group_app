<?php
    class Group{

        // conn
        private $conn;

        // table
        private $dbTable = "`Group`";

        // col
        public $id;
        public $groupname;
      
        // db conn
        public function __construct($db){
            $this->conn = $db;
        }

        // GET Groups
        public function getGroups(){
            $sqlQuery = "SELECT *
               FROM " . $this->dbTable . "";
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->execute();
            return $stmt;
        }

        // CREATE Group
        public function createGroup(){
            $sqlQuery = "INSERT INTO
                        ". $this->dbTable ."
                    SET
                    groupname = :groupname";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            // sanitize
            $this->groupname=htmlspecialchars(strip_tags($this->groupname));

            // bind data
            $stmt->bindParam(":groupname", $this->groupname);

        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

       // GET Group
       public function getSingleGroup(){
        $sqlQuery = "SELECT
                    id, groupname
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
        $this->groupname = $dataRow['groupname'];
      
    }      
        
        // UPDATE Group
        public function updateGroup(){
            $sqlQuery = "UPDATE
                        ". $this->dbTable ."
                    SET
                    groupname = :groupname
                    WHERE 
                        id = :id";
        
            $stmt = $this->conn->prepare($sqlQuery);
        
            $this->groupname=htmlspecialchars(strip_tags($this->groupname));
            $this->id=htmlspecialchars(strip_tags($this->id));
        
            // bind data
            $stmt->bindParam(":groupname", $this->groupname);
            $stmt->bindParam(":id", $this->id);
        
            if($stmt->execute()){
               return true;
            }
            return false;
        }

        // DELETE Group
        function deleteGroup(){
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