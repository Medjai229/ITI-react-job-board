import { Route, Routes } from "react-router-dom";
import CompanyHome from "./components/CompanyHome/CompanyHome";
import CreateJob from "./components/CreateJob/CreateJob";
import Home from "./components/Home/Home";
import JobDetailsPage from "./components/JobDetailsPage/JobDetailsPage";
import JobsPage from "./components/JobsPage/JobsPage";
import Login from "./components/Login/Login";
import ProfilePage from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Layout from "./components/Layout/Layout";
import './assets/fonts/clash-display.css';
import CompanyDetails from "./components/CompanyDetails/CompanyDetails";
import CreateCompany from "./components/CreateCompany/CreateCompany";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="create-job" element={<CreateJob />} />
          <Route path="jobs" element={<JobsPage />} />
          <Route path="job/:id" element={<JobDetailsPage />} />
          <Route path="Profile" element={<ProfilePage />} />
          <Route path="CompanyHome" element={<CompanyHome />} />{" "}
          <Route path="CompanyDetails/:id" element={<CompanyDetails />} />{" "}
          <Route path="createcompany" element={<CreateCompany />} />{" "}
        </Route>

        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </>
  );
}
export default App;
