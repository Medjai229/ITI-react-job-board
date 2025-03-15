import { Route, Routes } from "react-router-dom";
import CompanyHome from "./components/CompanyHome/CompanyHome";
import CreateJob from "./components/CreateJob/CreateJob";
import Home from "./components/Home/Home";
import JobDetailsPage from "./components/JobDetailsPage/JobDetailsPage";
import JobsPage from "./components/JobsPage/JobsPage";
import Login from "./components/Login/Login";
import ProfilePage from "./components/Profile/Profile";
import Register from "./components/Register/Register";
import Layout from "./components/layout/Layout";

function App() {
  return(
    <>
    <Routes>

      <Route element={<Layout/>}>
        <Route index element={<Home/>} />
        CreateJob
        <Route path="CreateJob" element={<CreateJob/>} />
        <Route path="jobs" element={<JobsPage/>} />
        <Route path="job-details" element={<JobDetailsPage/>} />
        <Route path="Profile" element={<ProfilePage/>} />
        <Route path="CompanyHome" element={<CompanyHome/>} />
      </Route>

      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />

    </Routes>
    </>

  )
}
export default App;
