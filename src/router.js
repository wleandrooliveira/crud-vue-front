import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/cursos",
      name: "cursos",
      component: () => import("./components/CursosList")
    },
    {
      path: "/cursos/:id",
      name: "curso-details",
      component: () => import("./components/Curso")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddCurso")
    }
  ]
});