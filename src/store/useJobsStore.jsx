import { create } from "zustand";
import axios from "axios";

const useJobStore = create((set) => ({
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,

  fetchJobs: async () => {
    set({ loading: true, error: null });

    const token = localStorage.getItem("UserToken");
    try {
      const response = await axios.get("http://localhost:4200/api/job/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      set({ jobs: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },

  fetchJobDetails: async (jobId) => {
    set({ loading: true, error: null, selectedJob: null });

    const token = localStorage.getItem("UserToken");
    try {
      const response = await axios.get(
        `http://localhost:4200/api/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ selectedJob: response.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || error.message,
        loading: false,
      });
    }
  },
}));

export default useJobStore;
