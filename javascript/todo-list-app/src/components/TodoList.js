import Storage from './Storage';

class TodoList {
  constructor() {
    this._tasks = Storage.getTasks();
    this._totalTasks = 0;

    this._loadTasks();
    this._render();
  }

  addTask(task) {
    this._tasks.push(task);
    Storage.saveTask(task);
    this._displayNewTask(task);
    this._render();
  }

  markTask(id, isDone) {
    const index = this._tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      const task = this._tasks[index];
      task.done = isDone;
      Storage.markTask(index, task);
    }
  }

  deleteTask(id) {
    const index = this._tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
      this._tasks.splice(index, 1);
      Storage.deleteTask(index);
      this._render();
    }
  }

  _displayNewTask(task) {
    const tasksWrapper = document.querySelector('.tasks-wrapper');
    const li = document.createElement('li');
    li.classList.add('item');
    li.setAttribute('data-id', task.id);

    li.innerHTML = `
        <div class="task ${task.done ? 'completed' : ''}">
          <i class="fa-regular ${
            task.done ? 'fa-square-check' : 'fa-square'
          }"></i>
          <p>${task.task}</p>
          <i class="fa-regular fa-trash-can"></i>
        </div>
    `;

    tasksWrapper.appendChild(li);
  }

  _displayTotalTasks() {
    this._totalTasks = this._tasks.length;
    const totalTasksEl = document.querySelector('.item-count');
    totalTasksEl.classList.remove('hidden');
    totalTasksEl.textContent = `Total tasks: ${this._totalTasks}`;
  }

  _loadTasks() {
    this._tasks.forEach((task) => this._displayNewTask(task));
  }

  _render() {
    this._displayTotalTasks();
  }
}

export default TodoList;
