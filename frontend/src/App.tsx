import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsBurgerVisible, setIsProcessing, setPageTitle, unsetFormMessages } from "./store/slices/ui";
import { useCurrentTokens } from "./hooks/currentTokens";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const currentTokens = useCurrentTokens();

    // UI
    useEffect(() => {
        if (location.pathname.indexOf("/play") > -1) {
            dispatch(setPageTitle(currentTokens.organization));
        } else {
            dispatch(setPageTitle("Let's Play"));
        }
        dispatch(setIsBurgerVisible(false));
        dispatch(setIsProcessing(false));
        dispatch(unsetFormMessages());
    }, [currentTokens.organization, dispatch, location.pathname]);

    // AUTH
    useEffect(() => {
        const doesntNeedCreds = [ // allowed routes
            "/sign/in", 
            "/sign/up",
            "/sign/out",
            "/error"
        ].includes(location.pathname);
        const allowed = (doesntNeedCreds || (currentTokens.email != "" && currentTokens.organization != ""));
        if (!allowed) navigate("/sign/out");
    }, [currentTokens.organization, currentTokens.email, location.pathname, navigate]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
