import React from 'react';

import classes from '../../src/UI/Button.module.css';

const Button = (props) => {
  return (
    <button
      id={props.id}
      name={props.name}
      onClick={props.onClick}
      className={`${classes[props.className]}`}
    >
      {props.children}
    </button>
  );
};

export const SelectButton = (props) => {
  return (
    <select className={`${classes[props.className]}`} onChange={props.onChange}>
      {props.children}
    </select>
  );
};

export default Button;
