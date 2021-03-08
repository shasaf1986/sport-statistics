import { FC } from 'react';
import styled from 'styled-components';

interface backgroundImageProps {
  src: string;
  className?: string;
  onClick?: () => void;
}

export const BackgroundImage: FC<backgroundImageProps> = ({
  className,
  src,
  onClick,
}) => (
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
