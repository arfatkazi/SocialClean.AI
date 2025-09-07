import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", background: "#f5f5f5" }}>
      <Link to="/" style={{ marginRight: "1rem" }}>
        Auth
      </Link>
      <Link to="/dashboard" style={{ marginRight: "1rem" }}>
        Dashboard
      </Link>
    </nav>
  );
}
