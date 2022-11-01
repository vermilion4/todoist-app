import React from 'react';
import Header from '../Components/Header';
import Controls from '../Components/Controls';
import ListContainer from '../List/ListContainer';
import 'react-toastify/dist/ReactToastify.css';

// Content rendered on /all path
const Todoist = ({
  todo,
  settodo,
  isLoading,
  setIsLoading,
  fetchTodos,
  editTodo,
  todoText,
  editState,
  updateTodo,
  todoUpdateId,
  completeState,
  setTodoText,
  setEditState,
  clearBtnState,
  addTodoItem,
  isInputDisabled,
  setIsInputDisabled,
}) => {
  return (
    <React.Fragment>
      <div className='wrapper'>
        <h3 id='edit-mode-text' className={editState ? 'show' : null}>
          You are in Edit Mode!
        </h3>
        <Header
          todoText={todoText}
          setTodoText={setTodoText}
          editState={editState}
          updateTodo={updateTodo}
          todoUpdateId={todoUpdateId}
          completeState={completeState}
          setEditState={setEditState}
          add={addTodoItem}
          isInputDisabled={isInputDisabled}
        />
        <Controls
          clearBtnState={clearBtnState}
          fetchTodos={fetchTodos}
          setIsLoading={setIsLoading}
        />
        <ListContainer
          todos={todo}
          fetchTodos={fetchTodos}
          edit={editTodo}
          settodos={settodo}
          todoUpdateId={todoUpdateId}
          updateTodo={updateTodo}
          isLoading={isLoading}
          isInputDisabled={isInputDisabled}
          setIsInputDisabled={setIsInputDisabled}
        />
      </div>
      <footer>UI Credit: CodingNepal</footer>
    </React.Fragment>
  );
};

export default Todoist;
