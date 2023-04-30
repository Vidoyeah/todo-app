import React from 'react';
import { useSelector } from 'react-redux';
import TaskItem from './TaskItem';
import { AnimatePresence, motion } from 'framer-motion';

import classes from './Content.module.css';

const containerVariant = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const childVariant = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function Content() {
  const todoList = useSelector((state) => state.todo.todoList);
  const initialFilter = useSelector((state) => state.todo.filterStatus);

  const sortedList = [...todoList];
  sortedList.sort((a, b) => new Date(b.time) - new Date(a.time));

  const filteredList = sortedList.filter((item) => {
    if (initialFilter === 'all') {
      return true;
    } else {
      return item.status === initialFilter;
    }
  });

  return (
    <>
      <motion.div
        className={classes['content__wrapper']}
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <AnimatePresence>
          {filteredList && filteredList.length > 0 ? (
            <ul>
              {filteredList.map((task) => (
                <li key={task.id}>
                  <TaskItem
                    id={task.id}
                    task={task.title}
                    status={task.status}
                    time={task.time}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <motion.p className={classes.emptyText} variants={childVariant}>
              no tasks found
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

export default Content;
