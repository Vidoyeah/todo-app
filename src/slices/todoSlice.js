import { createSlice } from '@reduxjs/toolkit';

const getInitialTodo = () => {
  const localTodoList = window.localStorage.getItem('todoList');
  if (localTodoList) {
    return JSON.parse(localTodoList);
  }
  window.localStorage.setItem('todoList', JSON.stringify([]));
  return [];
};

const initialValue = {
  filterStatus: 'all',
  todoList: getInitialTodo(),
};

//creating Slice for store
export const todoSlice = createSlice({
  name: 'todo',
  initialState: initialValue,
  reducers: {
    addTodo: (state, action) => {
      state.todoList.push(action.payload);
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListaArray = JSON.parse(todoList);
        todoListaArray.push({
          ...action.payload,
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListaArray));
      } else {
        window.localStorage.setItem(
          'todoList',
          JSON.stringify([...action.payload])
        );
      }
    },
    deleteTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArray = JSON.parse(todoList);
        todoListArray.forEach((todo, index) => {
          if (todo.id === action.payload) {
            todoListArray.splice(index, 1);
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArray));
        state.todoList = todoListArray;
      }
    },
    editTodo: (state, action) => {
      const todoList = window.localStorage.getItem('todoList');
      if (todoList) {
        const todoListArray = JSON.parse(todoList);
        todoListArray.forEach((todo, index) => {
          if (todo.id === action.payload.id) {
            todo.title = action.payload.title;
            todo.status = action.payload.status;
          }
        });
        window.localStorage.setItem('todoList', JSON.stringify(todoListArray));
        state.todoList = todoListArray;
      }
    },
    filterTodo: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, filterTodo } = todoSlice.actions;
export default todoSlice.reducer;
