<?php
    class UserGroup{

        // conn
        private $conn;

        // table
        private $dbTable = "UserGroup";
        private $groupTable = "`Group`";
        private $userTable = "User";

        // col
        public $user_id;
        public $group_id;
      
        // db conn
        public function __construct($db){
            $this->conn = $db;
        }

        // GET User Groups

        public function getUserGroups($user_id) {
            $sqlQuery = "SELECT {$this->groupTable}.groupname, {$this->groupTable}.id
            FROM {$this->dbTable}
            JOIN {$this->groupTable} ON {$this->dbTable}.group_id = {$this->groupTable}.id
            WHERE {$this->dbTable}.user_id = ?";
            
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(1, $user_id);
            $stmt->execute();
            
            return $stmt;
        }


        // GET Group Users
        
        public function getGroupUsers($group_id) {
            $sqlQuery = "SELECT {$this->userTable}.*
            FROM {$this->userTable}
            JOIN {$this->dbTable} ON {$this->userTable}.id = {$this->dbTable}.user_id
            WHERE {$this->dbTable}.group_id = ?";
            
            $stmt = $this->conn->prepare($sqlQuery);
            $stmt->bindParam(1, $group_id);
            $stmt->execute();
            
            return $stmt;
        }


        // UPDATE User Groups
        public function updateUserGroups($user_id, $new_groups){

        // First, we need to delete all existing user-group relationships for this user.

        $deleteQuery = "DELETE FROM {$this->dbTable} WHERE user_id = ?";
        $deleteStmt = $this->conn->prepare($deleteQuery);
        $deleteStmt->bindParam(1, $user_id);
        $deleteStmt->execute();

        foreach ($new_groups as $group_id) {
                // create a new user-group relationship for each group.
                $insertQuery = "INSERT INTO {$this->dbTable} (user_id, group_id) VALUES (?, ?)";
                $insertStmt = $this->conn->prepare($insertQuery);
                $insertStmt->bindParam(1, $user_id);
                $insertStmt->bindParam(2, $group_id);
                $insertStmt->execute();
            }
        }

        // DELETE User from Group
        function deleteUserFromGroup($user_id, $group_id){
            $sqlQuery = "DELETE FROM {$this->dbTable} WHERE user_id = ? AND group_id = ?";
            $stmt = $this->conn->prepare($sqlQuery);
        
            $stmt->bindParam(1, $user_id);
            $stmt->bindParam(2, $group_id);
        
            if($stmt->execute()){
                return true;
            }
            return false;
        }

        // ADD User to group
        

    }
?>