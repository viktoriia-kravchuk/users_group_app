import axios from 'axios';

const GROUP_API_URL = "http://localhost:8080/api/group";

class GroupService {

    getGroups(){
        return axios.get(`${GROUP_API_URL}/read.php`);
    }

    createGroup(group){
        return axios.post(`${GROUP_API_URL}/create.php`, group);
    }

    getGroupById(id){
        return axios.get(`${GROUP_API_URL}/single_group.php`, 
            { params: { id: id } });
    }

    updateGroup(group){
        return axios.put(`${GROUP_API_URL}/update.php`, group);
    }

    deleteGroup(id){
        return axios.delete(`${GROUP_API_URL}/delete.php`, 
                                    { params: { id: id } });
    }
}

export default new GroupService();