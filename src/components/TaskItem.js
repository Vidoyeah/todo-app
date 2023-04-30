import React, { useState, useEffect } from 'react';
import { format } from 'date-fns/esm';

import { useDispatch } from 'react-redux';
import { deleteTodo, editTodo } from '../slices/todoSlice';

import classes from './TaskItem.module.css';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

import TodoModal from './TodoModal';
import CheckBox from './CheckBox';

const childVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TaskItem(props) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const taskObject = props;

  useEffect(() => {
    if (taskObject.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [taskObject]);

  const deleteHandler = () => {
    dispatch(deleteTodo(props.id));
    toast.success('Task is deleted');
  };
  const editHandler = () => {
    setUpdateModal((prev) => (prev = !updateModal));
  };

  const checkBoxHandler = () => {
    setChecked(!checked);
    dispatch(
      editTodo({
        ...taskObject,
        title: taskObject.task,
        status: checked ? 'incomplete' : 'complete',
      })
    );
  };

  return (
    <>
      <motion.div className={classes.item} variants={childVariant}>
        <div className={classes.details}>
          <CheckBox checked={checked} onChecked={checkBoxHandler} />
          <div className={classes.text}>
            <p
              className={
                props.status === 'complete'
                  ? classes['todoText--completed']
                  : classes.todoText
              }
            >
              {props.task}
            </p>
            <p className={classes.time}>
              {format(new Date(props.time), 'p, dd/MM/yyyy')}
            </p>
          </div>
        </div>
        <div className={classes.todoActions}>
          <div className={classes.icon} onClick={deleteHandler}>
            <MdDelete />
          </div>
          <div className={classes.icon} onClick={editHandler}>
            <MdEdit />
          </div>
        </div>
      </motion.div>
      {updateModal && (
        <TodoModal type="update" onClick={editHandler} info={taskObject} />
      )}
    </>
  );
}

export default TaskItem;
