import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import CreateJob from './components/CreateJob/CreateJob'
import JobsPage from './components/JobsPage/JobsPage'

function App() {

  const routes = createBrowserRouter([
    {path: '', element: <Layout/>, children: [
      {path: '/', element: <Home />},
      {path: 'add-job', element: <CreateJob />},
      {path: 'jobs', element: <JobsPage />}
    ]}
  ])

  return (
    <>
    <RouterProvider router={routes}></RouterProvider>
    </>
  )
}

export default App
