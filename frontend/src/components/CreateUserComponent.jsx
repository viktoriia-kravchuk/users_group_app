import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserService from "../services/UserService";
import GroupService from "../services/GroupService";
import UserGroupService from "../services/UserGroupService";

const CreateUserComponent = () => {
  const history = useHistory();
  const { id } = useParams();
  const [user, setUser] = useState({
    id: id,
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    date_of_birth: "",
  });
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  useEffect(() => {
    if (id !== "_add") {
      UserService.getUserById(id).then((res) => {
        let userData = res.data;
        setUser({
          ...user,
          firstname: userData.firstname,
          lastname: userData.lastname,
          username: userData.username,
          password: userData.password,
          date_of_birth: userData.date_of_birth,
        });
      });
      UserGroupService.getUserGroup(id).then((res) => {
        setUserGroups(res.data);
      });
    }
    GroupService.getGroups().then((res) => {
      setGroups(res.data);
    });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const saveOrUpdateUser = (event) => {
    event.preventDefault();
    if (id === "_add") {
      UserService.createUser(user).then(() => {
        history.push("/users");
      });
    } else {
      UserService.updateUser(user).then(() => {
        history.push("/users");
      });
      const new_groups = userGroups.map((group) => group.id);
      UserGroupService.updateUserGroups(user.id, new_groups);
    }
  };

  const cancel = () => {
    history.push("/users");
  };

  const getTitle = () => {
    return id === "_add" ? (
      <h3 className="text-center">Add User</h3>
    ) : (
      <h3 className="text-center">Update User</h3>
    );
  };

  const handleChange = (isChecked, item) => {
    if (isChecked) {
      setUserGroups((prevGroups) =>
        prevGroups.filter((group) => group.id !== item.id)
      );
    } else {
      setUserGroups((prevGroups) => [...prevGroups, item]);
    }
  };

  const checkboxes = groups.map((item) => {
    const isChecked = userGroups.some((group) => group.id === item.id);
    return (
      <div key={item.id} className="form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id={item.id}
          checked={isChecked}
          onChange={() => handleChange(isChecked, item)}
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
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> User Name: </label>
                  <input
                    placeholder="User Name"
                    name="username"
                    className="form-control"
                    value={user.username}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label> First Name: </label>
                  <input
                    placeholder="First Name"
                    name="firstname"
                    className="form-control"
                    value={user.firstname}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    name="lastname"
                    className="form-control"
                    value={user.lastname}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label> Password: </label>
                  <input
                    placeholder="Password"
                    name="password"
                    className="form-control"
                    value={user.password}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label>Date Of Birth: </label>
                  <input
                    type="date"
                    placeholder="Date Of Birth"
                    name="date_of_birth"
                    className="form-control"
                    value={user.date_of_birth}
                    onChange={handleInputChange}
                  />
                </div>
                {id !== "_add" && (
                  <div className="form-group">
                    <label>User Groups:</label>
                    <div xs={6} md={4}>
                      {checkboxes}
                    </div>
                  </div>
                )}

                <button className="btn btn-success" onClick={saveOrUpdateUser}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={cancel}
                  style={{ marginLeft: "10px" }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUserComponent;
