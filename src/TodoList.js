import React from 'react';

class TodoList extends React.Component {
    
    inputEditOnChange(e, id) {
        this.props.funcActuallyEdit(id, e.target.value);
    }

    inputEditOnKeyDown(e, id) {
        if(e.keyCode === 13) {
            // send save todo
            this.props.funcEditTodo(id, true);
        }
    }

    callEdit(id, isEdit) {
        this.props.funcEditTodo(id, isEdit);
    }

    render() {
        const {todoList} = this.props;
        let _listTodo = [];
        for (let i = 0; i < todoList.length; i++) {
            const todo = todoList[i];
            _listTodo.push(<li key={`key-${i}`}>
                <div className="content" onClick={() => this.props.funcToggleTodo(todo.id)}>
                    <input type="checkbox" checked={todo.isChecked} readOnly={true} />
                    {todo.isEdit ? <input type="text" value={todo.text} onChange={(e) => this.inputEditOnChange(e, todo.id)} onKeyDown={(e) => this.inputEditOnKeyDown(e, todo.id)} /> : <label style={{textDecoration: (todo.isChecked) ? "line-through" : "none"}}>{todo.text}</label>}
                    
                </div>
                <div className="action-list">
                    <button onClick={() => this.callEdit(todo.id, todo.isEdit)}>{todo.isEdit ? "Lưu" : "Sửa"}</button>
                    <button onClick={() => this.props.funcRemoveTodo(todo.id)}>Xóa</button>
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