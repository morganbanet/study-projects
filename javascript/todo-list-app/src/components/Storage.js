class Storage {
  static getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
  }

  static saveTask(task) {
    const tasks = Storage.getTasks();
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static markTask(index, task) {
    const tasks = Storage.getTasks();
    tasks.splice(index, 1, task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static deleteTask(index) {
    const tasks = Storage.getTasks();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

export default Storage;
