import { createBrowserRouter, RouterProvider } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import Layout from "./Layout";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Projects from "./pages/projects/Projects";
import BrandingPage from "./pages/branding/Branding";
import OurService from "./pages/our-service/OurService";
import ContactPage from "./pages/contact/Contact";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <IntroPage /> },
      { path: "/home", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/Projects", element: <Projects /> },
      { path: "/ourService", element: <OurService /> },
      { path: "/branding", element: <BrandingPage /> },
      { path: "/contact", element: <ContactPage /> },
    ],
  },
]);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);
  return <RouterProvider router={router} />;
}

export default App;
