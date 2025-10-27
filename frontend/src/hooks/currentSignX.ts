import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import type { SignX } from "../store/slices/ui";
import { apiPost } from "../features/form/helpers";
import { setUser, ssKeyUser, unsetUser } from "../store/slices/user";
import { setOrganization, ssKeyCorp } from "../store/slices/organization";
import { setIsAuthorized } from "../store/slices/ui";

export const useCurrentSignX = (): SignX => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const corp = useSelector((state: RootState) => state.organization);
    const ui = useSelector((state: RootState) => state.ui);

    const result: SignX = useMemo(() => {
        return {
            email: user.email,
            organization: corp.title
        }
    }, [corp.title, user.email]);

    useEffect(() => {
        if (!ui.isAuthorized || user._id == "" || corp._id == "") {
            // in case we just lost our connection
            const userFromSS = sessionStorage.getItem(ssKeyUser) || user._id;
            const corpFromSS = sessionStorage.getItem(ssKeyCorp) || corp._id;
            if (userFromSS != "" && corpFromSS != "") {
                apiPost("accounts/signin", {
                    email: userFromSS,
                    organization: corpFromSS
                }).then((data) => {
                    if (data.user) {
                        dispatch(setUser(data.user));
                        if (data.organization) dispatch(setOrganization(data.organization));
                        if (data.user && data.organization) {
                            result.email = data.user.email;
                            result.organization = data.organization.title;
                            dispatch(setIsAuthorized(true));
                        }
                    } else dispatch(unsetUser());
                });
            }
        }
    }, [corp._id, dispatch, result, ui.isAuthorized, user._id]);

    return result;
};
  
