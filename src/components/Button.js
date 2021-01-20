import React from "react";

import "components/Button.scss";

const classNames = require('classnames');

export default function Button(props) {
   //const buttonClass = classnames("button", { OR:
   const buttonClass = classNames({
      button: true,
      "button--confirm": props.confirm, //"do s.th": if()
      "button--danger": props.danger
   });

   return (
      <button
       className={buttonClass}
       onClick={props.onClick}
       disabled={props.disabled}
      >
         {props.children}
      </button>
   );
}


// export default function Button(props) {
//    let buttonClass = "button";
 
//    if (props.confirm) { //if it's truthy, will append button--confirm
//      buttonClass += " button--confirm"; // ->       // button button--confirm
//      //<button className="button button--confirm">Confirm</button>
//    }
 
//    if (props.danger) { 
//       buttonClass += " button--danger";
//       //<button class="button button--danger">Danger</button>
//    }

//    //return <button>{props.children}</button>;
//    //return <button className={buttonClass}>{props.children}</button>; updated to:
//    return (
//       <button
//        className={buttonClass}
//        onClick={props.onClick}
//        disabled={props.disabled}
//       >
//          {props.children}
//       </button>
//    );
// }
