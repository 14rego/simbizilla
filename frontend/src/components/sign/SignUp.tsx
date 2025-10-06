import { useState, type JSX, type SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiPost, handleBlur } from "../../features/forms/helpers";
import { initSignX, setFormMessages, type SignX } from "../../store/slices/forms";
import { setUser, unsetUser } from "../../store/slices/user";
import { setCorporation } from "../../store/slices/corporation";
import _ from "lodash";
import FormMessages from "../../features/forms/FormMessages";

const SignUp = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(_.cloneDeep(initSignX));

  const updateForm = (value: object) => {
    return setForm((prev: SignX) => {
      return _.merge({}, prev, value);
    });
  };

  async function onSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    // TODO: ADD UNIQUENESS VALIDATION AND SANITIZE
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      apiPost("users/signup", form).then((data) => {
          if (data.user) {
            dispatch(setUser(data.user));
            if (data.corporation) {
              dispatch(setCorporation(data.corporation));
              navigate("/");
            } else {
              dispatch(setFormMessages([{
                message: "Please choose another corporation name.",
                type: "ERROR"
              }]));
            }
          } else {
            dispatch(unsetUser());
          }
      });
    }
  }

  return (
    <main>
      <form id="FormSignUp" onSubmit={onSubmit}>
        <fieldset>
          <legend>Set Up Your Profile</legend>
          <div className="form-control-stack mb-2">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} required 
              onBlur={(e) => handleBlur(e.target)}
              onChange={(e) => updateForm({ email: e.target.value })} />
          </div>
          <div className="form-control-stack my-2">
            <label htmlFor="nickname">What should we call you?</label>
            <input id="nickname" type="text" value={form.nickname} required 
              onBlur={(e) => handleBlur(e.target)}
              onChange={(e) => updateForm({ nickname: e.target.value })} />
            <p className="form-helper">We&rsquo;ll be respectful (once you&rsquo;re rich).</p>
          </div>
          <div className="form-control-stack my-2">
            <label htmlFor="corporation">First Corporation Name</label>
            <input id="corporation" type="text" value={form.corporation} required 
              onBlur={(e) => handleBlur(e.target)}
              onChange={(e) => updateForm({ corporation: e.target.value })} />
            <p className="form-helper">Remember it, you&rsquo;ll need it each time you play.</p>
          </div>
        </fieldset>
        <FormMessages />
        <div className="flex justify-between items-start mt-2">
          <button type="submit" className="btn">Let&rsquo;s GO</button>
          <Link to="/sign/in" className="btn secondary text-xs">or Sign In</Link>
        </div>
      </form>
    </main>
  )
};

export default SignUp;