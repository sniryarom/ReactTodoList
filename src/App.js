import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/AppStyles.css'; 


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
  if(event.key == 'Enter'){
   this.addItem();  
  }
}

removeItem(e, index) {
    let array = this.state.todoList;
    console.log('remove item clicked for index: ' + index)
    array.splice(index, 1);
    this.setState({todoList: array});
  }
  
  render(){
     console.log('App render');
     return (
       <div>
        <input type="text" className='inputBtnStyle' value={this.state.text} onChange={this.update} onKeyPress={this.handleKeyPress} />
        <button onClick={this.addItem} >ADD</button>
          <hr/>
          <div>
            <h1>ToDo List</h1>
            <TodoList list={this.state.todoList} removeItemFunc={this.removeItem} />
          </div>
       </div>
     )
   }
 } 

/**
*
*/
 class TodoList extends React.Component {

  constructor(props){
    super(props);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleRemoveItem(e, index) {
    this.props.removeItemFunc(e, index);
  }

  render(){
    console.log('TodoList will render. List:', this.props.list);
    const numOfItems = this.props.list.length;
    return (
      <div>
        
        <ul id="todoList" className='todoListTypeStyle'>
        {
            this.props.list.map((item, index) => (  
                <TodoItem key={index} index={index} text={item.text} removeItemFunc={this.handleRemoveItem}/>
            ))
        }    
        </ul>
        {numOfItems > 0 && 
          <span>Number of items:  {numOfItems}</span>
        }
      </div>
    )
  }
}


class TodoItem extends React.Component {
   constructor(props){
     super(props);
     this.state = {itemChecked: false};
     this.checkItem = this.checkItem.bind(this);
     this.handleRemoveItem = this.handleRemoveItem.bind(this);
   }

   checkItem(e){
      console.log('add item clicked');
      if (e.target.checked) {
        this.setState({itemChecked: true})
      }
      else {
       this.setState({itemChecked: false})
      }
   }

   handleRemoveItem(e) {
    this.props.removeItemFunc(e, this.props.index);
  }

   render(){
    console.log('TodoItem will render. Text: ', this.props.text);
    const itemChecked = this.state.itemChecked;
    const itemClassName = itemChecked ?  'spanTextStrikeThroughStyle' : 'spanTextRegularStyle'
     return (
       <li>
            <input type="checkbox" onClick={this.checkItem} />
            <span className={itemClassName}>{this.props.text}</span>
            <a href='#' className='deleteBtnStyle' onClick={this.handleRemoveItem}>delete</a>
       </li>
     )
   }
 }



 export default TodoApp