"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Use AuthContext

const Home = () => {
  const { isAuthenticated } = useAuth();  // Get authentication state
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");  // Redirect to login if not authenticated
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;  // Optional: Show loading while redirecting
  }

  return (
    <div>
      <h1>Welcome to the Home Page!</h1>
      {/* Your content goes here */}
    </div>
  );
};

export default Home;
