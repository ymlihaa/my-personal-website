import { Home, About, Skills, Blog } from '../pages'

import {
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "about",
    element: <About />,
  },
  {
    path: "skills",
    element: <Skills />,
  },
  {
    path: "blog",
    element: <Blog />,
  },
]);

export default router;