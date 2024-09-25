import axios from "axios";
import { useToast } from "vue-toast-notification";

function useAxios() {
  const toast = useToast();
  const BASE_URL = "http://localhost:4000/todos";

  const getTodos = async () => {
    try {
      const response = await axios.get(BASE_URL);
      console.log(response);
      toast.success("succes");
      return response.data;
    } catch (err) {
      toast.error("err");
      console.log(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(BASE_URL + "/" + id);
      toast.success("succes delete");
      return response.data;
    } catch (err) {
      toast.error("err");
      console.log(err);
    }
  };

  const editTodo = async ({ id, body }) => {
    try {
      const response = await axios.put(BASE_URL + "/" + id, body);
      console.log(response);
      toast.success("succesfuly edit");
    } catch (err) {
      toast.success("succesfuly edit");
      console.log(err);
    }
  };

  return { getTodos, deleteTodo, editTodo };
}

export default useAxios;
