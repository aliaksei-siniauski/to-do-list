
window.onload = () => {
    addNewTask();
    closeModalByIconClick();
    closeModalByCloseButtonClick();
    closeModalByOverlayClick();
    createTasks();
}

/* Settings */

const iconClose = document.querySelector('.icon-close');
const fromModal = document.querySelector('.modal');
const newTask = document.querySelector('.new-task')
const overlay = document.querySelector('.overlay');
const buttonAdd = document.querySelector('.button-primary');
const buttonClose = document.querySelector('.button-secondary');
const textInput = document.querySelector('#textInput');
const dateInput = document.querySelector('#dateInput');
const errorMsg = document.querySelector('#error-message');
const tasks = document.querySelector('#tasks');
const iconEditTask = document.querySelector('#icon-edit')
const iconRemoveTask = document.querySelector('#icon-remove')



/* Form */

const formValidation = () => {
    if (textInput.value === "") {
        errorMsg.textContent = "Task cannot be blank";
    } else {
        errorMsg.innerHTML = "";
        acceptData();
    }
};

fromModal.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});


const resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};



/* Modal */


const openModal = () => {
    fromModal.classList.add('modal-open');

}

const closeModal = () => {
    fromModal.classList.remove('modal-open');
    overlay.classList.remove('overlay-open');

}

const addNewTask = () => {
    newTask.addEventListener("click", () => {
        openModal();
        overlay.classList.add('overlay-open');
    })
}


const closeModalByIconClick = () => {
    iconClose.addEventListener("click", closeModal)
}

const closeModalByCloseButtonClick = () => {
    buttonClose.addEventListener("click", closeModal)
}

const closeModalByOverlayClick = () => {
    overlay.addEventListener('click', closeModal);
}

const closeModalByAddButtonClick = () => {
    buttonAdd.addEventListener('click', closeModal)

}
closeModalByAddButtonClick();



/* Create Tasks  */

const createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
      <div id=${y} class="tasks__content">
            <div class="task__header">
            <span class="tasks__text">${x.text}</span>
            <span class="tasks__date">${x.date}</span>
            <p class="tasks__description">${x.description}</p>
            </div>
            <span class="tasks__icons">
              <i onclick="editTask(this)" id="icon-edit" class="fas fa-edit icon"></i>
              <i onclick="deleteTask(this)"  id="icon-remove" class="fas fa-trash-alt icon"></i>
            </span>
          </div>
      `);
    });
    resetForm();
};


/* Local Storage */

let data = [];

const acceptData = () => {

    data.push({
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    })
    localStorage.setItem('data', JSON.stringify(data))
    createTasks();
};



(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();


/* Delete Task */



function deleteTask(e) {
    e.parentElement.parentElement.remove();

    data.splice(e.parentElement.parentElement.id, 1);

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
};


/* Edit Task */

const editTask = (e) => {

    let selectedTask = e.parentElement.parentElement.firstElementChild;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    openModal()
    deleteTask(e);

};


