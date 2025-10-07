import { useEffect, useMemo } from "react";
import type { SignX } from "../store/slices/forms";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { apiPost } from "../features/forms/helpers";
import { setUser, ssKeyUser, unsetUser } from "../store/slices/user";
import { setCorporation, ssKeyCorp } from "../store/slices/corporation";
import { setIsAuthorized } from "../store/slices/ui";

export const useCurrentSignX = (): SignX => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const corp = useSelector((state: RootState) => state.corporation);
    const ui = useSelector((state: RootState) => state.ui);

    const result: SignX = useMemo(() => {
        return {
            email: user.email,
            corporation: corp.title
        }
    }, [corp.title, user.email]);

    useEffect(() => {
        if (!ui.isAuthorized || user._id == "" || corp._id == "") {
            // see if we just lost our connection
            const userFromSS = sessionStorage.getItem(ssKeyUser) || user._id;
            const corpFromSS = sessionStorage.getItem(ssKeyCorp) || corp._id;
            if (userFromSS != "" && corpFromSS != "") {
                apiPost("accounts/signin", {
                    email: userFromSS,
                    corporation: corpFromSS
                }).then((data) => {
                    if (data.user) {
                        dispatch(setUser(data.user));
                        if (data.corporation) dispatch(setCorporation(data.corporation));
                        if (data.user && data.corporation) {
                            result.email = data.user.email;
                            result.corporation = data.corporation.title;
                            dispatch(setIsAuthorized(true));
                        }
                    } else dispatch(unsetUser());
                });
            }
        }
    }, [corp._id, dispatch, result, ui.isAuthorized, user._id]);

    return result;
};
  
