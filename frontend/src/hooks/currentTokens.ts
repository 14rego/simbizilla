import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { apiPost } from "../features/form/helpers";
import { setUser, ssKeyUser, unsetUser } from "../store/slices/user";
import { setGame, ssKeyOrg } from "../store/slices/game";
import { setIsAuthorized } from "../store/slices/ui";

export interface Tokens {
    email: string,
    organization: string
};

export const useCurrentTokens = (): Tokens => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const org = useSelector((state: RootState) => state.game);
    const ui = useSelector((state: RootState) => state.ui);

    const result: Tokens = useMemo(() => {
        return {
            email: user.email,
            organization: org.title
        }
    }, [org.title, user.email]);

    useEffect(() => {
        if (!ui.isAuthorized || user._id == "" || org._id == "") {
            // in case we just lost our connection
            const userFromSS = sessionStorage.getItem(ssKeyUser) || user._id;
            const orgFromSS = sessionStorage.getItem(ssKeyOrg) || org._id;
            if (userFromSS != "" && orgFromSS != "") {
                apiPost(`accounts/signin`, {
                    payload: {
                        email: userFromSS,
                        organization: orgFromSS
                    }
                }).then((res) => {
                    if (res.status == 200 && res.data.user) {
                        dispatch(setUser(res.data.user));
                        if (res.data.organization) dispatch(setGame(res.data.organization));
                        if (res.data.user && res.data.organization) {
                            result.email = res.data.user.email;
                            result.organization = res.data.organization.title;
                            dispatch(setIsAuthorized(true));
                        }
                    } else dispatch(unsetUser());
                });
            }
        }
    }, [org._id, dispatch, result, ui.isAuthorized, user._id]);

    return result;
};
  
