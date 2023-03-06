
<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json;");
    
    include_once '../config/database.php';
    include_once '../class/group.php';

    $database = new DB();
    $db = $database->getConnection();

    $items = new Group($db);

    $stmt = $items->getGroups();
    $itemCount = $stmt->rowCount();

    

    if($itemCount > 0){
        
        $groupArr = array();
       
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            $e = array(
                "id" => $id,
                "groupname" => $groupname
            );

            array_push($groupArr, $e);
        }
        echo json_encode($groupArr);
    }
    else{
        echo json_encode();
    }

?>