// FRONT END FILE TO INTERACT WITH THE DOM
let addTaskBtn = document.querySelector(".boton");
let taskUL = document.querySelector("#lista");

const addTask = (target) => {
    // console.log(target, typeof target);
    let taskObj = {task: target}
    fetch('/api/addTask', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskObj),
    });
    fetchAndDisplay()
};

const fetchAndDisplay = () =>{
    fetch('/api/requestTask', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
    })
    .then(response => response.json())
    .then(data => {
        taskUL.innerHTML = "" 
        data.data.forEach(task => {
            let li = document.createElement("li");
            let link = document.createElement('a');
            link.innerText = `${task.id} ${task.task}.`
            // console.log(task.id,task.task);
            li.appendChild(link);
            taskUL.appendChild(li);
            li.addEventListener("click", (event) =>{
                event.preventDefault();
                removeTask(task.id);
            })
        });
    })
};

const removeTask = (rowId) => {
    console.log(taskUL.children[rowId-1]);
    // taskUL.removeChild(taskUL.children[rowId-1]);

    let taskIdObj = {id: rowId}
    fetch('/api/removeTask', {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskIdObj),
    });

    fetchAndDisplay()
}

addTaskBtn.addEventListener("click", (event) =>{
    event.preventDefault();
    let newTask = document.querySelector("#tareaInput").value;
    console.log("you haf clicked the button and taks is :", newTask);
    addTask(newTask);
    fetchAndDisplay();
    test()
});



fetchAndDisplay()