import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import GroupService from "../services/GroupService";

const CreateGroupComponent = () => {
  const history = useHistory();
  const { id } = useParams();
  const [group, setGroup] = useState({
    id: id,
    groupname: "",
  });

  useEffect(() => {
    if (id !== "_add") {
      GroupService.getGroupById(id).then((res) => {
        let groupData = res.data;
        setGroup({
          ...group,
          groupname: groupData.groupname,
        });
      });
    }
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setGroup({
      ...group,
      [name]: value,
    });
  };

  const saveOrUpdateGroup = (event) => {
    event.preventDefault();
    if (id === "_add") {
      GroupService.createGroup(group).then(() => {
        history.push("/groups");
      });
    } else {
      GroupService.updateGroup(group).then(() => {
        history.push("/groups");
      });
    }
  };

  const cancel = () => {
    history.push("/groups");
  };

  const getTitle = () => {
    return id === "_add" ? (
      <h3 className="text-center">Add Group</h3>
    ) : (
      <h3 className="text-center">Update Group</h3>
    );
  };

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
                  <label> Group Name: </label>
                  <input
                    placeholder="Group Name"
                    name="groupname"
                    className="form-control"
                    value={group.groupname}
                    onChange={handleInputChange}
                  />
                </div>
                <button className="btn btn-success" onClick={saveOrUpdateGroup}>
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

export default CreateGroupComponent;
