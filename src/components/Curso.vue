<template>
  <div v-if="currentCurso" class="edit-form">
    <h4>Curso</h4>
    <form>
      <div class="form-group">
        <label for="title">Nome do curso:</label>
        <input type="text" class="form-control" id="title"
          v-model="currentCurso.nome"
        />
      </div>
      <div class="form-group">
        <label for="description">Descrição do curso:</label>
        <input type="text" class="form-control" id="description"
          v-model="currentCurso.description"
        />
      </div>
      <div class="form-group">
        <label for="teacher">Professor:</label>
        <input type="text" class="form-control" id="teacher"
          v-model="currentCurso.teacher"
        />
      </div>
      <div class="form-group">
        <label for="duration">Carga horária:</label>
        <input type="text" class="form-control" id="duration"
          v-model="currentCurso.duration"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentCurso.available ? "Disponivel" : "Pendente" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentCurso.available"
      @click="updateAvaliable(false)"
    >
      Indisponivel
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updateAvaliable(true)"
    >
      Disponivel
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteCurso"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateCurso"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Clique no curso desejado...</p>
  </div>
</template>

<script>
import CursoDataService from "../services/CursoDataService";

export default {
  name: "curso",
  data() {
    return {
      currentCurso: null,
      message: ''
    };
  },
  methods: {
    getCurso(id) {
      CursoDataService.get(id)
        .then(response => {
          this.currentCurso = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateAvaliable(status) {
      var data = {
        id: this.currentCurso.id,
        name: this.currentCurso.name,
        description: this.currentCurso.description,
        teacher: this.currentCurso.teacher,
        duartion: this.currentCurso.duration,
        available: status
      };

      CursoDataService.update(this.currentCurso.id, data)
        .then(response => {
          this.currentCurso.available = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateCurso() {
      CursoDataService.update(this.currentCurso.id, this.currentCurso)
        .then(response => {
          console.log(response.data);
          this.message = 'The course was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteCurso() {
      CursoDataService.delete(this.currentCurso.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "cursos" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getCurso(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>