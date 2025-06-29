import React from "react";

const Header = () => {
  // Get today's date
  const today = new Date();
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = today.toLocaleDateString("en-US", options);

  return (
    <div className="header">
      <p className="headerdate">Date:</p>
      <p className="headerdate">{formattedDate}</p>
      <hr className="headerhr" />
      <p className="headermotivation">Let's crush today!!</p>
    </div>
  );
};

export default Header;