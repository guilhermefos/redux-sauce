import React, { useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, toggleTodo } from './store/actions/todos';

const TodoList = () => {
  const inputRef = useRef();

  const dispatch = useDispatch();

  const todos = useSelector((state) => state.todos);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      dispatch(addTodo(inputRef.current.value));

      inputRef.current.value = '';
    },
    [dispatch]
  );

  const handleToogle = useCallback(
    (id) => {
      dispatch(toggleTodo(id));
    },
    [dispatch]
  );

  const handleRemove = useCallback((id) => {
    dispatch(removeTodo(id));
  }, []);

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input ref={inputRef} />
        <button type="submit">Novo</button>
      </form>

      <ul>
        {todos.length > 0 &&
          todos.map((todo) => (
            <li key={todo.id}>
              {todo.complete ? <s>{todo.text}</s> : todo.text}
              <div>
                <button onClick={() => handleToogle(todo.id)}>Toggle</button>
                <button onClick={() => handleRemove(todo.id)}>Remove</button>
              </div>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default TodoList;
