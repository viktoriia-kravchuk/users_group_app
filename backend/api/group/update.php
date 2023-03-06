<?php
 
 header("Access-Control-Allow-Origin: *");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
 header("Access-Control-Max-Age: 3600");
 header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
    include_once '../config/database.php';
    include_once '../class/group.php';
    
    $database = new DB();
    $db = $database->getConnection();
    
    $item = new Group($db);
    
    $data = json_decode(file_get_contents("php://input"));
    
    $item->id = $data->id;
    $item->groupname = $data-> groupname;
    
    if($item->updateGroup()){
        echo json_encode("Group record updated.");
    } else{
        echo json_encode("Group record could not be updated.");
    }
?>
