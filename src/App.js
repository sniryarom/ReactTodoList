import React from 'react';
import ReactDOM from 'react-dom';

 class App extends React.Component {
  constructor(){
     super();
     this.state = {text: '', list: []}
     this.update = this.update.bind(this)
     this.addItem = this.addItem.bind(this)
   }
   update(e){
      this.setState({text: e.target.value})
     
   }
   addItem(){
    if (this.state.text != '') {
      var newArray = this.state.list.slice();    
      newArray.push({text: this.state.text});   
      this.setState({list:newArray})
      this.setState({text: ''})
    }
    
  }

  unmount(){
    ReactDOM.unmountComponentAtNode(document.getElementById('todoList'))
  }

  // shouldComponentUpdate() {
  //   return false;
  // }
  
  render(){
     console.log('App render');
     return (
       <div>
        <input type="text" style={inputBtnStyle} value={this.state.text} onChange={this.update} />
        <button onClick={this.addItem}>ADD</button>
          <hr/>
          <div>
            <h1>ToDo List</h1>
            <TodoList list={this.state.list} />
          </div>
       </div>
     )
   }
 } 

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
}

const spanTextRegularStyle = {
  textDecoration: 'none'
}

const deleteBtnStyle = {
  marginLeft: '30px'
}


 class TodoList extends React.Component {

  constructor(){
     super();
    this.removeItem = this.removeItem.bind(this)
  }

  removeItem(e) {
    console.log('remove item clicked')
    var array = this.props.list;
    var index = array.indexOf(e.target.value)
    array.splice(index, 1);
    this.setState({people: array });
  }

  render(){
    console.log('TodoList render');
    return (
      <div>
        
        <ul id="todoList" style={todoListTypeStyle}>
        {
            this.props.list.map((item) => (
                <TodoItem text={item.text} removeItemFunc={this.removeItem}/>
            ))
        }    
        </ul>

      </div>

    )
  }
}

class TodoItem extends React.Component {
   // componentWillMount(){
   //  console.log('TodoItem componentWillMount');
   // }
   constructor(){
     super();
     this.state = {style: spanTextRegularStyle}
     this.addItem = this.addItem.bind(this)
   }

   addItem(e){
      console.log('add item clicked')
      if (e.target.checked) {
        this.setState({style: spanTextStrikeThroughStyle})
      }
      else {
       this.setState({style: spanTextRegularStyle}) 
      }
   }

   render(){
    console.log('TodoItem render');
     return (
       <li>
            <input type="checkbox" onClick={this.addItem} />
            <span style={this.state.style}>{this.props.text}</span>
            <a href='' style={deleteBtnStyle} onClick={this.props.removeItemFunc}>delete</a>
       </li>
     )
   }
 }



 export default App