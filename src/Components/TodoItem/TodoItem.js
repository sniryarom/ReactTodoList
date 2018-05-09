import React from 'react';
import './TodoItem.css'; 


class TodoItem extends React.Component {
    constructor(props){
      super(props);
      console.log('TodoItem CTR. Text: ', this.props.item.text, ', Completed: ', this.props.item.isComplete); 
      this.handleCheckItem = this.handleCheckItem.bind(this);
      this.handleRemoveItem = this.handleRemoveItem.bind(this);
    }
 
    handleCheckItem(e) {
      this.props.checkItemFunc(e, this.props.index)
    }
 
    handleRemoveItem(e) {
     this.props.removeItemFunc(e, this.props.index);
   }
 
    render(){
     console.log('TodoItem will render. Text: ', this.props.item.text, ', Completed: ', this.props.item.isComplete);
     const itemChecked = this.props.item.isComplete ?  true : false;
     const itemClassName = this.props.item.isComplete ?  'spanTextStrikeThrough' : 'spanTextRegular';
      return (
        <li>
             <input type="checkbox" checked={itemChecked} onClick={this.handleCheckItem} />
             <span className={itemClassName}>{this.props.item.text}</span>
             <a href='#' className='deleteBtn' onClick={this.handleRemoveItem}>delete</a>
        </li>
      )
    }
  }
 
  export default TodoItem