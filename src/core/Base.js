import React, { useState } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Jumbotron from "./Jumbotron";
import Notification from "./Notification";

const Base = ({
  title = "My Title",
  description = "My description",
  className = "text-white p-4",
  display = "block",
  children,
}) => {
  const [notify, setNotify] = useState(false);

  const showNotification = (flag) => {
    if (flag) {
      return <Notification show={notify} />;
    }
  };

  return (
    <div>
      <Header />
      {showNotification(notify)}
      <div className="container-fluid">
        <Jumbotron display={display} title={title} description={description} />
        <div className={className}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Base;
