import { Link } from "react-router-dom";

function Navbar() {

  return (

    <nav className="navbar navbar-dark bg-dark px-3">

      <Link className="navbar-brand" to="/dashboard">
        BP Tracker
      </Link>

      <div>

        <Link className="btn btn-light me-2" to="/dashboard">
          Dashboard
        </Link>

        <Link className="btn btn-light" to="/history">
          History
        </Link>

      </div>

    </nav>

  );
}

export default Navbar;