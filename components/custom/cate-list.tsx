import React from "react";

const CateList = () => {
  const catList = ["Man", "Women", "Kids", "access"];

  return (
    <ul className="container mx-auto px-6 py-2">
      {catList.map((item, index) => (
        <li key={index} className="space-x-2">
          <input type="checkbox"/>
          <label>{item}</label>
        </li>
      ))}
    </ul>
  );
};

export default CateList;
