import { Routes } from './routes';
import { Layout } from './components/Layout';
import { BrowserRouter } from 'react-router-dom';
import { SubscriptionProvider } from './contexts/SubscriptionContext';

export default function BasicTable() {
  return (
    <SubscriptionProvider>
      <BrowserRouter>
        <Routes layout={Layout} />
      </BrowserRouter>
    </SubscriptionProvider>
  );
}
