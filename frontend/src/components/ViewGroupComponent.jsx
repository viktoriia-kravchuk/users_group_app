import React, { useState, useEffect } from "react";
import GroupService from "../services/GroupService";
import UserGroupService from "../services/UserGroupService";

function ViewGroupComponent(props) {
  const [group, setGroup] = useState({});
  const [users, setUsers] = useState([]);
  const id = props.match.params.id;;

  useEffect(() => {
    GroupService.getGroupById(id).then((res) => {
      setGroup(res.data);
    });

    UserGroupService.getGroupUsers(id).then((res) => {
      setUsers(res.data);
    });
  }, [props.match.params.id]);

  const deleteUser = (user_id) => {
    console.log("Delete user", user_id, id);
    UserGroupService.deleteUser(user_id, id).then((res) => {
      setUsers(users.filter((user) => user.id !== user_id));
    });
  }

  return (
    <div>
      <br></br>
      <div className="card col-md-12">
        <h3 className="text-center"> View Group Details</h3>
        <div className="card-body">
          <div className="row">
            <label> Group Name: </label>
            <div>{group.groupname}</div>
          </div>
          <div className="row">
            <label> Group Users: </label>
            {users.length > 0 ? (
              <table className="table table-striped table-bordered">
                <thead>
                  <tr>
                    <th> Username</th>
                    <th> First Name</th>
                    <th> Last Name</th>
                    <th> Date Of Birth</th>
                    <th> Actions </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id}>
                      <td> {user.username}</td>
                      <td> {user.firstname} </td>
                      <td> {user.lastname}</td>
                      <td>{user.date_of_birth}</td>
                      <td>
                        {" "}
                        <button
                          style={{ marginLeft: "10px" }}
                          onClick={() => deleteUser(user.id)}
                          className="btn btn-danger"
                        >
                          Delete User{" "}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No users in this group yet. </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewGroupComponent;
