import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsBurgerVisible, setPageTitle, unsetFormMessages } from "./store/slices/ui";
import { useCurrentSignX } from "./hooks/currentSignX";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useCurrentSignX();

  // UI
  useEffect(() => {
    //if (location.pathname.indexOf("user") > -1)
    dispatch(setPageTitle("Get Set"));
    dispatch(setIsBurgerVisible(false));
    dispatch(unsetFormMessages());
  }, [dispatch, location.pathname]);

  // AUTH
  useEffect(() => {
    const doesntNeedCreds = [ // allowed routes
      "/sign/in", 
      "/sign/up",
      "/sign/out",
      "/error"
    ].includes(location.pathname);
    const allowed = ((currentUser.email != "" || currentUser.organization != "") || doesntNeedCreds);
    if (!allowed) navigate("/sign/out");
  }, [currentUser.organization, currentUser.email, location.pathname, navigate]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
