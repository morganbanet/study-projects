class Task {
  constructor(task) {
    this.id = Date.now();
    this.task = task;
    this.done = false;
  }
}

export default Task;
