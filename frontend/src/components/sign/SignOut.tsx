import { useEffect, type JSX } from "react";
import { useDispatch } from "react-redux";
import { unsetUser } from "../../store/slices/user";
import { useNavigate } from "react-router-dom";

const SignOut = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(unsetUser());
        navigate("/sign/in");
    }, [dispatch, navigate]);

    return (<></>);
};

export default SignOut;