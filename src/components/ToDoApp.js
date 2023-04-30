import React from 'react';
import { Toaster } from 'react-hot-toast';

import Header from './Header';
import PageTitle from './PageTitle';
import Content from './Content';
import Card from '../UI/Card';

import classes from './ToDoApp.module.css';

function TodoApp() {
  return (
    <div className={classes.container}>
      <PageTitle>ToDo List</PageTitle>
      <Card>
        <Header />
      </Card>
      <Content />
      <Toaster />
    </div>
  );
}

export default TodoApp;
