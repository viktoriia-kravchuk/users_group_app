
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");

include_once '../config/database.php';
include_once '../class/userGroup.php';

$database = new DB();
$db = $database->getConnection();

$item = new UserGroup($db);

$group_id = isset($_GET['group_id']) ? $_GET['group_id'] : die();

$stmt = $item->getGroupUsers($group_id);
$itemCount = $stmt->rowCount();

if($itemCount > 0){

    $groupArr = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $e = array(
            "id" => $row["id"],
            "username" =>  $row["username"],
            "firstname" =>  $row["firstname"],
            "lastname" =>  $row["lastname"],
            "date_of_birth" =>  $row["dob"]    
        );

        array_push($groupArr, $e);
    }
    echo json_encode($groupArr);
}
else{
    echo json_encode(array());
}

?>