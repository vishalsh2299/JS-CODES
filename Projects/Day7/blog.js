import axios from "axios";
import "@babel/polyfill";

const BASE_URL = "http://localhost:3000";

// GETTING POSTS
const getPosts = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/`);
    console.log(res.data);
    const posts = res.data;
    return posts;
  } catch (err) {
    console.log(err);
  }
};

// CREATING UI
const createDiv = (item) => {
  const postDiv = document.createElement("div");

  const title = document.createElement("h2");
  const content = document.createElement("p");
  const del = document.createElement("button");
  const edit = document.createElement("button");

  title.id = item._id;
  content.id = item._id;
  del.id = item._id;
  edit.id = item._id;

  postDiv.className = "post";
  title.className = "collapsible";
  content.className = "data";
  del.classList.add("content", "btn", "btn--green");
  edit.classList.add("content", "btn", "btn--green");

  title.innerHTML = item.title;
  content.innerHTML = item.content;
  del.innerHTML = "Delete";
  edit.innerHTML = "Edit";

  del.onclick = async (e) => await removeTodo(e, del);
  edit.onclick = async (e) => await editTodo(title, content);

  postDiv.append(title, content, del, edit);

  return postDiv;
};

// RENDERING POST
const addPosts = (posts) => {
  const mainDiv = document.getElementById("main");

  posts.forEach((post) => {
    mainDiv.appendChild(createDiv(post));
  });
};

// DELETE FUNCTION FOR FRONTEND
const removeTodo = async (e, del) => {
  e.target.closest("div").remove();

  await deletePost(del.id);
};

// EDIT
export const editTodo = async (title, content) => {
  const post = {
    id: title.id,
    title: title.innerHTML,
    content: content.innerHTML,
    check: true,
  };
  //const res = await axios.post(`${BASE_URL}/edit`, post);
  localStorage.setItem("post", JSON.stringify(post));

  window.location = "http://localhost:1234/public/template/compose.html";
};

// MAIN
const main = async () => {
  const posts = await getPosts();
  addPosts(posts);
  expandable(posts);
};

main();

//DELETE
export const deletePost = async (id) => {
  try {
    const res = await axios.post(`${BASE_URL}/delete`, { id: id });
    console.log(`Deleted Post ID: `, id);

    return res.data;
  } catch (e) {
    console.error(e);
  }
};

// EXPANDABLE MENU
const expandable = (posts) => {
  posts.forEach((post) => {
    var coll = document.getElementById(post._id);
    var content = document.querySelectorAll(`#${CSS.escape(post._id)}`);
    //console.log(content);

    coll.addEventListener("click", function () {
      if (content[1].style.display === "block") {
        content[1].style.display = "none";
        content[2].style.display = "none";
        content[3].style.display = "none";
      } else {
        content[1].style.display = "block";
        content[2].style.display = "inline-block";
        content[3].style.display = "inline-block";
      }
    });
  });
};
