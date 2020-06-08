import http from "../http-common";

class CursoDataService {
  getAll() {
    return http.get("/cursos");
  }

  get(id) {
    return http.get(`/cursos/${id}`);
  }

  create(data) {
    return http.post("/cursos", data);
  }

  update(id, data) {
    return http.put(`/cursos/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cursos/${id}`);
  }

  deleteAll() {
    return http.delete(`/cursos`);
  }

  findByTitle(title) {
    return http.get(`/cursos?title=${title}`);
  }
}

export default new CursoDataService();