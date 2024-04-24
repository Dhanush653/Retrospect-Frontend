import axios from 'axios';

class RetrospectService{
    loginUser(userData){
        return axios.post("http://localhost:8080/login",userData);
    }
    generateUserByToken(token) {
        return axios.get("http://localhost:8080/getbyJWT", {
            headers: {
                'token': token
            }
        });
    }

}
export default new RetrospectService();