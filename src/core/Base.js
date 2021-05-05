import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "bg-dark text-white p-4",
  children,
}) => {
  return (
    <div>
      <Header />
      <div className="container-fluid">
        <div className="jumbotron my-2 bg-dark text-white text-center">
          <h2 className="display-4">{title}</h2>
          <p className="lead">{description}</p>
        </div>
        <div className={className}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Base;
