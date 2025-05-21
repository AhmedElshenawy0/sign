import { createBrowserRouter, RouterProvider } from "react-router-dom";

import IntroPage from "./pages/IntroPage";
import Layout from "./Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <IntroPage /> },
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
