import axios from "axios";

/**
 *
 * @returns axios Create a axios instans
 */

const apiServer = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}`,
});

export default apiServer;
