import React from "react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div>
      <Link to={"/home"}>
        <button>HOME</button>
      </Link>
    </div>
  );
};
