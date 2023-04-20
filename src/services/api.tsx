import { getItem } from "../cache";
import { logoutHandler } from "../redux/actions/auth";

export const options: any = {
    credentials: "include",
    headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
    },
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

export const postRequest = async (url: string, data: any) => {
    try {
        let token: any = await getItem("Token");
        const postOptions = {
            ...options,
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                Authorization: token?.[0]?.TOKEN
            }
        }
        if (!!token?.[0]?.TOKEN) {
            return fetch(url + `?api_key=${token?.[0]?.API_KEY}`, postOptions).then(responseJson);
        }
    } catch (e: any) {
        console.log(e)
    }
}

export const getRequest = async (url: string) => {
    try {
        let token: any = await getItem("Token");
        const getOptions = {
            ...options,
            method: "GET",
            headers: {
                Authorization: token?.[0]?.TOKEN
            }
        };
        console.log("cxcx", token)
        if (!!token?.[0]?.TOKEN) {
            return fetch(url + `?api_key=${token?.[0]?.API_KEY}`, getOptions).then(responseJson);
        }
    } catch (e: any) {
        console.log(e)
    }
}

export const getQueryRequest = async (url: string, queryString: any) => {
    try {
        let token: any = await getItem("Token");
        const getOptions = {
            ...options,
            method: "GET",
            headers: {
                Authorization: token?.[0]?.TOKEN
            }
        }
        if (!!token?.[0]?.TOKEN) {
            return fetch(url + `?api_key=${token?.[0]?.API_KEY}` + `?${queryString}`, getOptions).then(responseJson);
        }
    } catch (e: any) {
        console.log(e)
    }
}