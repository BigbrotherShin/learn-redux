import React, { useCallback } from 'react';
import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { addTodo, toggleTodo } from '../modules/todos';

// mapStateToProps와 mapDispatchToProps를 따로 선언하지 않고 
// connect 함수를 사용 할 때 인자 쪽에서 익명함수로 바로 만들어서 사용하면 코드가 꽤나 깔끔

function TodosContainer({ todos, addTodo, toggleTodo }) {
  const onCreate = text => addTodo(text);
  const onToggle = useCallback(id => toggleTodo(id), [toggleTodo]); // 최적화를 위해 useCallback 사용
  
  return <Todos todos={todos} onCreate={onCreate} onToggle={onToggle} />;
}

export default connect(
  state => ({ todos: state.todos }),
  {
    addTodo,
    toggleTodo
  }
)(TodosContainer);

// connect를 쓸 때에는 이런 형태를 선호합니다만 꼭 이렇게 할 필요는 없습니다.