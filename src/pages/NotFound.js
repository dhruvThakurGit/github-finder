import React from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  // return <h1 className="text-7xl text-center">Not Found</h1>;

  return (
    <div className="hero">
      <div className="text-center">
        <div className="">
          <h1 className="text-8xl font-bold mb-8">Oops...</h1>
          <p className="text-4xl mb-6">404 - Page not found</p>
          <Link to="/" className="btn btn-lg btn-secondary backHome">
            <FaHome className="mr-3" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
