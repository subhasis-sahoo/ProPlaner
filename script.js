// header-section
const header = document.querySelector(".header");

// add-section
const addTodosContainer = document.querySelector(".add-todos-container");
const addTitle = document.getElementById("add-title");
const addDescription = document.getElementById("add-description");
const addDate = document.getElementById("add-date");
const addTime = document.getElementById("add-time");
const resetBtn = document.getElementById("add-reset-btn");
const addBtn = document.getElementById("add-btn");
const addForm = document.querySelector(".add-form");

// preview-card
const addCardTitle = document.querySelector("#add-card-title");
const addCardDescription = document.querySelector("#add-card-description");
const editCardTitle = document.querySelector("#edit-card-title");
const editCardDescription = document.querySelector("#edit-card-description");
const defaultTitile = "Finish Web Development Course";
const defaultDescription = "- Complete the remaining modules of the web development course.\n\n- Focus on JavaScript and React.\n\n- Take notes on key concepts.\n\n- Complete all exercises and quizzes.";

// edit-section
const editTodosContainer = document.querySelector(".edit-todos-container");
const editTitle = document.getElementById("edit-title");
const editDescription = document.getElementById("edit-description");
const editDate = document.getElementById("edit-date");
const editTime = document.getElementById("edit-time");
const editForm = document.querySelector(".edit-form");
const pendingBoxContents = document.querySelector(".pending-box-contents");
const completedBoxContents = document.querySelector(".completed-box-contents");

// all-section
const allTodosContainer = document.querySelector(".all-todos-container");
const allTaskCount = document.getElementById("all-task-count");
// pending-section
const pendingTodosContainer = document.querySelector(".pending-todos-container");
const pendingTaskCount = document.getElementById("pending-task-count");

// completed-section
const completedTodosContainer = document.querySelector(".compeleted-todos-container");

// card
const todoCardExtra = document.getElementsByClassName("todo-card");





// All todo array
let allTodos = getAllTodosFromLocalStorage() || [];
console.log(allTodos);

let pendingTodos = getPendingTodosFromLocalStorage() || [];

// Function which give the all todos from local storage
function getAllTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem("myAllTodos"));
}

// Function which give all pending todos from local storage
function getPendingTodosFromLocalStorage() {
    return JSON.parse(localStorage.getItem("myPendingTodos"));
}

// // Add the required arrays to manage completed todos
// let completedTodos = getCompletedTodosFromLocalStorage() || [];

// // Function to get completed todos from local storage
// function getCompletedTodosFromLocalStorage() {
//     return JSON.parse(localStorage.getItem("myCompletedTodos"));
// }


// reload state
window.addEventListener("load", () => {
    allTaskCount.innerText = allTodos.length;
    pendingTaskCount.innerText = pendingTodos.length;
    addAllTodosFromLocalStorage(allTodos);
});

// Generate random background color for the todo card
const getRandomBackground = () => {
    // todo cards color code
    const cardBackgroundColors = ["#ff7ecd", "#cdfc93", "#71d7ff", "#8bff97", "#8bd3ff", "#ff8b8b", "#ffcf8b", " #a6ff8b", "#fff68b"];
    return cardBackgroundColors[Math.floor(Math.random()*9)];
};

// Fill all data to the card
const fillDataToCard = (cardClone, currTodo) => {
    const todoCard = cardClone.querySelector(".todo-card");
    const cardTitle = cardClone.querySelector(".card-title");
    const cardDescription = cardClone.querySelector(".card-description");
    const cardBackground = currTodo.backgroundColor;
    todoCard.style.backgroundColor = cardBackground;
    cardTitle.innerText = currTodo.title;
    cardDescription.innerText = currTodo.description;
};

// Add todos to all todo container from local storage
const addAllTodosFromLocalStorage = (allTodos) => {
    const todoAddTaskCard = document.querySelector(".todo-add-task-card");
    const cardTemplate = document.querySelector(".card-template");

    allTodosContainer.innerHTML = "";
    allTodosContainer.appendChild(todoAddTaskCard);

    allTodos.forEach(currTodo => {
        const cardClone = cardTemplate.content.cloneNode(true);
        fillDataToCard(cardClone, currTodo);
        allTodosContainer.appendChild(cardClone);
    });

}

// const addCompletedTodosFromLocalStorage = (completedTodos) => {
//     const cardTemplate = document.querySelector(".card-template");
//     completedTodosContainer.innerHTML = "";
//     completedTodos.forEach(currTodo => {
//         const cardClone = cardTemplate.content.cloneNode(true);
//         fillDataToCard(cardClone, currTodo);
//         completedTodosContainer.appendChild(cardClone);
//     });
// };
const addPendingTodosFromLocalStorage = (pendingTodos) => {
    const cardTemplate = document.querySelector(".card-template");
    pendingTodosContainer.innerHTML = "";
    pendingTodos.forEach(currTodo => {
        const cardClone = cardTemplate.content.cloneNode(true);
        fillDataToCard(cardClone, currTodo);
        pendingTodosContainer.appendChild(cardClone);
    });
};

// Checking weather the to-do alresdy exist or not.
const isTodoExist = (currTodo) => {
    const isTitleExist = allTodos.some(todo => todo.title === currTodo.title);
    const isDescriptionExist = allTodos.some(todo => todo.description === currTodo.description);

    if(isTitleExist && isDescriptionExist) return true;
    return false;
};


// Add updated todo and delete previous todo
const updateTodos = (anyTodos, anyTaskCount, localStorageKey, todoData) => {
    let todoIndex = anyTodos.findIndex((currTodo) => {
        return currTodo.title === data[0].title;
    });
    console.log(todoIndex);

    if(todoIndex >= 0) {
        anyTodos.splice(todoIndex, 1, todoData);

        anyTaskCount.innerText = anyTodos.length;
        localStorage.setItem(localStorageKey, JSON.stringify(anyTodos));
    }
};

// add form input handel
const handelAddFormInput = (event) => {
    const {name, value} = event.target;

    switch(name) {
        case "title":
            addCardTitle.innerText = value;
            break;
        case "description":
            addCardDescription.innerText = value;
            break;
    }
};


// add form submit handel
const handelAddFormSubmit = () => {
    
    const todoData = {
        title: `${addTitle.value}`,
        description: `${addDescription.value}`,
        date: `${addDate.value}`,
        time: `${addTime.value}`,
        status: "pending",
        backgroundColor: getRandomBackground()
    };

    addTitle.value = "";
    addDescription.value = "";
    addDate.value = "";
    addTime.value = "";

    addCardTitle.innerText = defaultTitile;
    addCardDescription.innerText = defaultDescription;

    // Checking is todo exist in the all todo array or not
    if(isTodoExist(todoData)) {
        console.log("Todo is allready exits");
    }
    else {
        allTodos.push(todoData);
        pendingTodos.push(todoData);
        allTaskCount.innerText = allTodos.length;
        pendingTaskCount.innerText = pendingTodos.length;
        localStorage.setItem("myAllTodos", JSON.stringify(allTodos));
        localStorage.setItem("myPendingTodos", JSON.stringify(pendingTodos));
    }
    console.log(allTodos);




    // Adding the new todo to the all-section.
    // const cardTemplate = document.querySelector(".card-template");

    // const cardClone = cardTemplate.content.cloneNode(true);
    // fillDataToCard(cardClone, todoData);
    // allTodosContainer.appendChild(cardClone);
};

// edit form input handel
const handelEditFormInput = (event) => {
    const {name, value} = event.target;

    switch(name) {
        case "title":
            editCardTitle.innerText = value;
            break;
        case "description":
            editCardDescription.innerText = value;
            break;
    }
};

// edit form submit handel
const handelEditFormSubmit = () => {
    const todoData = {
        title: `${editTitle.value}`,
        description: `${editDescription.value}`,
        date: `${editDate.value}`,
        time: `${editTime.value}`,
        status: "pending",
        backgroundColor: data[0].backgroundColor
    };

    if(isTodoExist(todoData)) {
        console.log("Todo is allready exits");
    }
    else {
        updateTodos(allTodos, allTaskCount, "myAllTodos", todoData);
        updateTodos(pendingTodos, pendingTaskCount, "myPendingTodos", todoData);
    }
    console.log(allTodos);
    onNavItemClick('all', 'all-todos-container');
};


// default states
let currSelectedNav = document.getElementById("all"); // nva-items
currSelectedNav.classList.add("active");

let currTodoContainer = document.querySelector(".all-todos-container"); // todo-containers
currTodoContainer.classList.remove("hidden-section");

let currEditTodoContainer = document.querySelector(".todo-drag-drop-section");
currEditTodoContainer.classList.remove("hidden-section");

// On nav items clicked
const onNavItemClick = (id, container) => {
    const navItem = document.getElementById(id);
    const todoContainer = document.querySelector(`.${container}`);
    currSelectedNav?.classList.remove("active");
    currSelectedNav = navItem;
    currSelectedNav.classList.add("active");
    const navItemName = id[0].toUpperCase() + id.substring(1).toLowerCase();
    header.innerText = `${navItemName} To-Dos`;

    currTodoContainer?.classList.add("hidden-section");
    currTodoContainer = todoContainer;
    currTodoContainer.classList.remove("hidden-section");

    if(id === "edit") {
        let defalutEditSection = document.querySelector(".todo-drag-drop-section");
        currEditTodoContainer?.classList.add("hidden-section");
        currEditTodoContainer = defalutEditSection;
        currEditTodoContainer.classList.remove("hidden-section");

        // adding cards to the pending and complete container
        const pendingBoxContents = document.querySelector(".pending-box-contents");
        const cardTemplate = document.querySelector(".card-template");        
        pendingBoxContents.innerHTML = "";
        pendingTodos.forEach(currTodo => {
            const miniCardClone = cardTemplate.content.cloneNode(true);
            const todoCard = miniCardClone.querySelector(".todo-card");
            const cardTitle = miniCardClone.querySelector(".card-title");
            const cardDescription = miniCardClone.querySelector(".card-description");

            // adding the extra css to the todo cards
            todoCard.classList.add("todo-card-extra");
            cardTitle.classList.add("card-title-extra");
            cardDescription.classList.add("card-description-extra");

            
            todoCard.style.backgroundColor = currTodo.backgroundColor;
            cardTitle.innerText = currTodo.title;
            cardDescription.innerText = currTodo.description;
            
            // adding drag functionality
            todoCard.setAttribute("draggable", "true");
            todoCard.dataset.id = cardTitle.innerText;
            addDragAndDropListeners(todoCard);
            pendingBoxContents.appendChild(miniCardClone);
        });

        // // adding cards to the pending and complete container
        // const completedBoxContents = document.querySelector(".completed-box-contents");
        // // const cardTemplate = document.querySelector(".card-template");        
        // completedBoxContents.innerHTML = "";
        // completedTodos.forEach(currTodo => {
        //     const miniCardClone = cardTemplate.content.cloneNode(true);
        //     const todoCard = miniCardClone.querySelector(".todo-card");
        //     const cardTitle = miniCardClone.querySelector(".card-title");
        //     const cardDescription = miniCardClone.querySelector(".card-description");

        //     // adding the extra css to the todo cards
        //     todoCard.classList.add("todo-card-extra");
        //     cardTitle.classList.add("card-title-extra");
        //     cardDescription.classList.add("card-description-extra");

            
        //     todoCard.style.backgroundColor = currTodo.backgroundColor;
        //     cardTitle.innerText = currTodo.title;
        //     cardDescription.innerText = currTodo.description;
            
        //     // adding drag functionality
        //     todoCard.setAttribute("draggable", "true");
        //     todoCard.dataset.id = cardTitle.innerText;
        //     addDragAndDropListeners(todoCard);
        //     completedBoxContents.appendChild(miniCardClone);
        // });

    }

    if(id === "all") {
        addAllTodosFromLocalStorage(allTodos);
    }

    if(id === "pending") {
        addPendingTodosFromLocalStorage(pendingTodos);
    }

    if(id === "completed") {
        addCompletedTodosFromLocalStorage(completedTodos);
    }
    
};




// add-section
addTodosContainer.addEventListener("input", handelAddFormInput);
addForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handelAddFormSubmit();
});

// edit-section
editTodosContainer.addEventListener("input", handelEditFormInput);
editForm.addEventListener("submit", (event) => {
    event.preventDefault();
    handelEditFormSubmit();
});

// drag and drop section

// Function to handle drag start
const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", e.target.dataset.id);
    e.target.classList.add("dragging");
    console.log("dragging");
    
};

// Function to handle drag over
const handleDragOver = (e) => {
    e.preventDefault();
    console.log(e.target);
    e.dataTransfer.dropEffect = "move";
    console.log("move");
};


// Function to handle drop
const handleDrop = (e) => {
    e.preventDefault();
    console.log("Drop detected");
    const id = e.dataTransfer.getData("text/plain");
    const draggableElement = document.querySelector(`[data-id='${id}']`);
    const dropzone = e.target.closest(".pending-box-contents, .completed-box-contents");

    if (!dropzone) {
        console.log("Dropzone not detected");
        return;
    }

    console.log(`Dropped in: ${dropzone.className}`);
    dropzone.appendChild(draggableElement);
    draggableElement.classList.remove("dragging");

    // Update the status in the todo data and local storage
    const todo = allTodos.find(todo => todo.title === draggableElement.querySelector(".card-title").innerText);
    if (dropzone === pendingBoxContents) {
        todo.status = "pending";
        pendingTodos.push(todo);
        const index = completedTodos.indexOf(todo);
        if (index > -1) {
            completedTodos.splice(index, 1);
        }
    } else if (dropzone === completedBoxContents) {
        todo.status = "completed";
        completedTodos.push(todo);
        const index = pendingTodos.indexOf(todo);
        if (index > -1) {
            pendingTodos.splice(index, 1);
        }
    }

    localStorage.setItem("myAllTodos", JSON.stringify(allTodos));
    localStorage.setItem("myPendingTodos", JSON.stringify(pendingTodos));
    localStorage.setItem("myCompletedTodos", JSON.stringify(completedTodos));
};



// Add event listeners to the todo elements
const addDragAndDropListeners = (element) => {
    element.addEventListener("dragstart", handleDragStart);
    element.addEventListener("dragend", () => element.classList.remove("dragging"));
};

// Add event listeners to the containers
pendingBoxContents.addEventListener("dragover", handleDragOver);
pendingBoxContents.addEventListener("drop", handleDrop);

completedBoxContents.addEventListener("dragover", handleDragOver);
completedBoxContents.addEventListener("drop", handleDrop);




let data;
// delete card
allTodosContainer.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target);
    if(e.target.classList.contains("todo-card")){
        let selectedCardTitle = e.target.firstElementChild.innerText;
        console.log(selectedCardTitle);

        data = allTodos.filter((currTodo) => {
            return currTodo.title === selectedCardTitle;
        });

        console.log(data);

        let editTodoForm = document.querySelector(".todo-form-section");
        currEditTodoContainer?.classList.add("hidden-section");
        currEditTodoContainer = editTodoForm;
        currEditTodoContainer.classList.remove("hidden-section");

        const navItem = document.getElementById("edit");
        const todoContainer = document.querySelector(".edit-todos-container");
        currSelectedNav?.classList.remove("active");
        currSelectedNav = navItem;
        currSelectedNav.classList.add("active");
        header.innerText = `Edit To-Dos`;

        currTodoContainer?.classList.add("hidden-section");
        currTodoContainer = todoContainer;
        currTodoContainer.classList.remove("hidden-section");

        const editTitle = document.getElementById("edit-title");
        const editDescription = document.getElementById("edit-description");
        const editPreview = document.getElementById("edit-todo-card");
        const todoStatus = document.getElementById("status");


        const {title, description, date, time, status, backgroundColor} = data[0];

        // Set edit section input values accroding to the todo 
        editTitle.value = title;
        editDescription.value = description;
        editDate.value = date;
        editTime.value = time;
        editCardTitle.innerText = title;
        editCardDescription.innerText = description;

        // Set edit section todo card accroding to the todo
        editPreview.style.backgroundColor = backgroundColor;
        if(status === "pending") {
            todoStatus.innerText = status;
            todoStatus.style.backgroundColor = "#ff7e8aad";
            todoStatus.style.color = "#d73b4a";
        } else {
            todoStatus.innerText = status;
            todoStatus.style.backgroundColor = "#7eff7ead";
            todoStatus.style.color = "#25b00e";
        }
        
    }
});