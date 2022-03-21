import React from 'react';
import styled from 'styled-components';

const Container = styled.section``;

const ManaulSectionHeading = styled.h1`
  font-size: 38px;
  font-weight: 300;
`;

const StyledDl = styled.dl`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-row-gap: 2em;
  grid-column-gap: 1em;
  padding: 10px 80px;
`;

interface ManualSectionProps {
  heading: string;
  children: React.ReactChild | React.ReactChild[];
}

export default function ManualSection({ heading, children }: ManualSectionProps) {
  if (!children || (children instanceof Array && children.length === 0)) {
    return null;
  }

  return (
    <Container>
      <ManaulSectionHeading>{heading}</ManaulSectionHeading>
      <StyledDl>{children}</StyledDl>
    </Container>
  );
}
