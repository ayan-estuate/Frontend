// hooks/useAuthCheck.ts
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/v1";

const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");

      // If there's an access token, no need to refresh
      if (token) {
        return;
      }

      // Try to refresh the access token if it's not present
      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {},
          {
            withCredentials: true, // Ensure cookies (including the refresh token) are sent
          }
        );

        // If refresh token is valid, the backend will return a new access token
        const { accessToken } = response.data;
        localStorage.setItem("accessToken", accessToken); // Store new access token
      } catch (error) {
        console.error("Failed to refresh access token", error);
        // If refreshing fails, redirect to login
        router.push("/login");
      }
    };

    checkAuth();
  }, [router]);
};

export default useAuthCheck;
