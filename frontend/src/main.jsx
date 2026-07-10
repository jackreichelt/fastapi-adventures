import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

// Import our pages
import HomePage from "./pages/HomePage.jsx"
import SlidePage from "./pages/SlidePage.jsx"
import VotingPage from "./pages/VotingPage.jsx"

//Import our components

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/slide/:id",
    element: <SlidePage />
  },
  {
    path: "/vote/:id",
    element: <VotingPage />
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);



