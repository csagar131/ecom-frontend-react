import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="page-footer text-white font-small blue pt-4 bg-dark">
        <div className="container-fluid text-center text-md-left">
          <div className="row">
            <div className="col-md-6 mt-md-0 mt-3">
              <h5 className="text-uppercase">Footer Content</h5>
              <p>
                Here you can use rows and columns to organize your footer
                content.
              </p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-3" />
        </div>
        </div>
        <div className="footer-copyright text-center py-3">
          © 2021 Copyright:
          <a href="#!"> MyStyleStore.com</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
