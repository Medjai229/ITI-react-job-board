import { create } from "zustand";
import axios from "axios";

const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Y2M5Njc1ZTc4YzJkMDczY2U5MmE2OCIsImlzTG9nZ2VkSW4iOnRydWUsInJvbGUiOiJlbXBsb3llciIsImlhdCI6MTc0MTQ2MTE4NywiZXhwIjoxNzQxNDk3MTg3fQ.lT0svKjhVE-BG8aAkAIh8h-gfXgfICDCVIEihUxrmJg";

const useJobStore = create((set) => ({
  jobs: [],
  selectedJob: null,
  loading: false,
  error: null,
  fetchJobs: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get("http://localhost:3000/api/job/", {
        headers: {
          Authorization: TOKEN,
        },
      });
      set({ jobs: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
  fetchJobDetails: async (jobId) => {
    set({ loading: true, error: null, selectedJob: null });
    try {
      const response = await axios.get(`http://localhost:3000/api/job/${jobId}`, {
        headers: {
          Authorization: TOKEN,
        },
      });
      set({ selectedJob: response.data, loading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || error.message, loading: false });
    }
  },
}));

export default useJobStore;