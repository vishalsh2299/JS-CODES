import axios from "axios";
import "@babel/polyfill";

const BASE_URL = "http://localhost:3000";

const getTodos = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`);
    const todos = res.data;
    //console.log(todos);
    return todos;
  } catch (e) {
    console.log(e);
  }
};

// CHECKBOX
async function check(id) {
  // console.log(id);
  // const li = document.getElementById(id);

  // const check = document.getElementById(id);
  // if (li.style.textDecoration === "line-through") {
  //   li.style.textDecoration = "line-through";
  // } else {
  //   li.style.textDecoration = "line-through";
  // }

  try {
    const res = await axios.get(`${BASE_URL}/toggle?id=${id}`);
    const todos = res.data;
    addTodos(todos);
  } catch (e) {
    console.log(e);
  }
}

// ALL
const all = document.getElementById("all");
all.addEventListener("click", async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`);
    const todos = res.data;
    addTodos(todos);
  } catch (e) {
    console.log(e);
  }
});

// ACTIVE
const active = document.getElementById("active");
active.addEventListener("click", async () => {
  try {
    const res = await axios.get(`${BASE_URL}/active`);
    const todos = res.data;
    addTodos(todos);
  } catch (e) {
    console.log(e);
  }
});

// COMPLETE
const complete = document.getElementById("complete");
complete.addEventListener("click", async (event) => {
  try {
    const res = await axios.get(`${BASE_URL}/complete`);
    const todos = res.data;
    addTodos(todos);
  } catch (e) {
    console.log(e);
  }
});

// COMPLETED
const clear = document.getElementById("clear");
clear.addEventListener("click", async () => {
  try {
    const res = await axios.get(`${BASE_URL}/clearcomplete`);
    const todos = res.data;
    addTodos(todos);
  } catch (e) {
    console.log(e);
  }
});

// CREATING ELEMENTS
const createLi = (item) => {
  const li = document.createElement("li");
  li.style.listStyle = "none";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = item._id;
  checkbox.onchange = () => check(item._id);
  checkbox.checked = item.isCompleted;

  const span = document.createElement("span");

  if (item.isCompleted) {
    const strike = document.createElement("s");
    strike.textContent = item.name;
    span.append(strike);
  } else {
    span.textContent = item.name;
  }

  const deleteButton = document.createElement("button", "delete");
  deleteButton.innerHTML = "&#10005;";
  li.append(checkbox, deleteButton, span);

  li.id = item._id;
  // li.appendChild(document.createTextNode(item.name));
  li.appendChild(checkbox, span, deleteButton);
  deleteButton.onclick = async (e) => await removeTodo(e, li);
  return li;
};

// ADDING TO UL
const addTodos = (todos) => {
  const ul = document.querySelector("ul");
  ul.innerHTML = "";
  ul.id = "list";

  if (Array.isArray(todos) && todos.length > 0) {
    todos.map((todo) => {
      ul.appendChild(createLi(todo));
    });
  } else if (todos) {
    ul.innerHTML = "Empty List";
  }
  const itemsLeft = document.getElementById("items-left");
  itemsLeft.innerHTML = todos.length + " items left";
};

// DELETE FUNCTION FOR FRONTEND
const removeTodo = async (e, li) => {
  e.target.closest("li").remove();
  const id = li.id;

  const itemsLeft = document.getElementById("items-left");
  const ul = document.getElementById("list").getElementsByTagName("li").length;
  itemsLeft.innerHTML = ul + " items left";

  await deleteTodo(id);
};

const main = async () => {
  addTodos(await getTodos());
};

main();

// FORM SUBMIT
const input = document.getElementById("new-todos__title");

input.onkeypress = async function (e) {
  if (e.keyCode == 13) {
    event.preventDefault();

    const title = document.querySelector("#new-todos__title").value;

    const todo = {
      name: title,
      isCompleted: false,
    };

    document.getElementById("new-todos__title").value = "";
    const addedTodo = await addTodo(todo); // backend post
    addTodos(addedTodo);
  }
};

//ADD
export const addTodo = async (todo) => {
  const addedTodo = {};
  try {
    const res = await axios.post(`${BASE_URL}/`, todo).then(async (res) => {
      console.log(res.data);
      return res;
    });
    const addedTodo = res.data;
    console.log(`Added a new Todo!`, addedTodo);

    addTodos(await getTodos(addedTodo));
    return addedTodo;
  } catch (e) {
    console.log(e);
  }
};

//DELETE
export const deleteTodo = async (id) => {
  try {
    const res = await axios.post(`${BASE_URL}/delete`, { id: id });
    console.log(`Deleted Todo ID: `, id);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};
