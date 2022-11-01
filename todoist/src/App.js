import './App.css';
import Todoist from './Views/Todoist';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, BrowserRouter as Router, Routes, Link } from 'react-router-dom';
import Pending from './Views/Pending';
import Completed from './Views/Completed';
import { ToastContainer, toast } from 'react-toastify';



function App ()
{
  const [todo, setTodo] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  const [todoText, setTodoText] = useState('');
  const [editState, setEditState] = useState(false);
  let [todoUpdateId, setTodoUpdateId] = useState('');
  let [completeState, setCompleteState] = useState(false);
  const [clearBtnState, setClearBtnState] = useState(false);
  const [isInputDisabled, setIsInputDisabled] = useState(false);

  // Fetch all Todos
  const fetchTodos = async () =>
  {
    const response = await axios.get("/todos");
    let { data } = response;

    // check if any record to make clear all btn active
    data.data.length > 0 ? setClearBtnState(true) : setClearBtnState(false);
    setTodo(data.data);
    setIsLoading(false);
  };

  useEffect(() =>
  {
    //Invoke fetch
    fetchTodos();

  }, []);

  // Add a new Todo
  const addTodoItem = async () =>
  {
    setIsInputDisabled(true);
    await axios
      .post('/add', `title=${ todoText }`)
      .then(async () =>
      {
        setTodoText('');
        toast.info('Adding...');
        await fetchTodos();
        toast.success('Added Successfully');
      })
      .then(() => setIsInputDisabled(false))
      .catch((error) =>
      {
        toast.error('There seems to be a problem');
      });
  };

  // Enter Edit Mode
  const editTodo = (todoid) =>
  {
    const todoToUpdate = todo.find((item) => item.id === todoid);
    const { id, title, isComplete } = todoToUpdate;
    setTodoUpdateId(id);
    setTodoText(title);
    setCompleteState(isComplete);
    setEditState(true);
  };

  // Update Todo
  const updateTodo = async (id, titleText, complete) =>
  {
    await axios.post(
      '/edit',
      `id=${ id }&title=${ titleText }&isComplete=${ complete }`
    ).then(async () =>
    {
      toast.info('Updating...');
      await fetchTodos();
    })
      .then(() =>
      {
        toast.success('Successfully Updated');
        setEditState(false);
        setTodoText('');
      })
      .catch(() =>
      {
        toast.error('There seems to be a problem');
      });
  };


  return (
    <Router>
      <ToastContainer />
      <Routes>
        <Route path='/' element={ <div className='Todoist-container'><Link to={ '/all' } className='Todolist'>Go to Todolist</Link></div> }></Route>

        <Route path='/all' element={ <Todoist
          editTodo={ editTodo }
          updateTodo={ updateTodo }
          todoText={ todoText }
          completeState={ completeState }
          setTodoText={ setTodoText }
          todoUpdateId={ todoUpdateId }
          editState={ editState }
          todo={ todo }
          isLoading={ isLoading }
          setIsLoading={ setIsLoading }
          fetchTodos={ fetchTodos }
          settodo={ setTodo }
          setEditState={ setEditState }
          clearBtnState={ clearBtnState }
          addTodoItem={ addTodoItem }
          isInputDisabled={ isInputDisabled }
          setIsInputDisabled={ setIsInputDisabled } /> }></Route>

        <Route path='/pending' element={ <Pending
          todo={ todo }
          isLoading={ isLoading }
          setIsLoading={ setIsLoading }
          editTodo={ editTodo }
          updateTodo={ updateTodo }
          todoText={ todoText }
          completeState={ completeState }
          setTodoText={ setTodoText }
          todoUpdateId={ todoUpdateId }
          editState={ editState }
          fetchTodos={ fetchTodos }
          settodo={ setTodo }
          setEditState={ setEditState }
          clearBtnState={ clearBtnState }
          addTodoItem={ addTodoItem }
          isInputDisabled={ isInputDisabled }
          setIsInputDisabled={ setIsInputDisabled } /> }></Route>

        <Route path='/completed' element={ <Completed
          todo={ todo }
          isLoading={ isLoading }
          setIsLoading={ setIsLoading }
          editTodo={ editTodo }
          updateTodo={ updateTodo }
          todoText={ todoText }
          completeState={ completeState }
          setTodoText={ setTodoText }
          todoUpdateId={ todoUpdateId }
          editState={ editState }
          fetchTodos={ fetchTodos }
          settodo={ setTodo }
          setEditState={ setEditState }
          clearBtnState={ clearBtnState }
          addTodoItem={ addTodoItem }
          isInputDisabled={ isInputDisabled }
          setIsInputDisabled={ setIsInputDisabled } /> }></Route>
      </Routes>
    </Router>
  );
}

export default App;