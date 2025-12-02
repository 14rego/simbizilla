import { useEffect, type JSX } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { unsetUser } from "../../store/slices/user";

const SignOut = (): JSX.Element => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(unsetUser());
    }, [dispatch]);

    return (<Navigate to="/sign/in" />);
};

export default SignOut;