import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import CompanyHome from "./components/CompanyHome/CompanyHome";
import Home from "./components/Home/Home";

function App() {
const routes= createBrowserRouter([
    {

    path:"",element:<Layout/>,
    children:[
      {path:"/",element:<Home/>},
      { path:"company",element:<CompanyHome/>}
  ]

 }
]);

  return <>
  
  <RouterProvider router={routes}></RouterProvider>
  </>;
}

export default App;
