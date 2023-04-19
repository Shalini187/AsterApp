//change these for environment

//Production
// export const API = "https://dashboard.seekright.com/ims-backend";

//Development
export const CLIENT_ID = "480434167886-fi7dbqumrif8rfc7hg6mk7mv1hcu8j62.apps.googleusercontent.com";
export const API = "http://13.127.250.57:3001";

//Authentication
export const GOOGLE_SIGNIN = `${API}/google-signin`;
export const LOGOUT = `${API}/logout`;
export const VERIFY_OTP = `${API}/verify-otp`;
export const LOGIN = `${API}/login`;

export const GET_WORK_ORDER = `${API}/work-order/asset-list`;
export const GET_WORK_TICKETS = `${API}/work-order/tickets`;
export const PUT_WORK_COMPLETE = `${API}/work-order/complete`;
export const POST_CREATE = `${API}/work-order/create`;
export const PUT_UPDATE = `${API}/work-order/update`;
export const POST_DELETE = `${API}/work-order/delete`;
export const POST_ASSIGN = `${API}/work-order/assign`;

export const GET_USERS = `${API}/group-users`;
export const GET_WO_TECH = `${API}/wo-techniques`;

export const GET_DEPARTMENT = `${API}/departments`;
export const GET_COMMENTOPTIONS = `${API}/comments`;

export const GET_PROFILE = `${API}/profile`;
export const POST_PROFILE = `${API}/update-profile`;
export const POST_REPORT = `${API}/report-bug`;