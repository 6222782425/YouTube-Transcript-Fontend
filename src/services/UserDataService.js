import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/user");
  }
  get(id) {
    return http.get(`/user/${id}`);
  }
  create(data) {
    // console.log(data);
    return http.post("/user/register", data);
  }
  login(data) {
    console.log(data);
    return http.post("/user/login", data);
  }
  // update(id, data) {
  //   return http.put(`/user/${id}`, data);
  // }
  delete(id) {
    return http.delete(`/user/${id}`);
  }
  deleteAll() {
    return http.delete(`/user`);
  }
  findMe() {
    return http.get("/user/me");
  }
}
export default new UserDataService();
