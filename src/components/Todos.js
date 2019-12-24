import React, { useState } from 'react';

// 이 파일에는 TodoItem, TodoList, Todos 이렇게 총 3가지의 컴포넌트를 작성
// 이렇게 여러개의 컴포넌트를 만드는 이유는 컴포넌트의 리렌더링 성능을 최적화하기 위함

// 컴포넌트 최적화를 위하여 React.memo를 사용합니다
const TodoItem = React.memo(function TodoItem({ todo, onToggle }) {
  return (
    <li
      style={{
        // 인라인 스타일은 객체 형태로 작성
        textDecoration: todo.done ? 'line-through' : 'none',
        cursor: 'pointer',
      }}
      onClick={() => onToggle(todo.id)}
    >
      {todo.text}
    </li>
  );
});

// 컴포넌트 최적화를 위하여 React.memo를 사용합니다
const TodoList = React.memo(function TodoList({ todos, onToggle }) {
  return (
    <ul>
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} />
      ))}
    </ul>
  );
});

function Todos({ todos, onCreate, onToggle }) {
  // 리덕스를 사용한다고 해서 모든 상태를 리덕스에서 관리해야하는 것은 아닙니다.
  // useState를 통해 local 상태로 관리
  const [text, setText] = useState('');
  const onChange = e => setText(e.target.value);
  const onSubmit = e => {
    e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지
    onCreate(text);
    setText(''); // reset input
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          value={text}
          placeholder="TYPE YOU HAVE TO DO"
          onChange={onChange}
        />
        <button type="submit">Enroll</button>
      </form>
      <TodoList todos={todos} onToggle={onToggle} />
    </div>
  );
}

export default React.memo(Todos);
