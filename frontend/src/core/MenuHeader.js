import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAuth, signout } from "../auth/Helpers";

const MenuHeader = ({ children, history, match }) => {
  // const historia = useHistory()
  const isActive = (path) => {
    if (match.path === path) {
      return { color: "#000", borderBottom: "1px solid black", outline: 0 };
    } else {
      return { color: "#FFF" };
    }
  };

  const nav = () => (
    <ul className="navbar navbar-expand-lg navbar-primary bg-primary nav_bar">
      <li className="navbar-brand">
        <Link to="/" className="nav-link" style={isActive("/")}>
          Home
        </Link>
      </li>

      {isAuth() &&
        isAuth().role ===
          "AdministradordaPagina99999910201231981293123198239" && (
          <Link className="nav-link" style={isActive("/admin")} to="/admin">
            {isAuth().name}
          </Link>
        )}

      {isAuth() && isAuth().role === "subscriber" && (
        <li className="navbar-brand">
          <Link style={isActive("/private")} to="/private">
            {isAuth().name}
          </Link>
        </li>
      )}

      {isAuth() && (
        <li className="navbar-brand">
          <Link style={isActive("/private")} to="/favorites">
            Favorites
          </Link>
        </li>
      )}

      {!isAuth() && (
        <>
          <li className="navbar-brand">
            <Link to="/signin" className="nav-link" style={isActive("/signin")}>
              Signin
            </Link>
          </li>
          <li className="navbar-brand">
            <Link to="/signup" className="nav-link" style={isActive("/signup")}>
              Signup
            </Link>
          </li>
        </>
      )}

      {isAuth() && (
        <li className="navbar-brand">
          <span
            className="nav-link"
            style={{ cursor: "pointer" }}
            onClick={() => {
              signout(() => {
                history.push("/");
              });
            }}
          >
            Logout
          </span>
        </li>
      )}
    </ul>
  );

  return <Fragment>{nav()}</Fragment>;
};

export default withRouter(MenuHeader);

// <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <a className="navbar-brand" href="#">Navbar</a>
//   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>

//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav mr-auto">
//       <li className="nav-item active">
//         <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link" href="#">Link</a>
//       </li>

//       <li className="nav-item">
//         <a className="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
//       </li>
//     </ul>
//     <form className="form-inline my-2 my-lg-0">
//       <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
//       <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//     </form>
//   </div>
// </nav>
