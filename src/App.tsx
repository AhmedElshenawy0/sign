import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import Layout from "./Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import ShowReels from "./pages/showReels/ShowReels";
import BrandingPage from "./pages/branding/Branding";
import OurService from "./pages/our-service/OurService";
import ContactPage from "./pages/contact/Contact";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <IntroPage /> },
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/showReels", element: <ShowReels /> },
      { path: "/ourService", element: <OurService /> },
      { path: "/branding", element: <BrandingPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
