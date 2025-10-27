import { useState, type JSX, type SyntheticEvent } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { apiPost, handleBlur } from "../../features/form/helpers";
import { setUser } from "../../store/slices/user";
import { setOrganization } from "../../store/slices/organization";
import _ from "lodash";
import FormMessages from "../../features/form/FormMessages";
import { setIsAuthorized, initSignX, setFormMessages, type SignX } from "../../store/slices/ui";

const SignIn = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState(_.cloneDeep(initSignX));

  const updateForm = (value: object) => {
    return setForm((prev: SignX) => {
      return _.merge({}, prev, value);
    });
  };

  async function onSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    // TODO: SANITIZE
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      apiPost("accounts/signin", form).then((data) => {
        if (data.user) {
          dispatch(setUser(data.user));
          if (data.organization) dispatch(setOrganization(data.organization));
        }
        if (data.user && data.organization) {
          dispatch(setIsAuthorized(true));
          navigate("/");
        } else {
          dispatch(setFormMessages([{
            message: "This Email and Organization name combination seems to be invalid.",
            type: "ERROR"
          }]));
        }
      });
    }
  }

  return (
    <main>
      <form id="FormSignIn" onSubmit={onSubmit}>
        <fieldset>
          <legend>Sign In</legend>
          <div className="form-control-stack mb-2">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" value={form.email} required 
              onBlur={(e) => handleBlur(e.target)}
              onChange={(e) => updateForm({ email: e.target.value })} />
          </div>
          <div className="form-control-stack my-2">
            <label htmlFor="organization">Which Organization</label>
            <input id="organization" type="text" value={form.organization} required 
              onBlur={(e) => handleBlur(e.target)}
              onChange={(e) => updateForm({ organization: e.target.value })} />
          </div>
        </fieldset>
        <FormMessages />
        <div className="flex justify-between items-start mt-2">
          <button type="submit" className="btn">Let&rsquo;s GO</button>
          <Link to="/sign/up" className="btn secondary text-xs">or Sign Up</Link>
        </div>
      </form>
    </main>
  )
};

export default SignIn;