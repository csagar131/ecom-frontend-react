import React from "react";

const Jumbotron = (props) => {
  const imgurl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt8E7leGnplbXZLh8vnlMp7MdoUxSsejRUBA&usqp=CAU"
  return (
    <div className="container-fluid" style={{display : props.display}}>
      <div className="jumbotron my-2 text-black text-center" style={{backgroundImage:`url(${imgurl})`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>
        <h2 className="display-4">{props.title}</h2>
        <p className="lead">{props.description}</p>
      </div>
    </div>
  );
};

export default Jumbotron;
