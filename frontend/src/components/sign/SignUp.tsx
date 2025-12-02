import { useState, type JSX, type SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiPost, handleBlur, updateForm } from "../../helpers/form";
import { setFormMessages, setIsProcessing } from "../../store/slices/ui";
import { setUser, unsetUser } from "../../store/slices/user";
import { setGame } from "../../store/slices/game";
import FormMessages from "../../features/form/FormMessages";
import type { RootState } from "../../store";
import { typedApiPayload } from "../../store/models/form";

const SignUp = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form, setForm] = useState(typedApiPayload({
        email: "",
        title: "",
        organization: "",
    }));
    const ui = useSelector((state: RootState) => state.ui);

    async function onSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
        // TODO: ADD UNIQUENESS VALIDATION AND SANITIZE
        e.preventDefault();
        if (e.currentTarget.checkValidity()) {
            dispatch(setIsProcessing(true));
            apiPost("accounts/signup", form).then((res) => {
                if (res.data.user && res.status == 200) {
                    dispatch(setUser(res.data.user));
                    if (res.data.organization) {
                        dispatch(setGame(res.data.organization));
                        navigate("/");
                    } else {
                        dispatch(setFormMessages([{
                            message: "Please choose another organization name.",
                            type: "ERROR"
                        }]));
                    }
                } else {
                    dispatch(unsetUser());
                }
                dispatch(setIsProcessing(false));
            });
        }
    }

    return (<main>
        <form id="FormSignUp" onSubmit={onSubmit} className="max-w-xs mx-auto">
            <fieldset>
                <legend>Set Up Your Profile</legend>
                <div className="form-control-stack mb-2">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" required autoComplete="on"
                        onBlur={(e) => handleBlur(e.target)}
                        onChange={(e) => updateForm(setForm, { email: e.target.value })} />
                </div>
                <div className="form-control-stack my-2">
                    <label htmlFor="title">What should we call you?</label>
                    <input id="title" type="text" required autoComplete="on" maxLength={25} 
                        onBlur={(e) => handleBlur(e.target)}
                        onChange={(e) => updateForm(setForm, { title: e.target.value })} />
                    <p className="form-helper">We&rsquo;ll be respectful (once you&rsquo;re rich).</p>
                </div>
                <div className="form-control-stack my-2">
                    <label htmlFor="organization">First Organization Name</label>
                    <input id="organization" type="text" required autoComplete="on" maxLength={25} 
                        onBlur={(e) => handleBlur(e.target)}
                        onChange={(e) => updateForm(setForm, { organization: e.target.value })} />
                    <p className="form-helper">Remember it, you&rsquo;ll need it each time you play.</p>
                </div>
            </fieldset>
            <FormMessages />
            <div className="flex justify-between items-start mt-2">
                <button type="submit" disabled={ui.isProcessing} className="btn">Let&rsquo;s GO</button>
                <Link to="/sign/in" className="btn secondary text-xs">or Sign In</Link>
            </div>
        </form>
    </main>)
};

export default SignUp;