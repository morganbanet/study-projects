class Todo {
  id: string;
  text: string;

  constructor(text: string) {
    this.id = String(Date.now() + Math.floor(Math.random() * 200));
    this.text = text;
  }
}

export default Todo;
