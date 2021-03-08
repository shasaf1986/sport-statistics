import { FC } from 'react';
import faker from 'faker';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const welcomeMessage = faker.lorem.paragraphs();

export const WelcomePage: FC = () => {
  const history = useHistory();
  const navigateToMatchListPage = () => {
    history.push('/match-list');
  };

  return (
    <>
      <p>{welcomeMessage}</p>
      <Button
        variant="outlined"
        onClick={navigateToMatchListPage}
        color="primary"
      >
        Watch matches
      </Button>
    </>
  );
};
