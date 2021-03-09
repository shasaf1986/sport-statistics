import { FC } from 'react';
import styled from 'styled-components';

interface ImageProps {
  src: string;
  className?: string;
  onClick?: () => void;
}

export const Image: FC<ImageProps> = ({ className, src, onClick }) => (
  <Container
    onClick={onClick}
    style={{
      backgroundImage: `url('${src}')`,
    }}
    className={className}
  />
);

const Container = styled.div({
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
});
