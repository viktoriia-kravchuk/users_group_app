import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import UserGroupService from "../services/UserGroupService";

const ListUserComponent = (props) => {
  const [users, setUsers] = useState([]);
  const [usersGroups, setUsersGroups] = useState({});

  const addUser = () => {
    props.history.push("/add-user/_add");
  };

  const editUser = (id) => {
    props.history.push(`/add-user/${id}`);
  };

  const editUserGroups = (id) => {
    props.history.push(`/add-user-group/${id}`);
  };

  const deleteUser = (id) => {
    UserService.deleteUser(id).then((res) => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  const viewUser = (id) => {
    props.history.push(`/view-user/${id}`);
  };

  useEffect(() => {
    UserService.getUsers().then((res) => {
      setUsers(res.data);
    });
  }, []);

  useEffect(() => {
    if(users.length > 0){
    users.map((user) =>
      UserGroupService.getUserGroup(user.id).then((res) => {
        setUsersGroups((prevData) => ({
          ...prevData,
          [user.id]: res.data,
        }));
      })
    );}
  }, [users]);
  
  return (
    <div>
      <h2 className="text-center">Users List</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={addUser}>
          Add User
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th> Username</th>
              <th> First Name</th>
              <th> Last Name</th>
              <th> Date Of Birth</th>
              <th> User Groups </th>
              <th> Actions</th>
            </tr>
          </thead>
          <tbody>
            {users && users.map((user) => (
              <tr key={user.id}>
                <td> {user.username}</td>
                <td> {user.firstname} </td>
                <td> {user.lastname}</td>
                <td>{user.date_of_birth}</td>
                <td>
                  {usersGroups[user.id] &&
                    usersGroups[user.id].map((group, index) => (
                      <li key={index}>{group.groupname}</li>
                    ))}

                </td>
                <td>
                <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => viewUser(user.id)}
                    className="btn btn-info"
                  >
                    View{" "}
                  </button>
                  
                  <button
                  style={{ marginLeft: "10px" }}
                    onClick={() => editUser(user.id)}
                    className="btn btn-warning"
                  >
                    Update{" "}
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => editUserGroups(user.id)}
                    className="btn btn-success"
                  >
                    Edit Groups{" "}
                  </button>
                  <button
                    style={{ marginLeft: "10px" }}
                    onClick={() => deleteUser(user.id)}
                    className="btn btn-danger"
                  >
                    Delete{" "}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListUserComponent;
