import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { initialWidth } from './initialStyles';

interface Styles {
  width?: number;
  height?: number;
  initialWidth: number;
}

interface Props {
  styles?: Partial<Styles>;
  children?: ReactNode;
}

const Wrapper = styled.div<Styles>`
  transform: ${({ width, initialWidth }) =>
    width ? `scale(${width / initialWidth})` : 'none'};
  transform-origin: top left;
  width: ${({ width }) => (width ? `${width}mm` : `${initialWidth}mm`)};
  height: ${({ width }) =>
    width ? `${width * 1.414}mm` : `${initialWidth * 1.414}mm`};
`;

const ScaleWrapper: (props: Props) => JSX.Element = ({ styles, children }) => {
  return (
    <Wrapper {...styles} initialWidth={initialWidth}>
      {children}
    </Wrapper>
  );
};

export default ScaleWrapper;
