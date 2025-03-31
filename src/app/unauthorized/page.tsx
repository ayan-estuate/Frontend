import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>🚫 Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <Link href="/login">Go to Login</Link>
    </div>
  );
};

export default UnauthorizedPage;
