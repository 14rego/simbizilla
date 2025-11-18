import { useEffect, type JSX } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { unsetUser } from "../../store/slices/user";

const SignOut = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(unsetUser());
        navigate("/sign/in");
    }, [dispatch, navigate]);

    return (
        <main className="text-center">
        <h2 className="text-lg font-bold">Redirecting you...</h2>
        <p>Stuck? <Link to="/sign/in" className="text-purple-700 underline">Sign In</Link>.</p>
        </main>
    );
};

export default SignOut;