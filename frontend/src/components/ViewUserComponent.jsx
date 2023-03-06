import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import GroupService from "../services/GroupService";
import UserGroupService from "../services/UserGroupService";

function ViewUserComponent(props) {
  const [user, setUser] = useState({});
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    const id = props.match.params.id;
    UserService.getUserById(id).then((res) => {
      setUser(res.data);
    });
    GroupService.getGroups().then((res) => {
      setGroups(res.data);
    });

    UserGroupService.getUserGroup(id).then((res) => {
      setUserGroups(res.data);
    });
  }, [props.match.params.id]);

  const checkboxes = groups.map((item) => {
    const isChecked = userGroups.some((group) => group.id === item.id);
    return (
      <div key={item.id} className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={item.id}
          checked={isChecked}
          onChange={() => {}}
        />
        <label className="form-check-label" htmlFor={item.id}>
          {item.groupname}
        </label>
      </div>
    );
  });

  return (
    <div>
      <br></br>
      <div className="card col-md-6 offset-md-3">
        <h3 className="text-center"> View User Details</h3>
        <div className="card-body">
          <div className="row">
            <label> Username: </label>
            <div>{user.username}</div>
          </div>
          <div className="row">
            <label className="form-label"> First Name: </label>
            <div> {user.firstname}</div>
          </div>
          <div className="row">
            <label> Last Name: </label>
            <div> {user.lastname}</div>
          </div>
          <div className="row">
            <label> Password: </label>
            <div> {user.password}</div>
          </div>
          <div className="row">
            <label> Date Of Birth: </label>
            <div> {user.date_of_birth}</div>
          </div>
          <div className="row">
            <label>User Groups:</label>
            <div xs={6} md={4}>
              {checkboxes}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewUserComponent;
