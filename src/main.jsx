import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import AboutProject from './Components/AboutProject.jsx';
import Contact from './Components/NavComponents/Contact.jsx';

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"project/:id",
        element:<AboutProject/>
      },
      {
        path:"contact",
        element:<Contact/>
      }
    //   {
    //     path:"*",
    //     element:<PageNotFound/>
    //   }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
