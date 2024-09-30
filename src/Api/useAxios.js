import BASE_URL from "@/BASE_URL";
import store from "@/store/store";
import axios from "axios";
import { useToast } from "vue-toast-notification";

export default function useAxios() {
  const toast = useToast();
  const register = async (body) => {
    try {
      const response = await axios.post(BASE_URL + "user/register", body);
      toast.success(response.message);
      store.commit
    } catch (err) {
      toast.error(err.response.message);
      console.error(err);
    }
  };
  return { register };
}
