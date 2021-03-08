import { FC } from 'react';
import styled from 'styled-components';
import {
  ListItem as MuiListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
} from '@material-ui/core';
import { BackgroundImage } from '../BackgroundImage';

const Container = styled(MuiListItem).attrs({
  button: false as true,
})({
  textAlign: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
});

const StyledListItemText = styled(ListItemText)({
  flex: 'none',
});

const StyledBackgroundImage = styled(BackgroundImage)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundSize: 'cover',
  backgroundPosition: 'top',
});

const StyledAvatar = styled(Avatar)({
  margin: 'auto',
});

export interface ListItemProps {
  description: string;
  value: string;
  image?: string;
}

export const ListItem: FC<ListItemProps> = ({ description, value, image }) => (
  <Container>
    <StyledListItemText primary={description} secondary={value} />
    {image && (
      <ListItemAvatar>
        <StyledAvatar>
          <StyledBackgroundImage src={image} />
        </StyledAvatar>
      </ListItemAvatar>
    )}
  </Container>
);
