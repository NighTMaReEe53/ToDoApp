// Selectors
const theInp = document.querySelector(".todo-form input"),
  theAdd = document.querySelector(".add"),
  taskContainer = document.querySelector(".tasks");

// Set Options
let theArray = [];
let idEdit,
  isEdit = false;

// LocalStorage

let theLocalToDo = localStorage.getItem("ToDoItem");

if (theLocalToDo != null) {
  theArray = JSON.parse(theLocalToDo);
}

theAdd.addEventListener("click", () => {
  if (theInp.value == "" || theInp.value == null) {
    alert("Please Fill The Input First !!");
  } else {
    getData(theInp.value.trim());
  }
  theAdd.innerHTML = `<i class="fa-solid fa-plus"></i>`;
  theInp.value = "";
});

function getData(theValue) {
  // Data
  let theData = {
    theDate: new Date(),
    title: theValue,
  };

  if (isEdit) {
    theArray[idEdit] = theData;
  } else {
    // Push Data
    theArray.push(theData);
  }
  // Save To LocalStorage
  localStorage.setItem("ToDoItem", JSON.stringify(theArray));
  // ShowDataToDom
  showDataToDom(theArray);
}

// showDataToDom
function showDataToDom(theArray) {
  taskContainer.innerHTML = "";
  if (theArray.length === 0) {
    taskContainer.innerHTML = "<span class='no-data'>No Data To Show</span>";
  }
  document.querySelectorAll(".task").forEach((task) => task.remove());
  // Looping on Array
  theArray.forEach((array, indx) => {
    let theCard = `
        <div class="task">
          <h2>${array.title}</h2>
          <div class="item">
            <span onclick="editItem(${indx}, '${array.title}')" class="edit">Edit</span>
            <span onclick="deleteItem(${indx})" class="delete">Delete</span>
        </div>
      </div>
    `;
    taskContainer.insertAdjacentHTML("afterbegin", theCard);
  });
}

showDataToDom(theArray);

// toggleClass
taskContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done");
  }
});

// deleteItem
function deleteItem(theId) {
  let theConfirm = confirm("هل بالفعل تريد الحذف ؟؟");
  if (!theConfirm) return;
  theArray.splice(theId, 1);
  // UpDateLocalStorage
  localStorage.setItem("ToDoItem", JSON.stringify(theArray));
  // ShowDataToDom Again
  showDataToDom(theArray);
}

// editItem

function editItem(theId, theTitle) {
  idEdit = theId;
  theAdd.innerHTML = "<i class='fa-regular fa-pen-to-square'></i>";
  isEdit = true;
  theInp.value = theTitle;
}

// Dark Mode
let theDark = document.querySelector(".moon");
let theSun = document.querySelector(".sun");
let darkContainer = document.querySelector(".dark");
let theForm = document.querySelector(".todo-form");

if (localStorage.getItem("theMode") != null) {
  document.body.style.setProperty(
    "--mainBackGround",
    localStorage.getItem("theMode")
  );
  if (localStorage.getItem("theMode") === "#333") {
    darkContainer.classList.add("edition");
    theForm.classList.add("theDark");
    taskContainer.classList.add("theDark");
  } else {
    darkContainer.classList.remove("edition");
    theForm.classList.remove("theDark");
    taskContainer.classList.remove("theDark");
  }
}

theSun.addEventListener("click", (e) => {
  if (e.target.classList.contains("sun")) {
    document.body.style.setProperty("--mainBackGround", "#333");
    localStorage.setItem("theMode", "#333");
    darkContainer.classList.add("edition");
    theForm.classList.add("theDark");
    taskContainer.classList.add("theDark");
  }
});
theDark.addEventListener("click", (e) => {
  if (e.target.classList.contains("moon")) {
    document.body.style.setProperty("--mainBackGround", "#FFF");
    localStorage.setItem("theMode", "#FFF");
    darkContainer.classList.remove("edition");
    theForm.classList.remove("theDark");
    taskContainer.classList.remove("theDark");
  }
});
