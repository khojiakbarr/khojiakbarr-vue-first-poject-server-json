import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      todos: [],
    };
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo);
    },
    
  },
});
