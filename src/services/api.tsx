import { getUserData } from "../cache";
import { logoutHandler } from "../redux/actions/auth";
import * as urls from "./urls";

export const options: any = {
    credentials: "include",
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
    },
};

export const getAccessToken = () => {
    return new Promise((resolve, reject) => {
        getUserData().then((res: any) => {
            if (res?.access_token) {
                resolve(res?.access_token);
            }
            resolve("");
        });
    });
};


export const responseJson = (response: any) => {
    return new Promise((resolve, reject) => {
        if (response.status === 401) {
            //logout
            logoutHandler();
            return resolve({ error: "Token expired", status: 401 });
        }
        if (response.status === 423) {
            //logout
            logoutHandler();
            return reject({ error: "Account locked", status: 423 });
        }
        if (response.status === 403) {
            //logout
            logoutHandler();
            return reject({ error: "forbidden error", status: 403 });
        }
        if (response.status === 404) {
            return reject({ error: "Api not found", status: 404 });
        }
        if (response.status === 204) {
            return resolve({ message: "Success", status: 204 });
        }

        return response.json().then((json: any) => {
            console.log("inside resp json", json);
            if (!json.status && response?.status !== 200) {
                json.status = response?.status;
            }
            if (!json.error && response?.status !== 200) {
                json.error = json.detail;
            }
            if (response.status === 401) {
                //logout
            }
            if (response.status === 423) {
                //logout
                return reject({ error: "Account locked", status: 423 });
            }
            if (json?.error_status) {
                return reject({
                    ...json,
                    status: response?.status,
                });
            }
            if (response.status >= 400 && response.status < 600) {
                if (!json.error) {
                    return reject({
                        error: json?.msg || "Something went wrong",
                        status: response?.status,
                    });
                }
                return reject(json);
            } else {
                return resolve(json);
            }
        })
            .catch((error: any) => {
                reject({ error: "Something went wrong", status: response.status });
            });
    });
}


/**
 *
 * @param {*} userId
 * @returns
 */
export const signinUser = (data: any) => {
    return fetch(urls.GOOGLE_SIGNIN, {
        method: "POST",
        body: JSON.stringify(data),
        ...options,
    }).then(responseJson);
};


export const verifyOtp = (data: any) => {
    console.log("verify OTP", urls.VERIFY_OTP, data)
    return fetch(urls.VERIFY_OTP, {
        method: "POST",
        body: JSON.stringify(data),
        ...options,
    }).then(responseJson);
};


export const loginUser = (data: any) => {
    return fetch(urls.LOGIN, {
        method: "POST",
        body: JSON.stringify(data),
        ...options,
    }).then(responseJson);
};


export const getWorkOrder = (queryString: any = ``) => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        console.log("uerls", urls.GET_WORK_ORDER, options)
        return fetch(urls.GET_WORK_ORDER, {
            method: "GET",
            ...options,
        }).then(responseJson);
    });
};

export const getTickets = (queryString: any = ``) => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        return fetch(urls.GET_WORK_TICKETS + `?${queryString}`, {
            method: "GET",
            ...options,
        }).then(responseJson);
    });
};

export const postDelete = (data: any) => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        console.log("uerls", urls.POST_DELETE, data, options)
        return fetch(urls.POST_DELETE, {
            method: "PUT",
            body: JSON.stringify(data),
            ...options,
        }).then(responseJson);
    });
};


export const putUpdate = (data: any) => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        return fetch(urls.PUT_UPDATE, {
            method: "PUT",
            body: JSON.stringify(data),
            ...options,
        }).then(responseJson);
    });
};


export const postComplete = (data: any) => {
    return getAccessToken().then((token) => {
        const options: any = {
            credentials: "include",
            headers: {
                Accept: "*/*",
                Authorization: token,
                "Content-Type": "multipart/form-data",
            },
        };
        console.log("uerls", urls.PUT_WORK_COMPLETE, data, options)
        return fetch(urls.PUT_WORK_COMPLETE, {
            method: "PUT",
            body: data,
            ...options,
        }).then(responseJson);
    });
};

export const postCreate = (data: any) => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        console.log("uerls", urls.POST_CREATE, data, options)
        return fetch(urls.POST_CREATE, {
            method: "POST",
            body: JSON.stringify(data),
            ...options,
        }).then(responseJson);
    });
};


export const postAssign = (data: any) => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        console.log("uerls", urls.POST_ASSIGN, data, options)
        return fetch(urls.POST_ASSIGN, {
            method: "POST",
            body: JSON.stringify(data),
            ...options,
        }).then(responseJson);
    });
};

export const getUsers = () => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        console.log("uerls", urls.GET_USERS, options)
        return fetch(urls.GET_USERS, {
            method: "GET",
            ...options,
        }).then(responseJson);
    });
};

export const getWoTech = () => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;

        return fetch(urls.GET_WO_TECH, {
            method: "GET",
            ...options,
        }).then(responseJson);
    });
};

export const getDepartment = () => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;

        return fetch(urls.GET_DEPARTMENT, {
            method: "GET",
            ...options,
        }).then(responseJson);
    });
};

export const getProfile = () => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;

        return fetch(urls.GET_PROFILE, {
            method: "GET",
            ...options,
        }).then(responseJson);
    });
};

export const postProfile = (data: any) => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        console.log("uerls", urls.POST_PROFILE, data, options)
        return fetch(urls.POST_PROFILE, {
            method: "POST",
            body: JSON.stringify(data),
            ...options,
        }).then(responseJson);
    });
};

export const postReport = (data: any) => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        console.log("uerls", urls.POST_REPORT, data, options)
        return fetch(urls.POST_REPORT, {
            method: "POST",
            body: JSON.stringify(data),
            ...options,
        }).then(responseJson);
    });
};


export const isSignOut = (data: any) => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        console.log("uerls", urls.LOGOUT, data, options)
        return fetch(urls.LOGOUT, {
            method: "POST",
            body: JSON.stringify(data),
            ...options,
        }).then(responseJson);
    });
};


export const getCommentOptions = (queryString: any) => {
    return getAccessToken().then((token) => {
        options.headers.Authorization = token;
        return fetch(urls.GET_COMMENTOPTIONS + `?${queryString}`, {
            method: "GET",
            ...options,
        }).then(responseJson);
    });
};
