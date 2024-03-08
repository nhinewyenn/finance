/** @format */

import styled from 'styled-components';
import { InnerLayout } from '../../styles/Layout';
import AdviceForm from './AdviceForm';

export default function Advice() {
  return (
    <AdviceStyled>
      <InnerLayout>
        <h1>Advice</h1>
        <div className='advice-form'>
          <AdviceForm />
        </div>
      </InnerLayout>
    </AdviceStyled>
  );
}

const AdviceStyled = styled.div``;
