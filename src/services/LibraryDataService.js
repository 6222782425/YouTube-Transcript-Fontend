import http from "../http-common";

class LibraryDataService {
  create(data) {
    // console.log(data);
    return http.post("/library", data);
  }

  findOne() {
    return http.get(`/library`);
  }
}
export default new LibraryDataService();
