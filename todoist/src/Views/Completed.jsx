import React from 'react';
import Header from '../Components/Header';
import Controls from '../Components/Controls';
import ListContainer from '../List/ListContainer';

const Completed = ({
  todo,
  isLoading,
  setIsLoading,
  updateTodo,
  fetchTodos,
  editTodo,
  settodo,
  todoText,
  setTodoText,
  editState,
  todoUpdateId,
  completeState,
  setEditState,
  isInputDisabled,
  clearBtnState,
  addTodoItem,
  setIsInputDisabled,
}) => {
  const completeTodo = todo.filter((item) => item.isComplete === true);
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
          isInputDisabled={isInputDisabled}
          add={addTodoItem}
        />
        <Controls
          clearBtnState={clearBtnState}
          fetchTodos={fetchTodos}
          setIsLoading={setIsLoading}
        />
        <ListContainer
          todos={completeTodo}
          isLoading={isLoading}
          updateTodo={updateTodo}
          fetchTodos={fetchTodos}
          edit={editTodo}
          settodos={settodo}
          todoUpdateId={todoUpdateId}
          isInputDisabled={isInputDisabled}
          setIsInputDisabled={setIsInputDisabled}
        />
      </div>
      <footer>UI Credit: CodingNepal</footer>
    </React.Fragment>
  );
};

export default Completed;
