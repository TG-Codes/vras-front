import axios from "axios";
import * as Store from '../store'
const baseUrL = process.env.REACT_APP_BASE_URL;
const REFRESH_TOKEN_URL = "http://144.126.254.60:5000/api/refresh-token";

let authToken = ""
// let refreshToken = ""
let tokenExpiryTime = ""

export const getHeaders = async (headers) => {
    await checkTokenExpiry();
    // return {
    //     // Authorization: `Bearer ${authToken}`,
    // };
    return headers
};

export const checkTokenExpiry = () => {
    let currentDateTime = new Date();
    //console.log("currentDateTimecurrentDateTime==>", currentDateTime)
    //console.log("expiryTimeexpiryTimeexpiryTime==>", Store.default.getState().LoginReducer)

    // Store.default.getState().LoginReducer.expiresIn.expiryInterval = 10
    // Store.default.getState().LoginReducer.expiresIn.expiryTime = moment(Store.default.getState().LoginReducer.expiresIn.loggedInTime).add(10, 'seconds').format('YYYY-MM-DDTHH:mm:ssZ')

    const expiryTime = new Date(Store.default.getState().mainReducerData.userData.expiresIn.expiryTime)
    const loggedInTime = new Date(Store.default.getState().mainReducerData.userData.expiresIn.loggedInTime)
    const expiryInterval = Store.default.getState().mainReducerData.userData.expiresIn.expiryInterval

    /*console.log("currentDateTime===>", currentDateTime)
    console.log("expiryTime===========>", expiryTime)
    console.log("loggedInTime===========>", loggedInTime)
    console.log("expiryInterval===========>", expiryInterval)*/
    if (expiryTime != "") {
        //console.log("Store.default.getState().LoginReducer==>", Store.default.getState().LoginReducer)
        //let deltaDifference = ((expiryTime == "" ? 0 : expiryTime) - (loggedInTime == "" ? 0 : loggedInTime)) / 1000
        let deltaDifference = ((currentDateTime == "" ? 0 : currentDateTime) - (loggedInTime == "" ? 0 : loggedInTime)) / 1000
        //console.log("deltaDifference===>", deltaDifference)
        if (currentDateTime >= expiryTime && (deltaDifference <= expiryInterval)) {
            refreshToken()
        }
    }

};

// export const refreshToken = async () => {
//     let res = new Promise((resolve, reject) => {
//         let header = {};
//         header["Authorization"] = Store.default.getState().mainReducerData.userData.token;

//         let data = {};
//         data["refreshToken"] = Store.default.getState().loginReducer.refreshToken;

//         axios.patch(REFRESH_TOKEN_URL, data, { headers: header })
//             .then((response) => {
//                 resolve(response);
//             })
//             .catch((error) => {
//                 console.error("Error while refreshing token:", error);
//                 reject(error);
//             });
//     });

//     res.then((result) => {
//         const { accessToken, refreshToken: newRefreshToken, expiresIn } = result.data.data;
//         authToken = accessToken;
//         refreshToken = newRefreshToken;
//         tokenExpiryTime = new Date().getTime() + expiresIn * 1000;

//         const userData = Store.default.getState().mainReducerData.userData;
//         userData["token"] = accessToken;
//         userData["refreshToken"] = newRefreshToken;

//         const expiryTime = new Date().getTime() + expiresIn * 1000;
//         userData["expiresIn"] = {
//             expiryTime: new Date(expiryTime).toISOString(),
//             loggedInTime: new Date().toISOString(),
//             expiryInterval: expiresIn
//         };

//         Store.default.dispatch({
//             type: 'LOGIN_SUCCESS',
//             payload: userData,
//         });

//         console.log("Token refreshed successfully.");
//     }).catch((error) => {
//         console.error("Token refresh failed:", error);
//     });
// };

export const refreshToken = async () => {
    console.log("exxxxxxxxxxxx", Store.default.getState().mainReducerData.userData.refreshToken);

    const storeData = Store.default.getState().mainReducerData.userData;
    const currentRefreshToken = storeData.refreshToken;
    console.log("Current Refresh Token:", currentRefreshToken);

    try {
        const header = {
            Authorization: `Bearer ${currentRefreshToken}`
        };

        const data = {
            refreshToken: currentRefreshToken,
        };

        const response = await axios.post(REFRESH_TOKEN_URL, data, { headers: header });
        console.log("Server Response:", response.data);

        const {
            accessToken,
            refreshToken: newRefreshToken,
        } = response.data.data;

        // authToken = accessToken;
        // refreshToken = newRefreshToken;
        // // tokenExpiryTime = new Date().getTime() + expiresIn * 1000;
        const expiresIn = getExpiryDetails()

        const updatedUserData = {
            ...storeData,
            token: accessToken,
            refreshToken: newRefreshToken,
            expiresIn
            // expiresIn: {
            //     expiryTime: new Date(tokenExpiryTime).toISOString(),
            //     loggedInTime: new Date().toISOString(),
            //     expiryInterval: expiresIn
            // }
        };

        console.log("Updateeeeeeeeee", updatedUserData);

        Store.default.dispatch({
            type: 'LOGIN_SUCCESS',
            payload: updatedUserData,
        });

        console.log("Token refreshed successfully.");
    } catch (error) {
        console.error("Error while refreshing token:", error);
    }
};

export const initializeTokens = (accessToken, refreshTokenFromServer, expiresIn) => {
    authToken = accessToken;
    refreshToken = refreshTokenFromServer;
    tokenExpiryTime = new Date().getTime() + expiresIn * 1000;
};


export const getExpiryDetails = (expiresIn = 180) => {
    const now = new Date();
    const expiryTime = new Date(now.getTime() + (expiresIn - 15) * 1000);

    return {
        loggedInTime: now.toISOString(),
        expiryTime: expiryTime.toISOString(),
        expiryInterval: expiresIn,
    };
};

export const requestWithToken = async (config) => {
    await checkTokenExpiry();

    if (!authToken) {
        throw new Error("Authorization token is not available. Please log in again.");
    }

    const updatedConfig = {
        ...config,
        headers: {
            ...config.headers,
            Authorization: `Bearer ${authToken}`,
        },
    };

    try {
        const response = await axios(updatedConfig);
        return response.data;
    } catch (error) {
        console.error("Error in request:", error.message);
        throw error;
    }
};