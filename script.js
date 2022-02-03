let blogContainer;
let loggedIn;
let blogs = [
  {
    blogTitle: "COURSE 1",
    blogDescription: "Welcome Class for Full Stack Web Developer - MEAN Stack",
  },
  {
    blogTitle: "COURSE 2",
    blogDescription: "Get started with web development",
  },
];
var myModal = new bootstrap.Modal(document.getElementById("loginModal"));
var modalToggle = document.getElementById("loginModal"); // relatedTarget
let blogPostForm = document.getElementById("blogPostForm");
var btnLogin = document.getElementById("btnLogin");
var btnLogout = document.getElementById("btnLogout");
var loginError = document.getElementById("loginError");
var infoMessage = document.getElementById("infoMessage");

BlogModel = function (blogTitle, blogDescription) {
  this.blogTitle = blogTitle;
  this.blogDescription = blogDescription;
};

let postBlog = () => {
  blogTitle = document.getElementById("blogTitle").value;
  blogDesc = document.getElementById("blogDesc").value;
  blogModel = new BlogModel(blogTitle, blogDesc);
  createBlog(blogModel);
  blogs.push(blogModel);
  localStorage.setItem("localBlogs", JSON.stringify(blogs));
  document.getElementById("blogTitle").value = "";
  document.getElementById("blogDesc").value = "";
};

let loginSubmit = () => {
  userName = document.getElementById("userName").value;
  password = document.getElementById("userPassword").value;
  if (userName == "admin" || password == "admin") {
    localStorage.setItem("isUserLoggedIn", true);
    loggedIn = true;
    myModal.hide(modalToggle);
    loggedInCheck();
  } else {
    loginError.style.display = "block";
    setTimeout(() => {
      loginError.style.display = "none";
    }, 5000);
  }
};

let loginDisplay = () => {
  myModal.show(modalToggle);
};

let logout = () => {
  localStorage.setItem("isUserLoggedIn", false);
  loggedInCheck();
};

let createBlog = (blog) => {
  let divRow = document.createElement("div");
  divRow.className = "row";
  divRow.style = "padding:5px;min-height:150px";

  let card = document.createElement("div");
  card.className = "card shadow cursor-pointer";

  let cardBody = document.createElement("div");
  cardBody.innerHTML = blog.blogDescription;
  cardBody.className = "card-body";

  let title = document.createElement("h5");
  title.innerText = blog.blogTitle;
  title.className = "card-title";

  card.appendChild(title);
  card.appendChild(cardBody);

  divRow.appendChild(card);
  blogContainer.appendChild(divRow);
};

let removePost = (title) => {
  let i = 0;
};

let loggedInCheck = () => {
  if (localStorage.getItem("isUserLoggedIn")) {
    loggedIn = localStorage.getItem("isUserLoggedIn") == "true" ? true : false;
  } else {
    loggedIn = false;
  }

  blogPostForm.style.display = loggedIn ? "block" : "none";
  btnLogin.style.display = loggedIn ? "none" : "block";
  btnLogout.style.display = loggedIn ? "block" : "none";
  infoMessage.style.display = loggedIn ? "none" : "block";
};

(() => {
  if (blogContainer) {
    document.getElementById("myPosts").replaceWith(blogContainer);
    return;
  }

  blogContainer = document.getElementById("myPosts");
  if (localStorage.getItem("localBlogs") != null) {
    blogs = JSON.parse(localStorage.getItem("localBlogs"));
  }
  if (blogs.length > 0) {
    blogs.forEach((blog) => {
      createBlog(blog);
    });

    localStorage.setItem("localBlogs", JSON.stringify(blogs));
  }
  loggedInCheck();
  loginError.style.display = "none";
})();
