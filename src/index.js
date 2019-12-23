import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux'; //리액트 프로젝트에 리덕스를 적용 할 때에는 react-redux 라는 라이브러리를 사용
import rootReducer from './modules';

const store = createStore(rootReducer); // make store, store function parameter is reducer

ReactDOM.render( // Provider의 props로 store를 넣어서 App 을 감싸게 되면 
  // 렌더링하는 그 어떤 컴포넌트던지 리덕스 스토어에 접근 할 수 있음.
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
