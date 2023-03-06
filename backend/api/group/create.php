<?php
   
   header("Access-Control-Allow-Origin: *");
   header("Content-Type: application/json;");
   header("Access-Control-Allow-Methods: POST");
   header("Access-Control-Max-Age: 3600");
   header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../config/database.php';
    include_once '../class/group.php';

    $database = new DB();
    $db = $database->getConnection();

    $item = new Group($db);

    $data = json_decode(file_get_contents("php://input"));

    $item->groupname = $data->groupname;
      
    if($item->createGroup()){
        echo json_encode("Group created.");
    } else{
        echo json_encode("Failed to create group.");
    }
?>