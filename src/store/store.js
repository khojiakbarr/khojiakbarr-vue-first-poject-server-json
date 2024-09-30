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
  },
  setTodos(state, todos) {
    state.todos = todos;
  },
  addTodoMutation(state, todo) {
    state.todos.push(todo);
  },
  deleteTodo(state, id) {
    state.todos = state.todos.filter((todo) => todo.id !== id);
  },
  editTodo(state, action) {
    state.todos = state.todos.map((todo) => {
      if (todo.id === action.id) {
        return { ...todo, ...action };
      }
      return todo;
    });
  },
  isComplateTodo(state, action) {
    state.todos = state.todos.map((todo) => {
      if (todo.id === action.id) {
        return { ...todo, isComplate: action.isComplate };
      }
      return todo;
    });
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
        const response = await axios.post(BASE_URL + "todos/add", {
          headers: {
            authorization: token,
          },
          data: payload,
        });
        commit("addTodo", response.data.todo);
        toast.success(response.data.message);
      } catch (err) {
        toast.success(err.response.data.message);
        console.log(err);
      } finally {
        commit("setLoading", false);
      }
      commit("addTodo", payload);
    },
  },
});
export default store;
