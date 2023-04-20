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

export const postRequest = ( token: any, url: string, data: any) => {
    const postOptions = {
        ...options,
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Authorization: token?.TOKEN
        }
    }
    if (!!token?.TOKEN) {
        return fetch(url, postOptions).then(responseJson);
    }
}

export const getRequest = (token: any, url: string) => {
    const getOptions = {
        ...options,
        method: "GET",
        // headers: {
        //     Authorization: token?.TOKEN
        // }
    };
    console.log("yyy", getOptions, url+`?api_key=${token?.API_KEY}`)
    if (!!token?.TOKEN) {
        return fetch(url+`?api_key=${token?.API_KEY}`, getOptions).then(responseJson);
    }
}

export const getQueryRequest = (token: any, url: string, queryString: any) => {
    const getOptions = {
        ...options,
        method: "GET",
        headers: {
            Authorization: token?.TOKEN
        }
    }
    if (!!token?.TOKEN) {
        return fetch(url + `?${queryString}`, getOptions).then(responseJson);
    }
}