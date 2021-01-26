import React from "react";
import "components/DayListItem.scss";

const classNames = require('classnames');

export default function DayListItem(props) {

  const dayClass = classNames({
    "day-list__item": true,
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  //will format the props.spots
  const formatSpots = (spots) => {
    // if (spots === 0) {
    //   return "no spots remaining"
    // } else if (spots === 1) {
    //   return `${spots} spot remaining`
    // } else {
    //   return `${spots} spots remaining`
    // }
    return (
      spots === 0 ? "no spots remaining" : `${spots} spot${spots === 1 ? "" : "s"} remaining`
    )
  }

//setDay is a call back that takes in an argument,  so you need to wrap it in an anonymous func
//setDay:Function accepts the name of the day eg. "Monday", "Tuesday"
  return (
    <li 
      className={dayClass} 
      onClick={() => props.setDay(props.name)}
      data-testid="day"
      >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  )
    // return (
    //   <li onClick={() => props.setDay(props.name)}>
    //     <h2 className="text--regular">{props.name}</h2> 
    //     <h3 className="text--light">{props.spots}</h3>
    //   </li>
    // );
}