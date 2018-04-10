import React from 'react';
import '../styles/AppStyles.css'; 


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
 
  export default TodoItem