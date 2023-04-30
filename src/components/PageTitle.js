import React from 'react';

import classes from './PageTitle.module.css';

function PageTitle(props) {
  return <p className={classes.title}>{props.children}</p>;
}

export default PageTitle;
