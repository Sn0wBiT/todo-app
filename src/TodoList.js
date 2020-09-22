import React from 'react';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        const tempEditList = [];
        for (let i = 0; i < props.todoList.length; i++) {
            const element = props.todoList[i];
            tempEditList.push({
                id: element.id,
                text: element.text
            });
        }
        this.state = {
            tempEditList: tempEditList,
        }
        this.inputEditOnChange = this.inputEditOnChange.bind(this);
        this.callEdit = this.callEdit.bind(this);
    }

    inputEditOnChange(e, id, i) {
        let {tempEditList} = this.state;
        tempEditList[i].text = e.target.value;
        this.setState({tempEditList});
    }

    inputEditOnKeyDown(e, id) {
        if(e.keyCode === 13) {
            // send save todo
            this.props.funcActuallyEdit(id, e.target.value);
            this.props.funcEditTodo(id, true);
        } else if(e.keyCode === 27) {
            this.props.funcEditTodo(id, true);
        }
    }

    callEdit(id, isEdit, i) {
        const {tempEditList} = this.state;
        if(isEdit) {
            this.props.funcActuallyEdit(id, tempEditList[i].text);
        } else {
            tempEditList[i].text = this.props.todoList[i].text;
            this.setState({ tempEditList });
        }
        this.props.funcEditTodo(id, isEdit);
    }

    callCancel(id, isEdit) {
        if(!isEdit) {
            this.props.funcRemoveTodo(id);
        } else {
            this.props.funcEditTodo(id, true);
        }
    }

    render() {
        const {todoList} = this.props;
        const {tempEditList} = this.state;
        let _listTodo = [];
        for (let i = 0; i < todoList.length; i++) {
            const todo = todoList[i];
            _listTodo.push(<li key={`key-${i}`}>
                <div className="content" onClick={() => this.props.funcToggleTodo(todo.id)}>
                    <input type="checkbox" checked={todo.isChecked} readOnly={true} />
                    {todo.isEdit ? 
                        <input type="text" value={tempEditList[i].text} 
                            onChange={(e) => this.inputEditOnChange(e, todo.id, i)} 
                            onKeyDown={(e) => this.inputEditOnKeyDown(e, todo.id)} 
                        /> : 
                        <label style={{textDecoration: (todo.isChecked) ? "line-through" : "none"}}>{todo.text}</label>
                    }
                </div>
                <div className="action-list">
                    <button onClick={() => this.callEdit(todo.id, todo.isEdit, i)}>{todo.isEdit ? "Lưu" : "Sửa"}</button>
                    <button onClick={() => this.callCancel(todo.id, todo.isEdit)}>{todo.isEdit ? "Hủy" : "Xóa" }</button>
                </div>
            </li>);
        }
        return <React.Fragment>
            <div className="list-todo">
                <ul>{_listTodo}</ul>
            </div>
        </React.Fragment>;
    }
}

export default TodoList;