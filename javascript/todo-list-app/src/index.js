import TodoList from './components/TodoList';
import Task from './components/Task';

import './css/style.css';

class App {
  constructor() {
    this._list = new TodoList();
    this._loadEventListeners();
  }

  _loadEventListeners() {
    document
      .querySelector('.add-item-form')
      .addEventListener('submit', this._addTask.bind(this));

    document
      .querySelector('.tasks-wrapper')
      .addEventListener('click', this._markTask.bind(this));

    document
      .querySelector('.tasks-wrapper')
      .addEventListener('click', this._deleteTask.bind(this));

    document
      .querySelector('.filter-items-input')
      .addEventListener('keyup', this._filterTasks.bind(this));
  }

  _addTask(e) {
    e.preventDefault();
    const taskInput = document.querySelector('.add-item-input');
    if (taskInput.value.trim() === '') return;
    const task = new Task(taskInput.value);
    this._list.addTask(task);
    taskInput.value = '';
  }

  _markTask(e) {
    const id = e.target.closest('.item').getAttribute('data-id');

    if (e.target.classList.contains('fa-square')) {
      this._list.markTask(+id, true);
      e.target.classList.remove('fa-square');
      e.target.classList.add('fa-square-check');
      e.target.parentElement.classList.add('completed');
      return;
    }

    if (e.target.classList.contains('fa-square-check')) {
      this._list.markTask(+id, false);
      e.target.classList.remove('fa-square-check');
      e.target.classList.add('fa-square');
      e.target.parentElement.classList.remove('completed');
      return;
    }
  }

  _deleteTask(e) {
    if (e.target.classList.contains('fa-trash-can')) {
      const id = e.target.closest('.item').getAttribute('data-id');
      this._list.deleteTask(+id);

      e.target.parentElement.parentElement.remove();
    }
  }

  _filterTasks(e) {
    const input = e.target.value.toLowerCase();

    document.querySelectorAll('.item').forEach((item) => {
      const task =
        item.firstElementChild.firstElementChild.nextElementSibling.textContent;

      if (task.toLowerCase().indexOf(input) !== -1) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
}
const app = new App();
