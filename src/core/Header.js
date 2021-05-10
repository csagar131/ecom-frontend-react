import React from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { signout, isAuthenticated } from "../auth/helper/index";

const currentTab = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#2ecc72" };
  } else {
    return { color: "#ffffff" };
  }
};

const showButton = (history, path, history_route) => {
  if (isAuthenticated()) {
    return (
      <div>
        <Link 
        to="/cart"
        className="my-2 my-sm-0 mx-5"
        style={currentTab(history, "/cart")}
        >
          <i className="fas fa-cart-plus"></i>
        </Link>
        <Link
          onClick={() => {
            signout(() => {
              history_route.push("/");
            });
          }}
          to="/"
          style={currentTab(history, "/")}
          className="my-2 my-sm-0 mx-2"
        >
          Logout
        </Link>
      </div>
    );
  } else {
    return (
      <div>
        <Link
          to="/signup"
          style={currentTab(history, "/signup")}
          className="my-2 my-sm-0 mx-5"
        >
          SignUp
        </Link>
        <Link
          to="/signin"
          style={currentTab(history, "/signin")}
          className="my-2 my-sm-0"
        >
          LogIn
        </Link>
      </div>
    );
  }
};

const Header = ({ history, path }) => {
  const history_route = useHistory();
  return (
    <div className="header">
      <nav
        className="navbar navbar-fixed-top navbar-expand-lg navbar-dark bg-dark text-white"
        style={{ position: "fixed", top: "0", width: "100%", zIndex: "1" }}
      >
        <Link className="navbar-brand" to="/">
          My T-store
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link
                style={currentTab(history, "/")}
                className="nav-link"
                to="/"
              >
                Home <span className="sr-only">(current)</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab(history, "/user/dashboard")}
                className="nav-link"
                to="user/dashboard"
              >
                Dashboard
              </Link>
            </li>
          </ul>
          {showButton(history, path, history_route)}
        </div>
      </nav>
    </div>
  );
};

export default withRouter(Header);

// <li className="nav-item dropdown">
//               <a
//                 className="nav-link dropdown-toggle"
//                 href="www.google.com"
//                 id="navbarDropdown"
//                 role="button"
//                 data-toggle="dropdown"
//                 aria-haspopup="true"
//                 aria-expanded="false"
//               >
//                 Dropdown
//               </a>
//               <div className="dropdown-menu" aria-labelledby="navbarDropdown">
//                 <a className="dropdown-item" href="www.google.com">
//                   Action
//                 </a>
//                 <a className="dropdown-item" href="www.google.com">
//                   Another action
//                 </a>
//                 <div className="dropdown-divider"></div>
//                 <a className="dropdown-item" href="www.google.com">
//                   Something else here
//                 </a>
//               </div>
//             </li>
