import React from "react";
import styled, { keyframes } from "styled-components";

interface BallsAnimationProps {
  countBalls?: number,
  size: number,
  frontColor: string,
  backColor: string,
}

const impulse = (props: BallsAnimationProps) => keyframes`
  0% {
    background: ${props.backColor};
    transform: scale(1);
    animation-timing-function: cubic-bezier(1,0,0.7,1);
  }
  40% {
    background: ${props.frontColor};
    transform: scale(1.5);
    animation-timing-function: cubic-bezier(0.3,0,0,1);
  }
  72.5% {
    background:${props.backColor};
    transform: scale(1);
    animation-timing-function: linear;
  }
  100% {
    background: ${props.backColor};
    transform: scale(1);
  }
`;



const getBalls = ({ countBalls, frontColor, backColor, size }: BallsAnimationProps) => {
  const balls = [];
  for (let i = 0; i < countBalls!; i++) {
    balls.push(
      <Ball
        frontColor={frontColor}
        backColor={backColor}
        size={size}
        x={i * (size / 5 + size / 5)}
        y={0}
        key={i.toString()}
        index={i}
      />,
    );
  }
  return balls;
};

export const ImpulseSpinner = ({
  size = 40,
  frontColor = "#3300CC",
  backColor = "#E8E9ED"
}) => {
  const countBalls = 3;

  return (
    <Container>
      <Wrapper size={size}>
        {getBalls({
          countBalls,
          frontColor,
          backColor,
          size
        })}
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled.div<{ size: number }>`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: ${props => `${props.size}px`};
  height: ${props => `${props.size / 5}px`};
`;

interface ExpandedAnimProps extends BallsAnimationProps{
  x: number,
  y: number,
  index: number
}

const Ball = styled.div<ExpandedAnimProps>`
  position: absolute;
  top: ${props => `${props.y}px`};
  left: ${props => `${props.x}px`};
  width: ${props => `${props.size / 5}px`};
  height: ${props => `${props.size / 5}px`};
  border-radius: 50%;
  background-color: ${props => props.frontColor};
  animation: ${impulse} 1.25s linear infinite;
  animation-delay: ${props => props.index * 0.125}s;
`;

export default ImpulseSpinner;
