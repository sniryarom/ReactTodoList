import React from 'react';
import TodoList from '../TodoList/TodoList';
import './TodoApp.css'; 


function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response)
  } else {
    return Promise.reject(new Error(response.statusText))
  }
}

function json(response) {
  return response.json()
}

 class TodoApp extends React.Component {
  constructor(props){
    console.debug("constructor started");
     super(props);
     var newArray = [];

     this.state = {text: '', todoList: newArray, isLoaded: false}
     this.getInitialData = this.getInitialData.bind(this)
     this.update = this.update.bind(this)
     this.addItem = this.addItem.bind(this)
     this.removeItem = this.removeItem.bind(this)
     this.filterList = this.filterList.bind(this)
     console.debug("constructor ended");
   }

   componentWillMount() {
      console.debug('TodoApp: component will mount');  
      this.getInitialData();
   }

   getInitialData() {
      let newArray = [];
  
      fetch('http://localhost:5000/api/todo')
      .then(status)
      .then(json)
      .then((data) => {
        console.log('Request succeeded with JSON response', data);
        data.map((item) => (  
            newArray.push(item)
        ))
        console.debug('New array of todo: ', newArray);
        this.setState({todoList: newArray})
      }).catch(function(error) {
        console.log('Request failed', error);
      });

      return newArray;
   }

   update(e){
      this.setState({text: e.target.value})
   }

   addItem(){
    if (this.state.text !== '') {
      let newArray = this.state.todoList.slice();    
      newArray.push({text: this.state.text});   
      this.setState({todoList: newArray, text: ''})
      console.debug('New item added: ' + this.state.text + '. Num of items: ' + newArray.length)
    }
    
  }

  handleKeyPress = (event) => {
  if(event.key === 'Enter'){
   this.addItem();  
  }
}

removeItem(e, index) {
    let array = this.state.todoList;
    console.log('remove item clicked for index: ' + index)
    array.splice(index, 1);
    this.setState({todoList: array});
  }

  filterList (filter){
    console.log('filter applied with filter: ' + filter)
    var filteredArray = this.state.todoList;
    switch(filter) {
      case "Closed":
        filteredArray = this.state.todoList.filter((item) => item.isComplete == true );
        break;
        default:
          break;

    }
    this.setState({todoList: filteredArray});
  }
  
  render(){
     console.log('App render');
     return (
       <div>
        <input type="text" className='inputBtnStyle' value={this.state.text} onChange={this.update} onKeyPress={this.handleKeyPress} />
        <button onClick={this.addItem} >ADD</button>
          <hr/>
          <div>
            <TodoList list={this.state.todoList} removeItemFunc={this.removeItem} filterFunc={this.filterList} />
          </div>
       </div>
     )
   }
 } 

 export default TodoApp