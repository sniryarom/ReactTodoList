import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './App';

var data = [
	{ text: '1' },
  	{ text: '2' },
  	{ text: '3' }
];

ReactDOM.render(
  <TodoApp data={data} />,
  document.getElementById('root')
);
