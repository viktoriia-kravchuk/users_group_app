<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type,Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';
include_once '../class/userGroup.php';

$database = new DB();
$db = $database->getConnection();

$groupUsers = new UserGroup($db);

// Get the user ID and group ID
$user_id = isset($_GET['user_id']) ? $_GET['user_id'] : die();
$group_id = isset($_GET['group_id']) ? $_GET['group_id'] : die();
// Update the group users.
$groupUsers->deleteUserFromGroup($user_id, $group_id);
// Send a response.
echo json_encode(array("message" => "Group was  updated."));

?>