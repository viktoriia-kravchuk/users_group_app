<?php
 
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
 header("Access-Control-Max-Age: 3600");
 header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
    
    include_once '../config/database.php';
    include_once '../class/user.php';
    
    $database = new DB();
    $db = $database->getConnection();
    
    $item = new User($db);
    
    $data = json_decode(file_get_contents("php://input"));
    
    $item->id = $data->id;
    $item->firstname = $data->firstname;
    $item->lastname = $data->lastname;
    $item->username = $data->username;
    $item->password = $data->password;
    $item->date_of_birth = $data->date_of_birth;
   
    
    if($item->updateUser()){
        echo json_encode("User record updated.");
    } else{
        echo json_encode("User record could not be updated.");
    }
?>