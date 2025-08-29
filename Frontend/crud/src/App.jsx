import React from 'react'
import User from './User/User'
import './assets/App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddUser from './AddUser/AddUser'
import UpdateUser from './UpdateUser/UpdateUser'

const App = () => {
  const route = createBrowserRouter([
    {
      path:"/", 
      element: <User/> 
    },
    {
      path:"/addUser",
      element: <AddUser/>
    },
    {
      path:"/update/:id",
      element: <UpdateUser/>
    }
  ]);

  return (
    <div>
      <RouterProvider router={route}/>  
    </div>
  )
}

export default App
