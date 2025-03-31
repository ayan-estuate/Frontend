import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ Allows cookies to be sent/received
});

// Attach Authorization Header with Access Token
api.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// Handle Token Expiration and Refresh Token Logic
api.interceptors.response.use(
  (response) => response, // Return response if successful
  async (error) => {
    if (error.response?.status === 401) {
      // If Unauthorized (401), try refreshing the token
      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {}, // ✅ No need to send refreshToken in body (it's in HTTP-only cookie)
          { withCredentials: true } // ✅ Ensure cookies are sent
        );

        const { accessToken: newAccessToken } = refreshResponse.data;

        // ✅ Update token in localStorage and retry the failed request
        localStorage.setItem("accessToken", newAccessToken);
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(error.config);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        logout(); // Clear tokens and redirect
        return Promise.reject(new Error('Token refresh failed'));
      }
    }
    // Ensure we reject with an Error object
    return Promise.reject(
      new Error(error.response?.data?.message || error.message || 'An error occurred')
    );
  }
);

// Signup API
export const signup = async (data: { email: string; password: string; roles: string[] }) => {
  return api.post("/auth/register", data);
};

// Login API (stores access token only, refresh token is in a cookie)
export const login = async (data: { email: string; password: string }) => {
  const response = await api.post("/auth/login", data, { withCredentials: true });
  const { accessToken } = response.data;
  localStorage.setItem("accessToken", accessToken); // ✅ Only store access token
  return response;
};

// Logout (Clear tokens)
export const logout = async () => {
  try {
    await axios.post(`${API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  } catch (error) {
    console.error("Failed to logout", error);
    throw new Error(error instanceof Error ? error.message : 'Failed to logout');
  }
};

// Get User by Email (GET /users/{email})
export const getUserByEmail = async (email: string) => {
  try {
    const response = await api.get(`/users/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email", error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch user by email');
  }
};

// Update User (PUT /users/{id})
export const updateUser = async (
  id: string,
  data: { password?: string; roles?: string[] }
) => {
  try {
    const response = await api.put(`/users/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating user", error);
    throw new Error(error instanceof Error ? error.message : 'Failed to update user');
  }
};


// Fetch the username using the token
export const getUserFromToken = async (token: string) => {
  try {
    const response = await api.get("/users/fromToken", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data; // The username or email will be in response.data
  } catch (error) {
    console.error("Error fetching user from token", error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch user from token');
  }
};

// Delete User (DELETE /users/{id})
export const deleteUser = async (id: string) => {
  try {
    await api.delete(`/users/${id}`);
  } catch (error) {
    console.error("Error deleting user", error);
    throw new Error(error instanceof Error ? error.message : 'Failed to delete user');
  }
};



// Get Paginated Users (GET /users)
export const getUsers = async (page: number, size: number) => {
  try {
    const response = await api.get("/users", {
      params: {
        page,
        size,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users", error);
    throw new Error(error instanceof Error ? error.message : 'Failed to fetch users');
  }
};

export default api;
