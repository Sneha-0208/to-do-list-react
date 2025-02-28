import ToDoTypes from "./ToDo";

const LOCAL_STORAGE_KEY = 'todos';

const ToDoService = {
    // get todos
    getTodos: () :ToDoTypes[] => {
        const todoStr = localStorage.getItem(LOCAL_STORAGE_KEY)
        return todoStr ? JSON.parse(todoStr) : [];
    },

    // Adding Todos
    addTodos: (text:string): ToDoTypes => {
        const todos = ToDoService.getTodos();
        const newTodo: ToDoTypes = {id: todos.length + 1, text, completed: false};

        const updateTodos = [...todos, newTodo];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return newTodo;
    },

    // Updating the Todo
    updateTodo: (todo:ToDoTypes): ToDoTypes => {
        const todos = ToDoService.getTodos();

        const updateTodos = todos.map((t) => (t.id === todo.id ? todo : t));
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
        return todo;
    },

    // Deleting the todo
    deleteTodo : (id: number): void =>{
        const todos = ToDoService.getTodos();
        const updateTodos = todos.filter((todo) => todo.id !== id);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updateTodos));
    }
};

export default ToDoService;