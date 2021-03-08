import { createContext, FC, useCallback, useMemo, useState } from 'react';
import { getItem, setItem } from '../../utils/storage';

const storageKey = 'subscriptions';
const buildItemPath = (path: string, id: string | number) => `${path}/${id}`;

interface SubscriptionContextValue {
  getIsSubscribed: (path: string, id: string) => boolean;
  subscribe: (path: string, id: string) => void;
}

export const SubscriptionContext = createContext<SubscriptionContextValue>({
  getIsSubscribed: () => false,
  subscribe: () => {},
});

export const SubscriptionProvider: FC = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Record<string, boolean>>(
    () => getItem(storageKey) || {}
  );
  console.log(subscriptions);

  const getIsSubscribed = useCallback(
    (path: string, id: string) => {
      const itemPath = buildItemPath(path, id);
      return subscriptions[itemPath] === true;
    },
    [subscriptions]
  );

  const subscribe = useCallback(
    (path: string, id: string) => {
      const isSubscribed = getIsSubscribed(path, id);
      if (!isSubscribed) {
        const itemPath = buildItemPath(path, id);
        const newSubscriptions = {
          ...getItem(storageKey),
          [itemPath]: true,
        };
        setItem(storageKey, newSubscriptions);
        setSubscriptions(newSubscriptions);
      }
    },
    [getIsSubscribed]
  );

  const contextValue = useMemo(
    () => ({
      getIsSubscribed,
      subscribe,
    }),
    [getIsSubscribed, subscribe]
  );

  return (
    <SubscriptionContext.Provider value={contextValue}>
      {children}
    </SubscriptionContext.Provider>
  );
};
