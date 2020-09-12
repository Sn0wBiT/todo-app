import React from 'react';

class App extends React.Component {
  
  renderListTodo() {

  }

  render() {
    return <React.Fragment>
      <h1>Todo list</h1>
      <ul>
        {this.renderListTodo()}
      </ul>
    </React.Fragment>;
  }
}

export default App;
