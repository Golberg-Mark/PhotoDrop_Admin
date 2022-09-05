import React from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode,
  display?: 'flex' | 'block',
  padding?: string
}

const PageWrapper: React.FC<Props> = ({
  display = 'block',
  padding = '40px 120px 0px',
  children
}) => {
  return (
    <Container
      display={display}
      padding={padding}
    >
      {children}
    </Container>
  );
};

const Container = styled.section<{ padding: string, display: 'flex' | 'block' }>`
  display: ${({ display }) => display};
  flex-direction: column;
  grid-gap: 10px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  padding: ${({ padding }) => padding};
  width: 100%;
  height: 100%;
`;

export default PageWrapper;
