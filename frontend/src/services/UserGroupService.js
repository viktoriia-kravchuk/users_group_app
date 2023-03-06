import axios from "axios";

const USER_GROUP_API_URL = "http://localhost:8080/api/userGroup";

class UserGroupService {
  getUserGroup(id) {
    return axios.get(`${USER_GROUP_API_URL}/read.php`, {
      params: { user_id: id },
    });
  }

  getGroupUsers(id) {
    return axios.get(`${USER_GROUP_API_URL}/read_group.php`, {
      params: { group_id: id },
    });
  }

  updateUserGroups(user_id, new_groups) {
    return axios.put(`${USER_GROUP_API_URL}/update.php`, {
      user_id: user_id,
      new_groups: new_groups,
    });
  }

  deleteUser(user_id, group_id) {
    return axios.delete(`${USER_GROUP_API_URL}/delete.php`, {
      params : { user_id: user_id,
        group_id: group_id}

    });
  }

}

export default new UserGroupService();
