import http from "../http-common";

class TranscriptDataService {
  create(data) {
    // console.log(data);
    return http.post("/transcript", data);
  }

  findOne(id) {
    return http.post("/transcript/find", id);
  }

  delete(id) {
    return http.delete(`/transcript/${id}`);
  }
}
export default new TranscriptDataService();
