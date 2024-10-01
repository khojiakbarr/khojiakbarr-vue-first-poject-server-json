import BASE_URL from "@/BASE_URL";
import router from "@/routes";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { createStore } from "vuex";
const token = JSON.parse(localStorage.getItem("token"));
const toast = useToast();

const store = createStore({
  state() {
    return {
      name: localStorage.getItem("name")
        ? JSON.parse(localStorage.getItem("name"))
        : null,
      todos: [],
      isLoader: false,
    };
  },

  //! mutation
  mutations: {
    setLoading(state, isLoading) {
      state.isLoader = isLoading;
    },
    setTodos(state, payload) {
      state.todos = payload;
    },
    addTodoMutation(state, todo) {
      state.todos.push(todo);
    },
    deleteTodo(state, id) {
      console.log(id);

      state.todos = state.todos.filter((todo) => todo._id !== id);
    },
    editTodo(state, action) {
      state.todos = state.todos.map((todo) => {
        if (todo._id === action.id) {
          return action.todo;
        }
        return todo;
      });
    },
    isComplateTodo(state, action) {
      state.todos = state.todos.map((todo) => {
        if (todo._id === action) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });
    },
  },
  //! actions
  actions: {
    //! Register
    async register({ commit }, payload) {
      commit("setLoading", true);
      try {
        const response = await axios.post(BASE_URL + "user/register", payload);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        toast.success(response.data.message);
        router.push("/dashboard");
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        commit("setLoading", false);
      }
    },

    //! Login
    async login({ commit }, payload) {
      commit("setLoading", true);
      try {
        const response = await axios.post(BASE_URL + "user/login", payload);
        localStorage.setItem("token", JSON.stringify(response.data.token));
        toast.success(response.data.message);
        if (response.status === 200) {
          localStorage.setItem("user", JSON.stringify(payload.username));
        }
        router.push("/dashboard");
      } catch (err) {
        toast.error(err.response.data.message);
      } finally {
        commit("setLoading", false);
      }
    },

    //! Get Todos
    async getTodosAsync({ commit }) {
      commit("setLoading", true);
      try {
        const response = await axios.get(BASE_URL + "todos/all", {
          headers: {
            authorization: token,
          },
        });

        commit("setTodos", response.data.allTodos);
      } catch (err) {
        toast.success(err.response.data.message);
        console.log(err);
      } finally {
        commit("setLoading", false);
      }
    },

    //! Add Todo
    async addTodoAsync({ commit }, payload) {
      commit("setLoading", true);
      try {
        const response = await axios({
          method: "post",
          url: BASE_URL + "todos/add",
          data: payload,
          headers: {
            Authorization: token,
          },
        });
        console.log(response);

        commit("addTodoMutation", response.data.todo);
        toast.success(response.data.message);
      } catch (err) {
        toast.success(err.response.data.message);
        console.log(err);
      } finally {
        commit("setLoading", false);
      }
    },
    //! Delete Todo
    async deleteTodoAsync({ commit }, payload) {
      commit("setLoading", true);
      try {
        const response = await axios.delete(BASE_URL + `todos/${payload}`, {
          headers: {
            Authorization: token,
          },
        });
        commit("deleteTodo", payload);

        toast.success(response.data.message);
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      } finally {
        commit("setLoading", false);
      }
    },
    //! Update Todo
    async updateTodoAsync({ commit }, payload) {
      commit("setLoading", true);
      try {
        const response = await axios({
          url: BASE_URL + `todos/${payload.id}`,
          method: "put",
          data: payload.todo,
          headers: {
            Authorization: token,
          },
        });
        commit("editTodo", { id: payload.id, todo: response.data.todo });
        toast.success(response.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err);
      } finally {
        commit("setLoading", false);
      }
    },
    //! isComplated
    async isComplateAsync({ commit }, payload) {
      commit("setLoading", true);
      try {
        const response = await axios({
          url: BASE_URL + `todos?id=${payload}`,
          method: "put",
          headers: {
            Authorization: token,
          },
        });
        commit("isComplateTodo", payload);
        toast.success(response.data.message);
      } catch (err) {
        toast.error(err.response.data.message);
        console.log(err);
      } finally {
        commit("setLoading", false);
      }
    },
  },
});
export default store;
