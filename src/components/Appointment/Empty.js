import React from "react";

export default function Empty (props) {
  //The add button is an image. 
  //An image can have an onClick handler just like a button
  return (
    <main className="appointment__add">
      <img 
        className="appointment__add-button"
        src="images/add.png"
        alt="Add"
        onClick={props.onAdd}
      />
    </main>
  );
}