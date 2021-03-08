import { Routes } from './routes';
import { Container } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

export default function BasicTable() {
  return (
    <SubscriptionProvider>
      <Container>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Container>
    </SubscriptionProvider>
  );
}
