import { useEffect, useState, type JSX, type SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiPost, handleBlur } from "../../features/forms/helpers";
import { initSignX, type SignX } from "../../store/slices/forms";
import { setUser } from "../../store/slices/user";
import { setCorporation } from "../../store/slices/corporation";
import _ from "lodash";
import type { RootState } from "../../store/index";

const SignIn = (): JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);
  const corp = useSelector((state: RootState) => state.corporation);
  const [form, setForm] = useState(_.cloneDeep(initSignX));

  useEffect(() => {
    if (user._id != "" && corp._id != "") navigate("/");
  }, [corp._id, dispatch, navigate, user._id]);

  const updateForm = (value: object) => {
    return setForm((prev: SignX) => {
      return _.merge({}, prev, value);
    });
  };

  async function onSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    // TODO: SANITIZE
    e.preventDefault();
    if (e.currentTarget.checkValidity()) {
      apiPost("users/signin", form).then((data) => {
          console.log(data);
          if (data.user) dispatch(setUser(data.user));
          if (data.corporation) dispatch(setCorporation(_.cloneDeep(data.corporation)));
          if (data.user && data.corporation) navigate("/");
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
            <label htmlFor="corporation">Which Corporation</label>
            <input id="corporation" type="text" value={form.corporation} required 
              onBlur={(e) => handleBlur(e.target)}
              onChange={(e) => updateForm({ corporation: e.target.value })} />
          </div>
        </fieldset>
        <ul aria-live="assertive"></ul>
        <button type="submit" className="btn mt-2">Let&rsquo;s GO</button>
      </form>
    </main>
  )
};

export default SignIn;