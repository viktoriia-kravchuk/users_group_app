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

$userGroup = new UserGroup($db);

// Get the user ID and new groups from the request body.
$data = json_decode(file_get_contents("php://input"));

$user_id = $data->user_id;
$new_groups = $data->new_groups;

// Update the user's groups.
$userGroup->updateUserGroups($user_id, $new_groups);

// Send a response.
echo json_encode(array("message" => "User groups updated."));

?>