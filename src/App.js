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



 class App extends React.Component {
  constructor(){
     super();
     this.state = {text: '', textList: []}
     this.update = this.update.bind(this)
     this.addItem = this.addItem.bind(this)
     //this.removeItem = this.removeItem.bind(this)
   }
   update(e){
      this.setState({text: e.target.value})
      //this.setState({toRender: false})
   }
   addItem(){
    if (this.state.text !== '') {
      var newArray = this.state.textList.slice();    
      newArray.push({text: this.state.text});   
      this.setState({textList: newArray, text: ''})
    }
    
  }

  handleKeyPress = (event) => {
  if(event.key == 'Enter'){
   this.addItem();  
  }
}

removeItem(e) {
    var array = this.state.textList;
    console.debug('e.target.value: ' + e.target.value)
    var index = array.indexOf(e.target.value)
    // index = 1
    console.debug('array: ' + array)
    console.debug('index: ' + index)
    console.log('remove item clicked for index: ' + index)
    array.splice(index, 1);
    console.debug('array: ' + array)
    //this.setState({textList: array });
  }

// removeItem(index) {
//     // var array = this.state.textList;
//     // var index = array.indexOf(e.target.value)
//     // index = 1
//     console.log('remove item clicked for index: ' + index)
//     // array.splice(index, 1);
//     // this.setState({textList: array });
//     this.setState({
//         textList: this.state.textList.filter(function (e, i) {
//         return i !== index;
//       })
//     });
//   }

  // shouldComponentUpdate() {
  //    return this.state.toAdd;
  //  }
  
  render(){
     console.log('App render');
     return (
       <div>
        <input type="text" style={inputBtnStyle} value={this.state.text} onChange={this.update} onKeyPress={this.handleKeyPress} />
        <button onClick={this.addItem} >ADD</button>
          <hr/>
          <div>
            <h1>ToDo List</h1>
            <TodoList list={this.state.textList} removeItemFunc={this.removeItem.bind(this)} />
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
    //this.removeItem = this.removeItem.bind(this)
    this.state = {style: spanTextRegularStyle}
    this.checkItem = this.checkItem.bind(this)
  }

  // removeItem(e) {
  //   console.log('remove item clicked')
  //   var array = this.state.list;
  //   var index = array.indexOf(e.target.value)
  //   array.splice(index, 1);
  //   this.setState({list: array });
  // }
  // removeItem(index) {
  //   var array = this.state.textList;
  //   //var index = array.indexOf(e.target.value)
  //   // index = 1
  //   console.debug('array: ' + array)
  //   console.debug('index: ' + index)
  //   console.log('remove item clicked for index: ' + index)
  //   array.splice(index, 1);
  //   console.debug('array: ' + array)
  //   //this.setState({textList: array });
  // }

  //  componentWillReceiveProps(){
  //    console.log('TodoItem componentWillReceiveProps');
  //    var newArray = this.state.list.slice();    
  //     newArray.push({text: this.props.text});   
  //     this.setState({list:newArray})
  // }

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
    return (
      <div>
        
        <ul id="todoList" style={todoListTypeStyle}>
        {
            this.props.list.map((item, index) => (
                <TodoItem key={index} text={item.text} removeItemFunc={this.props.removeItemFunc}/>
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
   constructor(props){
     super(props);
     this.state = {style: spanTextRegularStyle}
     this.checkItem = this.checkItem.bind(this)
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
    console.log('TodoItem render');
     return (
       <li>
            <input type="checkbox" onClick={this.checkItem} />
            <span style={this.state.style}>{this.props.text}</span>
            <a href='' style={deleteBtnStyle} onClick={this.props.removeItemFunc}>delete</a>
       </li>
     )
   }
 }



 export default App