import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';

import { addTodo, editTodo } from '../slices/todoSlice';

import classes from './TodoModal.module.css';
import Button from '../UI/Button';
import { MdOutlineClose } from 'react-icons/md';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal(props) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const dispatch = useDispatch();

  const information = { ...props.info };

  useEffect(() => {
    if (props.type === 'update' && information.task) {
      setTitle(information.task);
      setStatus(information.status);
    }
  }, [information.task, information.status, props.type]);

  const titleHandler = (e) => {
    setTitle(e.target.value);
  };

  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (title && status) {
      if (props.type === 'add') {
        dispatch(
          addTodo({
            id: Math.random().toFixed(6),
            title,
            status,
            time: new Date().toLocaleString('en-US'),
          })
        );
        toast.success('Task added successfully');
      }
      if (props.type === 'update') {
        if (props.info.task !== title || props.info.status !== status) {
          dispatch(editTodo({ ...props.info, title, status }));
          toast.success('Task successfully changed!');
        } else {
          toast.error('Task already exists');
        }
      }
    } else {
      toast.error('Please add title');
    }
    props.onClick(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className={classes.wrapper}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className={classes.container}
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <motion.div
            className={classes.closeButton}
            // animation
            initial={{ top: 40, opacity: 0 }}
            animate={{ top: -10, opacity: 1 }}
            exit={{ top: 40, opacity: 0 }}
          >
            <MdOutlineClose
              onClick={props.onClick}
              tabIndex={0}
              role="button"
            />
          </motion.div>
          <form className={classes.form} onSubmit={submitHandler}>
            <h1 className={classes.formTitle}>
              {props.type === 'update' ? 'Update' : 'Add'} Task
            </h1>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={titleHandler}
            />
            <label htmlFor="status">Status</label>
            <select
              name="status"
              id="status"
              value={status}
              onChange={statusHandler}
            >
              <option value="incomplete">Incomplete</option>
              <option value="complete">Complete</option>
            </select>
            <div className={classes.buttonContainer}>
              <Button type="submit" className="todobtn__primary">
                {props.type === 'update' ? 'Update' : 'Add'} Task
              </Button>
              <Button className="todobtn__secondary" onClick={props.onClick}>
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default TodoModal;
