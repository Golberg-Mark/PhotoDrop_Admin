import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode,
  display?: 'flex' | 'block'
}

const PageWrapper: React.FC<Props> = ({
  display = 'block',
  children
}) => {
  return (
    <Container
      display={display}
    >
      {children}
    </Container>
  );
};

const Container = styled.section<{ display: 'flex' | 'block' }>`
  display: ${({ display }) => display};
  flex-direction: column;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: 40px 15px 0;
  width: 100%;
  height: 100%;
  
  @media (min-width: 768px) {
    padding: 40px 120px 0;
  }
`;

export default PageWrapper;
