import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import CreateJob from './components/CreateJob/CreateJob'
import JobsPage from './components/JobsPage/JobsPage'
import JobDetailsPage from './components/JobDetailsPage/JobDetailsPage'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';


function App() {

  const routes = createBrowserRouter([
    {path: '', element: <Layout/>, children: [
      {path: '/', element: <Home />},
      {path: '/add-job', element: <CreateJob />},
      {path: '/jobs', element: <JobsPage />},
      {path: '/job/:id', element: <JobDetailsPage/>}
    ]}
  ])

  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
