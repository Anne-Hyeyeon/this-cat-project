import { ReactNode } from 'react';
import styled from 'styled-components';
import { INITIAL_POSTER_WIDTH } from './initialStyles';

interface Styles {
  width?: number;
  height?: number;
  INITIAL_POSTER_WIDTH: number;
}

interface Props {
  styles?: Partial<Styles>;
  children?: ReactNode;
}

const Wrapper = styled.div<Styles>`
  transform: ${({ width, INITIAL_POSTER_WIDTH }) =>
    width ? `scale(${width / INITIAL_POSTER_WIDTH})` : 'none'};
  transform-origin: top left;
  width: ${({ width }) => (width ? `${width}mm` : `${INITIAL_POSTER_WIDTH}mm`)};
  height: ${({ width }) =>
    width ? `${width * 1.414}mm` : `${INITIAL_POSTER_WIDTH * 1.414}mm`};
`;

const ScaleWrapper: (props: Props) => JSX.Element = ({ styles, children }) => {
  return (
    <Wrapper {...styles} INITIAL_POSTER_WIDTH={INITIAL_POSTER_WIDTH}>
      {children}
    </Wrapper>
  );
};

export default ScaleWrapper;
