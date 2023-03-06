import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import UserService from "../services/UserService";
import GroupService from "../services/GroupService";
import UserGroupService from "../services/UserGroupService";

const AddUserGroup = (props) => {
  const [groups, setGroups] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const history = useHistory();
  const { id } = useParams();
  useEffect(() => {
    const id = props.match.params.id;
    GroupService.getGroups().then((res) => {
      setGroups(res.data);
    });

    UserGroupService.getUserGroup(id).then((res) => {
      setUserGroups(res.data);
    });
  }, [props.match.params.id]);

  const cancel = () => {
    history.push("/users");
  };

  const updateUserGroups = (event) => {
    event.preventDefault();
    const new_groups = userGroups.map((group) => group.id);
    UserGroupService.updateUserGroups(id, new_groups).then(() => {
      history.push("/users");
    });
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
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label>User Groups:</label>
                  <div xs={6} md={4}>
                    {checkboxes}
                  </div>
                </div>

                <button className="btn btn-success" onClick={updateUserGroups}>
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

export default AddUserGroup;
