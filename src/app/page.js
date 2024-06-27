import Login from "./login/page"
import MainPage from "./mainpage/page"
/*
MobX의 주요 개념
1. Observable State ( 관찰 가능한 상태)
  - MobX 에서 상태를 Observable 이라고 한다.
  - Observable 상태가 변하면  자동으로 관련 컴포넌트이 업데이트 됨
  
2. Computed Values ( 계산된 값)
  - 다른 observable 상태로 부터 파생된 값을 계산 
  - 즉 Computed 값은 종속된 상태가 변경될 때 마다 
       다시 계산 된다. 

3. Reactions(반응)
   - reaction, autorun, when 과 같은 반응 함수는 상태가 변경 될 때
     자동으로 수행하도록 한다.
     주로  사이드 이펙트를 처리할 때 사용된다.

4. Action (액션)
   - 상태를 변경하는 함수 
   - MobX에서는 상태를 직접 변경하는 대신 'action'을 사용하여
     상태 변경을 추적하고 관리 한다.
 */
 // 1. 설치 : npm install mobx mobx-react-lite
 // 2. Store 생성        : src/stores/MenuStore.js
 // 3. StoreContext 생성 : src/stores/StoreContext.js 
export default function Home() {
  return <Login />
}
