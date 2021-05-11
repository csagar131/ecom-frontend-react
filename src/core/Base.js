import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Jumbotron from "./Jumbotron";


const Base = ({
  title = "My Title",
  description = "My description",
  className = "text-white p-4",
  display = "block",
  children,
}) => {
  

  return (
    <div>
      <Header />
      <div className="container-fluid">
        <Jumbotron display={display} title={title} description={description} />
        <div className={className}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Base;
