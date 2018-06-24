import React from 'react';
import TodoList from '../TodoList/TodoList';
import './TodoApp.css'; 

const API_URL = 'http://localhost:5000/api/todo';

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

     this.state = {text: '', todoList: newArray, filteredList: newArray, isLoaded: false}
     this.getInitialData = this.getInitialData.bind(this)
     this.update = this.update.bind(this)
     this.addItem = this.addItem.bind(this)
     this.removeItem = this.removeItem.bind(this)
     this.checkItem = this.checkItem.bind(this)
     this.filterList = this.filterList.bind(this)
     console.debug("constructor ended");
   }

   componentWillMount() {
      console.debug('TodoApp: component will mount');  
      this.getInitialData();
   }

   getInitialData() {
      let newArray = [];
  
      fetch(API_URL)
      .then(status)
      .then(json)
      .then((data) => {
        console.log('Request succeeded with JSON response', data);
        data.map((item) => (  
            newArray.push(item)
        ))
        console.debug('New array of todo: ', newArray);
        this.setState({todoList: newArray, filteredList: newArray})
      }).catch(function(error) {
        console.log('Request failed', error);
      });
   }

   update(e){
      this.setState({text: e.target.value})
   }

   addItem(){
    if (this.state.text !== '') {
      //update the UI
      let newArray = this.state.todoList.slice();
      let newTodoItem = {text: this.state.text, isComplete: false};  
      newArray.push(newTodoItem);   
      this.setState({todoList: newArray, text: ''});
      //then update the server and then the client
      newArray = [];
      fetch(API_URL, {
        method: 'post',
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newTodoItem)
      })
      .then(status)
      .then(json)
      .then((data) => {
        console.log('Request succeeded with JSON response', data);
        data.map((item) => (  
            newArray.push(item)
        ))
        console.debug('New array of todo: ', newArray);
        this.setState({todoList: newArray, filteredList: newArray});
        console.debug('New item added: ' + this.state.text + '. Num of items: ' + newArray.length)
      }).catch(function(error) {
        console.log('Request failed', error);
      });
    }
    
  }

  handleKeyPress = (event) => {
    if(event.key === 'Enter'){
    this.addItem();  
    }
  }

  checkItem(e, index){
    console.log('check item clicked');
    //update the UI first
    const key = this.state.todoList[index].key;
    let newArray = this.state.todoList;
    var todoItem = newArray[index];
    todoItem.isComplete = (e.target.checked) ? true : false;
    newArray[index] = todoItem;
    this.setState({todoList: newArray, filteredList: newArray})
    //then update the server and update the client again
    newArray = [];
    fetch(API_URL + '/' + key, {
      method: 'put',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(todoItem)
    })
    .then(status)
    .then(json)
    .then((data) => {
      console.log('Request succeeded with JSON response', data);
      data.map((item) => (  
          newArray.push(item)
      ))
      console.debug('New array of todo: ', newArray);
      this.setState({todoList: newArray, filteredList: newArray});
      console.debug('Item checked: key=' + key);
    }).catch(function(error) {
      console.log('Request failed', error);
    });
  }

  removeItem(e, index) {
    const key = this.state.todoList[index].key;
    let newArray = [];
    fetch(API_URL + '/' + key, {
      method: 'delete'
    })
    .then(status)
    .then(json)
    .then((data) => {
      console.log('Request succeeded with JSON response', data);
      data.map((item) => (  
          newArray.push(item)
      ))
      console.debug('New array of todo: ', newArray);
      this.setState({todoList: newArray, filteredList: newArray});
      console.debug('Item removed: key=' + key + '. Num of items: ' + newArray.length)
    }).catch(function(error) {
      console.log('Request failed', error);
    });
     
  }

  // checkItem(e, index){
  //   console.log('check item clicked');
  //   let array = this.state.todoList;
  //   array[index].isComplete = (e.target.checked) ? true : false;
  //   this.setState({todoList: array})
  // }

  filterList (filter){
    console.log('filter applied with filter: ' + filter)
    var filteredArray = this.state.todoList;
    switch(filter) {
      case "Closed":
        filteredArray = this.state.todoList.filter((item) => item.isComplete === true );
        break;
      case "Open":
        filteredArray = this.state.todoList.filter((item) => item.isComplete === false );
        break;
      case "All":
      default:
        filteredArray = this.state.todoList;
          break;

    }
    this.setState({filteredList: filteredArray});
  }
  
  render(){
     console.log('App render');
     return (
       <div>
        <input type="text" className='inputBtnStyle' value={this.state.text} onChange={this.update} onKeyPress={this.handleKeyPress} />
        <button onClick={this.addItem} >ADD</button>
          <hr/>
          <div>
            <TodoList list={this.state.filteredList} checkItemFunc={this.checkItem} removeItemFunc={this.removeItem} filterFunc={this.filterList} />
          </div>
       </div>
     )
   }
 } 

 export default TodoApp