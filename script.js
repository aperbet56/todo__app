// Récupération des différents éléments
const todoInput = document.querySelector(".todo__input");
const todoButton = document.querySelector(".todo__btn");
const todoList = document.querySelector(".todo__list");
const filterOption = document.querySelector(".filter-todo");
const footerYear = document.querySelector(".year");

// Création de la fonction addTodo pour créer un todo
const addTodo = () => {
  // Création et ajout des éléments HTML dans le DOM
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.textContent = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  //Appel de la fonction saveLocalTodos pour enregistrer le todo créé dans le local Storage
  saveLocalTodos(todoInput.value);

  // Création et ajout des éléments dans le DOM
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></li>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);
  todoInput.value = "";
};

// Fonction deleteCheck pour changer la catégorie (tous, effectués, non effectués) du todo
const deleteCheck = (e) => {
  const item = e.target;

  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    todo.classList.add("slide");

    // Appel de la fonction removeLocalTodos pour supprimer le todo du local storage
    removeLocalTodos(todo);
    // Ecoute de l'évènement transitionend qui est émis quand une transition CSS a terminé.
    todo.addEventListener("transitionend", () => {
      todo.remove();
    });
  }

  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
};

// Fonction filterTodo pour la mise en place du style des différentes catégories : tous, effectués, non effectués
const filterTodo = (e) => {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
};

// Fonction saveLocalTodos permettant d'enregistrer les todos dans le local storage
const saveLocalTodos = (todo) => {
  // Initialisation du local storage
  let todos = JSON.parse(localStorage.getItem("todos"));

  // Si le localStorage est vide, on y ajoute le todo créé
  if (todos === null) {
    todos = [];
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    // Sinon on ajoute simplement le nouveau todo dans le local storage
  } else {
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

// Fonction getLocalTodos pour obtenir les todos enregistrés
const getLocalTodos = () => {
  // Récupération des todos
  let todos = JSON.parse(localStorage.getItem("todos"));
  todos.forEach((todo) => {
    // Création et ajout des éléments dans le DOM
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.textContent = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
};

// Fonction removeLocalTodos qui va permettre de supprimer les todos du local Storage
const removeLocalTodos = (todo) => {
  // Récupération des todos
  let todos = JSON.parse(localStorage.getItem("todos"));

  const todoIndex = todo.children[0].innerText;
  // Utilisation de la méthode splice pour supprimer un todo
  todos.splice(todos.indexOf(todoIndex), 1);
  // Mise à jour du local storage
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Declaration of the getCurrentYear function which will allow us the dynamic display of the year
const getCurrentYear = () => {
  const date = new Date();
  //console.log(date);

  const year = date.getFullYear();
  //console.log(year);

  footerYear.textContent = `${year}`;
};
// getCurrentYear function call
getCurrentYear();

// Ecoutes des événements
document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);
