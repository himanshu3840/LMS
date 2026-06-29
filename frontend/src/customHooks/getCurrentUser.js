import { useEffect } from "react"
import { serverUrl } from "../App"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setUserData } from "../redux/userSlice"

const getCurrentUser = () => {
    const dispatch = useDispatch();

    console.log("Hook called");

    useEffect(() => {
        console.log("useEffect running");

        const fetchUser = async () => {
            try {
                const result = await axios.get(
                    serverUrl + "/api/user/currentuser",
                    { withCredentials: true }
                );

                console.log("Response:", result.data);

                dispatch(setUserData(result.data));
            } catch (error) {
                console.log(error.response);
                dispatch(setUserData(null));
            }
        };

        fetchUser();
    }, []);
};

export default getCurrentUser