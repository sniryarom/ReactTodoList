import React from 'react';
import ReactDOM from 'react-dom';

 class App2 extends React.Component {
  constructor(){
     super();
     this.state = {val: 0}
     this.update = this.update.bind(this)
   }

   update(){
     this.setState({val: this.state.val + 1})
   }

   componentWillMount(){
    console.log('componentWillMount');
   }

   componentWillUnmount(){
    console.log('componentWillUnmount');
   }

   render(){
     console.log('render');
     return <button onClick={this.update}>{this.state.val}</button>
  }

  componentDidMount(){
    console.log('componentDidMount');
   }
 }

 class Wrapper extends React.Component {
  mount(){
    ReactDOM.render(<App2 />, document.getElementById('a'))
  }

unmount(){
  ReactDOM.unmountComponentAtNode(document.getElementById('a'))
}

  render(){
    console.log('render called');
    return (
      <div>
      <button onClick={this.mount.bind(this)}>Mount</button>
      <button onClick={this.unmount.bind(this)}>UnMount</button>
      <div id="a"></div>
      </div>

    )
  }
}

 export default Wrapper