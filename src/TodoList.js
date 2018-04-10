import React from 'react';
import TodoItem from './TodoItem';
import '../styles/AppStyles.css'; 


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
          <h1>ToDo List</h1>
          <a href="#" className="menuLink">All</a>
          <a href="#" className="menuLink">Open</a>
          <a href="#" className="menuLink"> Closed</a>
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
  
  export default TodoList