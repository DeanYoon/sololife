import axios from "axios";

export const DOMAIN_URL =
  "https://port-0-area-node-express-r8xoo2mledsvukh.sel3.cloudtype.app";

export const postInsertUserData = async (data: object) => {
  try {
    const response = await axios.post(`${DOMAIN_URL}/users/insert`, data);
    return response;
  } catch (error) {
    console.error(error);
  }
};
