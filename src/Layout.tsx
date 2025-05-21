import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/global/Navbar";
import Footer from "./components/global/Footer";

const Layout = () => {
  const location = useLocation();
  const hideHeaderRoutes = ["/"];
  return (
    <div>
      {!hideHeaderRoutes.includes(location.pathname) && <Navbar />}
      <Outlet />
      {!hideHeaderRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
};

export default Layout;
