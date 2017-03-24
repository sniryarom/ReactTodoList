import React from 'react';
import ReactDOM from 'react-dom';
//import styles from './AppStyles.css'; // Tell Webpack that Button.js uses these styles

const checkboxHideStyle = {
  display: 'none'
};

const inputBtnStyle = {
  marginRight: '20px'
};

const checkboxShowStyle = {
  display: 'block'
};

const todoListTypeStyle = {
  listStyleType: 'none'
};

const spanTextStrikeThroughStyle = {
  textDecoration: 'line-through'
};

const spanTextRegularStyle = {
  textDecoration: 'none'
};

const deleteBtnStyle = {
  margin: '30px'
}



 class TodoApp extends React.Component {
  constructor(props){
     super(props);
     var newArray = [];
      this.props.data.map((item) => (  
                newArray.push({text: item.text})
            ))

     this.state = {text: '', textList: newArray}
     this.update = this.update.bind(this)
     this.addItem = this.addItem.bind(this)
     this.removeItem = this.removeItem.bind(this)
   }

   // componentWillMount() {
   //    let newArray = this.getInitialData();
   //    this.setState({textList: newArray})
   // }

   // getInitialData() {
   //    let newArray = [];
   //    this.props.data.map((item) => (  
   //              newArray.push(item.text)
   //          ))
   //    return newArray;
   // }

   update(e){
      this.setState({text: e.target.value})
   }

   addItem(){
    if (this.state.text !== '') {
      let newArray = this.state.textList.slice();    
      newArray.push({text: this.state.text});   
      this.setState({textList: newArray, text: ''})
    }
    
  }

  handleKeyPress = (event) => {
  if(event.key == 'Enter'){
   this.addItem();  
  }
}

removeItem(e, index) {
    let array = this.state.textList;
    console.log('remove item clicked for index: ' + index)
    array.splice(index, 1);
    this.setState({textList: array});
  }
  
  render(){
     console.log('App render');
     return (
       <div>
        <input type="text" style={inputBtnStyle} value={this.state.text} onChange={this.update} onKeyPress={this.handleKeyPress} />
        <button onClick={this.addItem} >ADD</button>
          <hr/>
          <div>
            <h1>ToDo List</h1>
            <TodoList list={this.state.textList} removeItemFunc={this.removeItem} />
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
    this.state = {style: spanTextRegularStyle};
    this.checkItem = this.checkItem.bind(this);
    this.handleRemoveItem = this.handleRemoveItem.bind(this);
  }

  handleRemoveItem(e, index) {
    this.props.removeItemFunc(e, index);
  }

  checkItem(e){
      console.log('add item clicked')
      if (e.target.checked) {
        this.setState({style: spanTextStrikeThroughStyle})
      }
      else {
       this.setState({style: spanTextRegularStyle}) 
      }
   }

  render(){
    console.log('TodoList render');
    const numOfItems = this.props.list.length;
    return (
      <div>
        
        <ul id="todoList" style={todoListTypeStyle}>
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
     this.state = {style: spanTextRegularStyle};
     this.checkItem = this.checkItem.bind(this);
     this.handleRemoveItem = this.handleRemoveItem.bind(this);
   }

   checkItem(e){
      console.log('add item clicked');
      if (e.target.checked) {
        this.setState({style: spanTextStrikeThroughStyle});
      }
      else {
       this.setState({style: spanTextRegularStyle});
      }
   }

   handleRemoveItem(e) {
    this.props.removeItemFunc(e, this.props.index);
  }

   render(){
    console.log('TodoItem render');
     return (
       <li>
            <input type="checkbox" onClick={this.checkItem} />
            <span style={this.state.style}>{this.props.text}</span>
            <a href='#' style={deleteBtnStyle} onClick={this.handleRemoveItem}>delete</a>
       </li>
     )
   }
 }



 export default TodoApp