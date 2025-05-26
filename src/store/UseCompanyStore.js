import { create } from "zustand";
import axios from "axios";

const useCompanyStore = create((set) => ({
  companies: [],
  isLoading: false,
  error: null,

  getAllCompanies: async () => {
    set({ isLoading: true, error: null });
    const token = localStorage.getItem("UserToken");

    if (!token) {
      set({
        error: "No token found. Please log in again.",
        isLoading: false,
      });
      return;
    }

    try {
      const res = await axios.get(
        "http://localhost:4200/api/companies/display",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Fixed: Added space after Bearer
          },
        }
      );

      set({ companies: res.data.foundedCompany || [], isLoading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch companies.";
      set({ error: errorMessage, isLoading: false });
    }
  },

  getCompanyByDetails: async (id) => {
    set({ isLoading: true, error: null });
    const token = localStorage.getItem("UserToken");

    if (!token) {
      set({
        error: "No token found. Please log in again.",
        isLoading: false,
      });
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:4200/api/companies/display/${id}`, // Fixed: Unified port to 4200
        {
          headers: {
            Authorization: `Bearer ${token}`, // Fixed: Added space after Bearer
          },
        }
      );

      set({ companies: res.data.foundedCompany || [], isLoading: false });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch company details.";
      set({ error: errorMessage, isLoading: false });
    }
  },
}));

export default useCompanyStore;