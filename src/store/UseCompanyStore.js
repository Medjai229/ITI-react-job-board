import { create } from "zustand";
import axios from "axios";

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
            Authorization: `Bearer${token}`,
          },
        }
      );

      set({ companies: res.data, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  getCompanyBydetails,
}));
