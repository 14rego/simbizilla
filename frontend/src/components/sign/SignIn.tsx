import { useState, type JSX, type SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiPost, handleBlur, updateForm } from "../../features/form/helpers";
import { setUser, unsetUser } from "../../store/slices/user";
import { setGame } from "../../store/slices/game";
import _ from "lodash";
import FormMessages from "../../features/form/FormMessages";
import { setIsAuthorized, setFormMessages, setIsProcessing } from "../../store/slices/ui";
import type { RootState } from "../../store";
import { initApiPayload } from "../../store/models/form";

const SignIn = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ui = useSelector((state: RootState) => state.ui);
    const [form, setForm] = useState(_.cloneDeep(initApiPayload));

    async function onSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
            dispatch(setIsProcessing(true));
            apiPost("accounts/signin", form).then((res) => {
                if (res.data.user) {
                    dispatch(setUser(res.data.user));
                    if (res.data.organization) dispatch(setGame(res.data.organization));
                }
                if (res.data.user && res.data.organization) {
                    dispatch(setIsAuthorized(true));
                    navigate("/");
                } else {
                    dispatch(setFormMessages([{
                        message: "This Email and Organization name combination seems to be invalid.",
                        type: "ERROR"
                    }]));
                    dispatch(unsetUser());
                }
                dispatch(setIsProcessing(false));
            });
        }
    };

    return (<main>
        <form id="FormSignIn" onSubmit={onSubmit} className="max-w-xs mx-auto">
            <fieldset>
                <legend>Sign In</legend>
                <div className="form-control-stack mb-2">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required autoComplete="on" 
                    onBlur={(e) => handleBlur(e.target)}
                    onChange={(e) => updateForm(setForm, { email: e.target.value })} />
                </div>
                <div className="form-control-stack my-2">
                <label htmlFor="organization">Which Organization</label>
                <input id="organization" type="text" required autoComplete="on"
                    onBlur={(e) => handleBlur(e.target)}
                    onChange={(e) => updateForm(setForm, { organization: e.target.value })} />
                </div>
            </fieldset>
            <FormMessages />
            <div className="flex justify-between items-start mt-2">
                <button type="submit" disabled={ui.isProcessing} className="btn">Let&rsquo;s GO</button>
                <Link to="/sign/up" className="btn secondary text-xs">or Sign Up</Link>
            </div>
        </form>
    </main>)
};

export default SignIn;