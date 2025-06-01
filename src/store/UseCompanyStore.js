import { create } from "zustand";
import axios from "axios";
import CreateCompany from "../components/CreateCompany/CreateCompany";

const useCompanyStore = create((set) => ({
  companies: [],
  isLoading: false,
  error: null,

  getAllCompanies: async () => {
    set({ isLoading: true });
    const token = localStorage.getItem("UserToken");

    try {
      const res = await axios.get(
        "http://localhost:4200/api/companies/display",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      set({ companies: res.data, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  getCompanyBydetails:async (id) => {
    set({ isLoading: true });
    const token = localStorage.getItem("UserToken");
    try {
      const res = await axios.get(
        `http://localhost:4200/api/companies/display/${id}`,
        {
          headers: {
            Authorization: `Bearer${token}`,
          },
        }
      );

      set({ companies: res.data });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  CreateCompanies: async (formdata) => {
    const token = localStorage.getItem("UserToken");
    try {
      const { data } = await axios.post(
        "http://localhost:4200/api/companies/register",
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(data);
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));

export default useCompanyStore;
