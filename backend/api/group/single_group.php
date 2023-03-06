<?php
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: X-Requested-With, 
    Content-Type, Origin, Cache-Control, Pragma, Authorization, 
    Accept, Accept-Encoding");
    header("Content-Type: application/json;");
    
    include_once '../config/database.php';
    include_once '../class/group.php';

    $database = new DB();
    $db = $database->getConnection();

    $item = new Group($db);

    $item->id = isset($_GET['id']) ? $_GET['id'] : die();
  
    $item->getSingleGroup();

    if($item != null){
        $group_Arr = array(
            "id" =>  $item->id,
            "groupname" => $item->groupname
        );
      
        http_response_code(200);
        echo json_encode($group_Arr);
    }
      
    else{
        http_response_code(404);
        echo json_encode("Group record not found.");
    }
?>