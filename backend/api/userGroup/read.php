
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json;");

include_once '../config/database.php';
include_once '../class/userGroup.php';

$database = new DB();
$db = $database->getConnection();

$item = new UserGroup($db);

$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die();

$stmt = $item->getUserGroups($user_id);
$itemCount = $stmt->rowCount();

if($itemCount > 0){

    $groupArr = array();

    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        $e = array(
            "id" => $row["id"],
            "groupname" => $row['groupname']            
        );

        array_push($groupArr, $e);
    }
    echo json_encode($groupArr);
}
else{
    echo json_encode(array());
}

?>