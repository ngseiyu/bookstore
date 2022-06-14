import { publicRequest } from "../requestMethods";
import { loginFailure, loginRequest, loginSuccess } from "./userRedux"

export const login = async (dispatch, user) => {
    dispatch(loginRequest());
    try {
        const res = await publicRequest.post("/auth/login", user);
        dispatch(loginSuccess(res.data));
    } catch (error) {
        dispatch(loginFailure()); 
    }
}