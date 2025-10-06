import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store";
import { setUser, ssKeyUser } from "./store/slices/user";
import { setCorporation, ssKeyCorp } from "./store/slices/corporation";
import { apiPost } from "./features/forms/helpers";
import { setIsAuthorized, setIsBurgerVisible, setPageTitle } from "./store/slices/ui";
import { unsetFormMessages } from "./store/slices/forms";

const App = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const corp = useSelector((state: RootState) => state.corporation);
  const ui = useSelector((state: RootState) => state.ui);

  const hasCreds = useCallback(async () => {
    if (ui.isAuthorized && user._id != "" && corp._id != "") return true;
    // see if we just lost our connection
    const userFromSS = sessionStorage.getItem(ssKeyUser) || user._id;
    const corpFromSS = sessionStorage.getItem(ssKeyCorp) || corp._id;
    if (userFromSS != "" && corpFromSS != "") {
      const data = await apiPost("users/signin", {
        email: userFromSS,
        corporation: corpFromSS
      });
      if (data.user) dispatch(setUser(data.user));
      if (data.corporation) dispatch(setCorporation(data.corporation));
      if (data.user && data.corporation) {
        dispatch(setIsAuthorized(true));
        return true;
      }
    }
    dispatch(setIsAuthorized(false));
    return false;
  }, [corp._id, dispatch, ui.isAuthorized, user._id]);

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
    if (!(hasCreds() || doesntNeedCreds)) navigate("/sign/out");
  }, [hasCreds, location.pathname, navigate]);

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
