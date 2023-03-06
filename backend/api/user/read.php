
<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json;");
    
    include_once '../config/database.php';
    include_once '../class/user.php';

    $database = new DB();
    $db = $database->getConnection();

    $items = new User($db);

    $stmt = $items->getUsers();
    $itemCount = $stmt->rowCount();

    if($itemCount > 0){
        
        $userArr = array();
       
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "username" => $username,
                "password" => $password,
                "firstname" => $firstname,
                "lastname" => $lastname,
                "date_of_birth" => $dob
            );

            array_push($userArr, $e);
        }
        echo json_encode($userArr);
    }
    else{
        echo json_encode();
    }

?>