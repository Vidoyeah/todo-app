import React, { useState } from 'react';

import Button, { SelectButton } from '../UI/Button';
import TodoModal from './TodoModal';

import classes from './Header.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { filterTodo } from '../slices/todoSlice';

function Header() {
  const [modalOpen, setModalOpen] = useState(true);
  const initialFilter = useSelector((state) => state.todo.filterStatus);

  const dispatch = useDispatch();

  const modalHandler = () => {
    setModalOpen((prev) => (prev = !modalOpen));
  };

  const filteringHandler = (e) => {
    dispatch(filterTodo(e.target.value));
  };

  return (
    <div className={classes.appHeader}>
      <Button className="todobtn__primary" onClick={modalHandler}>
        Add Task
      </Button>
      <SelectButton
        className="todobtn__secondary"
        value={initialFilter}
        onChange={filteringHandler}
      >
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      {!modalOpen && <TodoModal type="add" onClick={modalHandler} />}
    </div>
  );
}

export default Header;
