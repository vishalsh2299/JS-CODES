class View {
  constructor() {
    this.app = this.getElement("#root");

    this.input = this.createElement("input");
    this.input.type = "text";
    this.input.placeholder = "What needs to be done?";
    this.input.name = "todo";

    this.title = this.createElement("h1");
    this.title.textContent = "todos";
    this.todoList = this.createElement("ul", "todo-list");

    this.count = this.getElement(".count");

    this.app.append(this.title, this.input, this.todoList);

    this.active = document.getElementById("active");
    this.complete = document.getElementById("completed");
    this.all = document.getElementById("all");

    // this.clearCompleted = document.getElementById("clear");
    // this.todoClearList = "";

    this.todoListActive = this.createElement("ul", "todo-list");

    this._temporaryTodoText = "";
  }

  get _todoText() {
    return this.input.value;
  }

  _resetInput() {
    this.input.value = "";
  }

  createElement(tag, className) {
    const element = document.createElement(tag);

    if (className) element.classList.add(className);

    return element;
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  displayTodos(todos) {
    // Delete all nodes
    while (this.todoList.firstChild) {
      this.todoList.removeChild(this.todoList.firstChild);
    }

    if (todos.length === 0) {
      const p = this.createElement("p");
      p.textContent = "Nothing to do! Add a task?";
      this.todoList.append(p);
    } else {
      todos.forEach((todo) => {
        const li = this.createElement("li");
        li.id = todo.id;

        const checkbox = this.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.complete;

        const span = this.createElement("span");

        if (todo.complete) {
          const strike = this.createElement("s");
          strike.textContent = todo.text;
          span.append(strike);
        } else {
          span.textContent = todo.text;
        }

        const deleteButton = this.createElement("button", "delete");
        deleteButton.innerHTML = "&#10005;";
        li.append(checkbox, span, deleteButton);

        this.todoList.append(li);
      });
    }

    // ALL
    this.all.addEventListener("click", () => {
      while (this.todoList.firstChild) {
        this.todoList.removeChild(this.todoList.firstChild);
      }

      if (todos.length === 0) {
        const p = this.createElement("p");
        p.textContent = "Nothing to do! Add a task?";
        this.todoList.append(p);
      } else {
        todos.forEach((todo) => {
          const li = this.createElement("li");
          li.id = todo.id;

          const checkbox = this.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = todo.complete;

          const span = this.createElement("span");

          if (todo.complete) {
            const strike = this.createElement("s");
            strike.textContent = todo.text;
            span.append(strike);
          } else {
            span.textContent = todo.text;
          }

          const deleteButton = this.createElement("button", "delete");
          deleteButton.innerHTML = "&#10005;";
          li.append(checkbox, span, deleteButton);

          this.todoList.append(li);
        });
      }
    });

    //ACTIVE
    this.active.addEventListener("click", (event) => {
      this.todoList.innerHTML = "";
      todos.forEach((todo) => {
        if (todo.complete === false) {
          const li = this.createElement("li");
          li.id = todo.id;

          const checkbox = this.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = todo.complete;

          const span = this.createElement("span");

          if (todo.complete) {
            const strike = this.createElement("s");
            strike.textContent = todo.text;
            span.append(strike);
          } else {
            span.textContent = todo.text;
          }

          const deleteButton = this.createElement("button", "delete");
          deleteButton.innerHTML = "&#10005;";
          li.append(checkbox, span, deleteButton);

          this.todoList.append(li);
        }
      });
    });

    //Completed
    this.complete.addEventListener("click", (event) => {
      this.todoList.innerHTML = "";
      todos.forEach((todo) => {
        if (todo.complete === true) {
          const li = this.createElement("li");
          li.id = todo.id;

          const checkbox = this.createElement("input");
          checkbox.type = "checkbox";
          checkbox.checked = todo.complete;

          const span = this.createElement("span");

          if (todo.complete) {
            const strike = this.createElement("s");
            strike.textContent = todo.text;
            span.append(strike);
          } else {
            span.textContent = todo.text;
          }

          const deleteButton = this.createElement("button", "delete");
          deleteButton.innerHTML = "&#10005;";
          li.append(checkbox, span, deleteButton);

          this.todoList.append(li);
        }
      });
    });

    console.log(todos);
    console.log(todos.length);
    this.count.textContent = todos.length + " items left";
  }

  bindAddTodo(handler) {
    this.input.addEventListener("keypress", (event) => {
      if (event.keyCode == 13 && this._todoText) {
        handler(this._todoText);
        this._resetInput();
      }
    });
  }

  bindDeleteTodo(handler) {
    this.todoList.addEventListener("click", (event) => {
      if (event.target.className === "delete") {
        const id = parseInt(event.target.parentElement.id);

        handler(id);
      }
    });
  }

  bindToggleTodo(handler) {
    this.todoList.addEventListener("change", (event) => {
      if (event.target.type === "checkbox") {
        const id = parseInt(event.target.parentElement.id);

        handler(id);
      }
    });
  }

  // bindDeleteCompleted(handler) {

  //   this.clearCompleted.addEventListener("click", (event) => {
  //     alert("dasd");
  //     todos.forEach((todo) => {
  //       console.log(todo);
  //     });

  //     handler(todos);
  //   });
  // }
}
