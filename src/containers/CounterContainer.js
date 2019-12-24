// 컨테이너 컴포넌트: 리덕스 스토어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트를 의미
// HTML 태그들을 사용하지 않고 다른 프리젠테이셔널 컴포넌트들을 불러와서 사용

import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease, setDiff } from '../modules/counter';

function CounterContainer() {
  // useSelector는 리덕스 스토어의 상태를 조회하는 Hook입니다.
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일합니다.
  const { number, diff } = useSelector(
    state => ({
      number: state.counter.number,
      diff: state.counter.diff, // CounterContainer에서는 사실상 useSelector Hook 을 통해 매번 렌더링 될 때마다
      // 새로운 객체 { number, diff }를 만드는 것이기 때문에 상태가 바뀌었는지 바뀌지 않았는지 확인을 할 수 없어서 낭비 렌더링이 이루어지고 있는 것
    }),
    shallowEqual, // useSelctor를 통해 여러 가지 값을 가져올 때 최적화 하는 법:
    // useSelector 의 두번째 파라미터는 equalityFn
    // equalityFn?: (left: any, right: any) => boolean
    // 이전 값과 다음 값을 비교하여 true가 나오면 리렌더링을 하지 않고 false가 나오면 리렌더링
    // shallowEqual 은 react-redux에 내장되어있는 함수로서, 객체 안의 가장 겉에 있는 값들을 모두 비교
  );

  // useDispatch 는 리덕스 스토어의 dispatch 를 함수에서 사용 할 수 있게 해주는 Hook 입니다
  const dispatch = useDispatch();
  // 각 액션들을 디스패치하는 함수들을 만드세요
  const onIncrease = () => dispatch(increase());
  const onDecrease = () => dispatch(decrease());
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Counter
      // 상태와
      number={number}
      diff={diff}
      // 액션을 디스패치 하는 함수들을 props로 넣어줍니다.
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  );
}

export default CounterContainer;
