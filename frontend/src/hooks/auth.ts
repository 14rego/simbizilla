import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { apiPost } from "../helpers/form";
import { setUser, ssKeyUser, unsetUser } from "../store/slices/user";
import { setGame, ssKeyOrg } from "../store/slices/game";
import { setIsAuthorized } from "../store/slices/ui";
import { redirect } from "react-router-dom";

export interface Tokens {
    email: string,
    organization: string
};

export const useAuth = (): Tokens => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const game = useSelector((state: RootState) => state.game);
    const ui = useSelector((state: RootState) => state.ui);

    const result: Tokens = useMemo(() => {
        return {
            email: user.email,
            organization: game.title
        }
    }, [game.title, user.email]);

    useEffect(() => {
        if (!ui.isAuthorized || user._id == "" || game._id == "") {
            // in case we just lost our connection
            const path = window.location.pathname;
            const userFromSS = sessionStorage.getItem(ssKeyUser) || user._id;
            const orgFromSS = sessionStorage.getItem(ssKeyOrg) || game._id;
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
                            redirect(path);
                        }
                    } else dispatch(unsetUser());
                });
            }
        }
    }, [game._id, dispatch, result, ui.isAuthorized, user._id]);

    return result;
};
  
