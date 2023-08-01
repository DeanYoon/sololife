import axios from "axios";

// export const DOMAIN_URL =
//   "https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app";

// export const DOMAIN_URL = "http://localhost:3001";
export const DOMAIN_URL =
  "https://port-0-sololife-node-backend-r8xoo2mledsvukh.sel3.cloudtype.app";
export const POSTS_API = `${DOMAIN_URL}/api/posts`;
export const USERS_API = `${DOMAIN_URL}/api/users`;
export const postInsertUserData = async (data: object) => {
  try {
    const response = await axios.post(`${DOMAIN_URL}/users/insert`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
