import {html, css, LitElement} from 'lit';

export class TodoComponent extends LitElement {
  static get styles() {
    return css`
    #complete:checked{
      text-decoration-line: line-through;
    }

    .todo-container {
      background-image:url(https://static.tumblr.com/maopbtg/E9Bmgtoht/lines.png), url(https://static.tumblr.com/maopbtg/nBUmgtogx/paper.png);
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 284px;
      height: 749px;
      padding-top: 36px;
      border-radius: 0px 0px 40px 40px;
      overflow: hidden scroll;
      color: darkcyan;
      padding-left: 118px;
    }

    .title {
      font-family: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono",
        "Courier New", monospace;
    }

    #input-add {
      border-color: #764abc;
      height: 30px;
      width: 200px;
      font-size: 16px;
    }

    #button-add {
      color: #764abc;
      border-color: #764abc;
      cursor: pointer;
      height: 36px;
    }

    label {
      font-size: 30px;
      color: #764abc;
    }

    .add-task{
      display: flex;
      flex-direction: row;
    }

    ::-webkit-scrollbar {
      width: 10px;;
  }
   
  ::-webkit-scrollbar-track {
      border-radius: 10px;;
      background-color: rgba(25,147,147,0.1);
  }
   
  ::-webkit-scrollbar-thumb {
      border-radius: 10px;;
      background-color: rgba(25,147,147,0.2);
  }
    `;
  }

  static get properties() {
    return {
      task: {
        type: Object,
        attribute: 'task-att'
      },
      todoList: {
        type: Array,
        attribute: 'todo-list'
      }
    };
  }

  constructor() {
    super();
    this.todoList = [];
    this.task = {
      name: "",
      isComplete: false
    };
  }

  /* handleChange(event){
    const input = event.target as HTMLInputElement;
    this.input = input.value;
  }
 */
  addTask() {
    this.todoList = [...this.todoList, this.task];
    console.log(this.todoList);
    const input = this.shadowRoot.querySelector('input');
    input.value = "";
    this.task = {
      name: input.value,
      isComplete: false,
    };
    this.requestUpdate();
  }

  toggleComplete(task, index){
    task.isComplete = !task.isComplete;
    const span = this.shadowRoot.querySelector(`#complete-task-${index}`);
    task.isComplete ? span.classList.add(".complete") : ""
    //.style.textDecoration = "line-through" : span.style.textDecoration = "none";
    this.requestUpdate();
    console.log(task.name, task.isComplete)
    console.log(this.todoList);
  }

  render() {
    return html`
    <div class="todo-container">
      <h2 class="title">Lista de tareas por hacer 📝</h2>
      <div class="add-task">
        <input type="text" id="input-add" placeholder="Nueva tarea 📌" @input="${(event) => {
        this.task.name = event.currentTarget.value;
      }}" .value="${this.task.name}">
      <button id="button-add" @click="${this.addTask}">➕</button>
      </div>
      
      <ul>
        ${this.todoList.map((task, index) => html`  
        <label>
          <input type="checkbox" id="complete-task-${index}" @click="${() => this.toggleComplete(task, index)}">
        <span id="complete-task-${index}">${task.name}</span>
        </input>
          ${task.isComplete ? html`
          <button id="delete-task-${index}" @click="${() => {
              this.todoList.splice(index, 1);
              this.dispatchEvent(new CustomEvent('delete-task', {detail: task}))
              this.requestUpdate();

            }}">➖
            </button>
          ` : html ``}
            
            <br>
          </label>
        `)}
      </ul>
    </div>
      
    `;
  }
}
