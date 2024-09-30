import BASE_URL from "@/BASE_URL";
import router from "@/routes";
import axios from "axios";
import { useToast } from "vue-toast-notification";
import { createStore } from "vuex";
const token = localStorage.getItem("token");
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
  //!actions
  actions: {
    async login({ commit }, payload) {
      commit("setLoading", true);
      try {
        const response = await axios.post(BASE_URL + "user/register", payload);
        console.log(response);
        toast.success(response.data.message);
        router.push("/dashboard");
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      } finally {
        commit("setLoading", false);
      }
    },
  },
});
export default store;
