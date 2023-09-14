import React, { createContext, useContext, useReducer } from "react";

// Define the initial state and reducer function
const initialState = {
  todos: [],
  completed: [], // Initialize an empty array for completed tasks
};

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todos: [...state.todos, { text: action.payload, isComplete: false }],
      };
    case "MARK_AS_COMPLETE":
      const updatedTodos = state.todos.map((todo) =>
        todo.text === action.payload.text // Compare by text to find the task
          ? { ...todo, isComplete: !todo.isComplete } // Toggle isComplete
          : todo
      );

      // Find the completed task and move it to the completed list
      const completedTask = updatedTodos.find(
        (todo) => todo.text === action.payload.text
      );
      if (completedTask && completedTask.isComplete) {
        const updatedCompleted = [...state.completed, completedTask];
        return { ...state, todos: updatedTodos, completed: updatedCompleted };
      }

      return { ...state, todos: updatedTodos };
    // Inside your reducer function
    case "EDIT_TODO":
      return {
        ...state,
        todos: state.todos.map((todo, index) =>
          index === action.payload.index
            ? { ...todo, text: action.payload.editedText }
            : todo
        ),
      };
    // Add more cases for other actions (e.g., deleting).
    default:
      return state;
  }
};

// Create the context
const TodoContext = createContext();

// Create a TodoProvider component
export const TodoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};

// Create a custom hook for accessing the context
export const useTodoContext = () => {
  return useContext(TodoContext);
};
