import React from "react"

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"

import Category, { CategoryDetail } from "./pages/Category.jsx"
import Error404 from "./pages/Error404.jsx"
import Home from "./pages/Home.jsx"
import Todo from "./pages/Todo.jsx"

export default function App () {
  return <RouterProvider router={
    createBrowserRouter(
      [
        { path: "/", element: <Home /> },
        { path: "/todo/:id", element: <Todo /> },
        { path: "/category", element: <Category /> },
        { path: "/category/:id", element: <CategoryDetail /> },

        // This is the 404 page.
        { path: "*", element: <Error404 /> }
      ]
    )
  } />
}