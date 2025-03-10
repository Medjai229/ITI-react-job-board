import { create } from "zustand";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const useUserStore = create((set) => ({
  user: {
    confirmEmail: false,
    email: "",
    userName: "",
    role: "",
    cv: "",
  },

  getUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No token found");

    const decodedToken = jwtDecode(token);
    console.log("Decoded Token:", decodedToken);

    try {
      const { data } = await axios.get(
        `http://localhost:4200/api/user/${decodedToken.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      set({ user: data.user });
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response?.data || error.message
      );
    }
  },

  updateUser: async (updatedData) => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No token found");

    const decodedToken = jwtDecode(token);

    const { role, ...filteredData } = updatedData;

    try {
      const response = await axios.put(
        `http://localhost:4200/api/user/${decodedToken.id}`,
        filteredData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("Update response:", response.data);
      set((state) => ({ user: { ...state.user, ...filteredData } }));
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
    }
  },

  deleteUser: async () => {
    const token = localStorage.getItem("token");
    if (!token) return console.error("No token found");

    const decodedToken = jwtDecode(token);

    try {
      const { data } = await axios.delete(
        `http://localhost:4200/api/user/${decodedToken.id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.message === "User deleted successfully") {
        console.log("User deleted");
        set({ user: {} });
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error(
        "Error deleting user:",
        error.response?.data || error.message
      );
    }
  },
}));

export default useUserStore;
