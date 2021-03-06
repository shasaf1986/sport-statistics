import { FC } from 'react';
import styled from 'styled-components';

interface backgroundImageProps {
  src: string;
  className?: string;
}

export const BackgroundImage: FC<backgroundImageProps> = ({
  className,
  src,
}) => (
  <Container
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
