/** @format */

import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function NotFound() {
  return (
    <NotFoundStyled>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p>
        Please check the URL or navigate back to the &nbsp;
        <strong>
          <Link to='/'>home page</Link>.
        </strong>
      </p>
    </NotFoundStyled>
  );
}

const NotFoundStyled = styled.div`
  text-align: center;
  margin: auto;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  h1 {
    color: var(--color-accent);
  }
`;
