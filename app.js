//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.
const taskAddInput = document.querySelector(".task__input_add");//Add a new task.
const addButton = document.querySelector(".task__button_add");//Add button
const incompleteTasks = document.querySelector(".task-list_todo");//list-to-do
const completedTasks = document.querySelector(".task-list_completed");//completed-tasks

//New task list item
const createNewTaskElement=function(taskString){

  const listItem=document.createElement("li");
  listItem.className = "task";

  //input (checkbox)
  const checkBox=document.createElement("input");
  checkBox.className = "task__checkbox";
  checkBox.type="checkbox";
  //label
  const label=document.createElement("label");
  label.innerText=taskString;
  label.className='task__label';
  //input (text)
  const editInput=document.createElement("input");
  editInput.className='task__input';
  editInput.type="text";
  //button.edit
  const editButton=document.createElement("button");
  editButton.innerText="Edit";
  editButton.className="task__button task__button_edit";

  //button.delete
  const deleteButton=document.createElement("button");//delete button
  const deleteButtonImg=document.createElement("img");//delete button image

  deleteButton.className="task__button task__button_delete";
  deleteButtonImg.src="./remove.svg";
  deleteButtonImg.alt="delete button image";
  deleteButtonImg.className="task__button-img";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

const addTask=function(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskAddInput.value) return;
  const listItem=createNewTaskElement(taskAddInput.value);

  //Append listItem to incompleteTasks
  incompleteTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskAddInput.value="";
}

//Edit an existing task.
const editTask=function(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem=this.parentNode;

  const editInput=listItem.querySelector(".task__input");
  const label=listItem.querySelector(".task__label");
  const editBtn=listItem.querySelector(".task__button_edit");
  const containsClass=listItem.classList.contains("task_modify");
  //If class of the parent is .editmode
  if(containsClass){

    //switch to .editmode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }
  //toggle .editmode on the parent.
  listItem.classList.toggle("task_modify");
};


//Delete task.
const deleteTask=function(){
  console.log("Delete Task...");
  const listItem=this.parentNode;
  const ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}

//Mark task completed
const taskCompleted=function(){
  console.log("Complete Task...");
  //Append the task list item to the #completed-tasks
  const listItem=this.parentNode;
  completedTasks.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

const taskIncomplete=function(){
  console.log("Incomplete Task...");
  //Mark task as incomplete.
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem=this.parentNode;
  incompleteTasks.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

const ajaxRequest=function(){
  console.log("AJAX Request");
}

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);

const bindTaskEvents=function(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  //select ListItems children
  const checkBox=taskListItem.querySelector(".task__checkbox");
  const editButton=taskListItem.querySelector(".task__button_edit");
  const deleteButton=taskListItem.querySelector(".task__button_delete");

  //Bind editTask to edit button.
  editButton.onclick=editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick=deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTasks ul list items
//for each list item
for (let i=0; i<incompleteTasks.children.length;i++){

  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTasks.children[i],taskCompleted);
}

//cycle over completedTasksHolder ul list items
for (let i=0; i<completedTasks.children.length;i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasks.children[i],taskIncomplete);
}
// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.