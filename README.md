# Todo App

This todo app built with React provides a simple and intuitive way of tracking your tasks.

## Features 

* Create new tasks
* Update existing tasks
* Delete tasks
* Mark tasks as completed
* Filter tasks by all, active and completed
* Search tasks

![Todo App](/src/images/image-1.png)

* Paginated tasks (10 tasks per page)

![Todo pages](src/images/image-3.png)

* View individual tasks to get more details ![Todo details](src/images/image-2.png)

## Technology Stack

The following tools were used in this project:

* React
* Vite
* ShadCN/UI
* DummyJSON API
* Tailwind CSS
* Tanstack (React) Query
* React Router
* React Paginate
* Axios
* Localforage
* React Icons
* React Error Boundary

## Installation and Setup

To get started with this project, ensure you have Node.js installed (v20 or higher).

1. Clone this repository:

```bash
git clone https://github.com/Techylawyer/todo-app-react.git

cd todo-app-react
```
2. Install the necessary packages and dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

## API Integration
 
 * The DummyJSON Todo API (https://dummyjson.com/todos) for generating a default list of todos
 * Tanstack (React) Query  for data fetching
 * Localforage for data caching and persistence

 ## Styling

* ShadCN/UI for component styling and color consistency
* Tailwind CSS for CSS utility classes

 ## Available Scripts
 * ```npm run dev``` - start the development server
 * ``` npm run build``` - build for production
 * ```npm run preview``` preview production build

 ## Future Improvements

 * Light and dark theme toggle
 * Search all todos functionality
 * Implement offline capability