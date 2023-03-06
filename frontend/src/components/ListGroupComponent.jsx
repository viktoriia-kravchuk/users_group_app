import React, { useState, useEffect } from "react";
import GroupService from "../services/GroupService";

const ListGroupComponent = (props) => {
  const [groups, setGroups] = useState([]);

  const addGroup = () => {
    props.history.push("/add-group/_add");
  };

  const editGroup = (id) => {
    props.history.push(`/add-group/${id}`);
  };

  const deleteGroup = (id) => {
    GroupService.deleteGroup(id).then((res) => {
      setGroups(groups.filter((group) => group.id !== id));
    });
  };

  const viewGroup = (id) => {
    props.history.push(`/view-group/${id}`);
  };

  useEffect(() => {
    GroupService.getGroups().then((res) => {
      setGroups(res.data);
    });
  }, []);

  return (
    <div className="col-md-10 offset-md-1">
      <h2 className="text-center">Groups List</h2>
      <div className="row">
        <button className="btn btn-primary" onClick={addGroup}>
          Add Group
        </button>
      </div>
      <br></br>
      <div className="row">
        <table className="table table-striped table-bordered">
          <thead>
            <tr> 
              <th className="">Group Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groups.length > 0 &&
              groups.map((group) => (
                <tr key={group.id}>
                  <td> {group.groupname}</td>
                  <td>
                  <button
                      
                      onClick={() => viewGroup(group.id)}
                      className="btn btn-info"
                    >
                      View{" "}
                    </button>
                    <button
                    style={{ marginLeft: "10px" }}
                      onClick={() => editGroup(group.id)}
                      className="btn btn-warning"
                    >
                      Update{" "}
                    </button>
                    <button
                      style={{ marginLeft: "10px" }}
                      onClick={() => deleteGroup(group.id)}
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

export default ListGroupComponent;
