/** @format */

import styled from 'styled-components';
import bg from './img/bg.png';
import { MainLayout } from './styles/Layout';
import Orb from './components/Orb/Orb';
import Nav from './components/Nav/Nav';
import { useMemo, useState } from 'react';
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Income/Income';
import Expense from './components/Expense/Expense';
import Advice from './components/Advice/Advice';

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #ffffff;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

function App() {
  const orbMemo = useMemo(() => <Orb />, []);
  const [isActive, setIsActive] = useState(1);

  function displayData() {
    switch (isActive) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expense />;
      case 5:
        return <Advice />;
      default:
        return <Dashboard />;
    }
  }

  return (
    <AppStyled className='App'>
      {orbMemo}
      <MainLayout>
        <Nav active={isActive} setActive={setIsActive} />
        <main>{displayData()}</main>
      </MainLayout>
    </AppStyled>
  );
}

export default App;
