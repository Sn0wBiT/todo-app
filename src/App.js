import React from 'react';
import './assets/css/style.css';
import TodoList from './TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: "",
      todoList: [{
          id: 1,
          text: "Tạo git",
          isChecked: true,
          isEdit: false,
        },{
          id: 2,
          text: "Upload source lên git",
          isChecked: true,
          isEdit: false,
        },{
          id: 3,
          text: "Tạo danh sách",
          isChecked: false,
          isEdit: false,
        }
      ]
    };

    this.inputOnChange = this.inputOnChange.bind(this);
    this.inputOnKeyDown = this.inputOnKeyDown.bind(this);
    this.addToList = this.addToList.bind(this);
    this.toggleTodo = this.toggleTodo.bind(this);
    this.removeTodo = this.removeTodo.bind(this);
    this.editTodo = this.editTodo.bind(this);
    this.actuallyEditTodo = this.actuallyEditTodo.bind(this);
  }

  toggleTodo(id) {
    const {todoList} = this.state;
    for (let i = 0; i < todoList.length; i++) {
      const todo = todoList[i];
      if(todo.id === id) {
        todo.isChecked = !todo.isChecked;
      }
    }
    this.setState({ todoList });
  }

  inputOnKeyDown(e) {
    if(e.keyCode === 13) {
      this.addToList();
    }
  }

  inputOnChange(e) {
    this.setState({
      inputValue: e.target.value
    });
  }

  addToList() {
    const {inputValue} = this.state;
    let {todoList} = this.state;
    // Add to list
    // Check if input not empty
    if(inputValue.length > 0) {
      todoList.push({
        id: this.genNumber(),
        text: inputValue,
        isChecked: false,
        isEdit: false,
      });
      
      this.setState({
        todoList, inputValue: ""
      });
    } else {
      alert("Nội dung không được rỗng!");
    }
  }

  genNumber(length = 3) {
    var result = '';
      var characters = '0123456789';
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return parseInt(result);
  }

  removeTodo(id) {
    let {todoList} = this.state;
    todoList = todoList.filter(item => item.id !== id);
    this.setState({ todoList });
  }

  editTodo(id, isSave) {
    let {todoList} = this.state;
    for (let i = 0; i < todoList.length; i++) {
      const todo = todoList[i];
      if(todo.id === id) {
        todoList[i].isEdit = !isSave;
        break;
      }
    }
    this.setState({ todoList });
  }

  actuallyEditTodo(id, text) {
    let {todoList} = this.state;
    for (let i = 0; i < todoList.length; i++) {
      const todo = todoList[i];
      if(todo.id === id) {
        todoList[i].text = text;
        break;
      }
    }
    this.setState({ todoList });
  }

  render() {
    const {inputValue, todoList} = this.state;

    return <React.Fragment>
      <div className="panel">
        <h1>Todo list</h1>
        <div>
          <input className="add-todo" type="text" onChange={this.inputOnChange} value={inputValue} onKeyDown={this.inputOnKeyDown} placeholder="Hôm nay bạn có task gì?" />
          <button onClick={this.addToList}>Thêm</button>
        </div>
        <TodoList todoList={todoList} 
          funcToggleTodo={this.toggleTodo} 
          funcRemoveTodo={this.removeTodo} 
          funcEditTodo={this.editTodo} 
          funcActuallyEdit={this.actuallyEditTodo}
        />
      </div>
    </React.Fragment>;
  }
}

export default App;
