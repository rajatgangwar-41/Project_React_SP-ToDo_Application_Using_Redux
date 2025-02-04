const Todo = () => {
  return (
    <div className="container">
      <div className="todo-app">
        <h1>
          <i className="fa-regular fa-pen-to-square"></i>To-do List:
        </h1>
        <div className="row">
          <form>
            <input type="text" id="input-box" placeholder="Add a new task" />
            <button>Add Task</button>
          </form>
        </div>
        <ul id="list-container"></ul>
      </div>
    </div>
  )
}

export default Todo
