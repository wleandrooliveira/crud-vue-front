<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Nome:</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="curso.name"
          name="name"
        />
      </div>

      <div class="form-group">
        <label for="description">Descrição do curso:</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="curso.description"
          name="description"
        />
      </div>
      <div class="form-group">
        <label for="teacher">Professor:</label>
        <input
          class="form-control"
          id="teacher"
          required
          v-model="curso.teacher"
          name="teacher"
        />
      </div>
      <div class="form-group">
        <label for="duration">Carga Horária:</label>
        <input
          class="form-control"
          id="duration"
          required
          v-model="curso.duration"
          name="duration"
        />
      </div>

      <button @click="saveCurso" class="btn btn-success">Salvar</button>
    </div>

    <div v-else>
      <h4>Cadastro realizado com sucesso!</h4>
      <button class="btn btn-success" @click="newCurso">Add</button>
    </div>
  </div>
</template>

<script>
import CursoDataService from "../services/CursoDataService";

export default {
  name: "add-curso",
  data() {
    return {
      curso: {
        id: null,
        name: "",
        description: "",
        teacher: "",
        duration: "",
        available: false
      },
      submitted: false
    };
  },
  methods: {
    saveCurso() {
      var data = {
        name: this.curso.name,
        description: this.curso.description,
        teacher: this.curso.teacher,
        duration: this.curso.duration
      };

      CursoDataService.create(data)
        .then(response => {
          this.curso.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newCurso() {
      this.submitted = false;
      this.curso = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>