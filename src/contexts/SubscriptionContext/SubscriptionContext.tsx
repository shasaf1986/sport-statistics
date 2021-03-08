import { createContext, FC, useCallback, useMemo, useState } from 'react';
import { getItem, setItem } from '../../utils/storage';

const storageKey = 'subscriptions';
const buildItemPath = (path: string, id: number) => `${path}/${id}`;

interface SubscriptionContextValue {
  getIsSubscribed: (path: string, id: number) => boolean;
  subscribe: (path: string, id: number | number[]) => void;
}

export const SubscriptionContext = createContext<SubscriptionContextValue>({
  getIsSubscribed: () => false,
  subscribe: () => {},
});

export const SubscriptionProvider: FC = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState<Record<string, boolean>>(
    () => getItem(storageKey) || {}
  );

  const getIsSubscribed = useCallback(
    (path: string, id: number) => {
      const itemPath = buildItemPath(path, id);
      return subscriptions[itemPath] === true;
    },
    [subscriptions]
  );

  const subscribe = useCallback(
    (path: string, id: number | number[]) => {
      const ids = Array.isArray(id) ? id : [id];
      const newIds = ids.filter(
        (newId) => getIsSubscribed(path, newId) === false
      );

      if (newIds.length > 0) {
        const storageItem = getItem(storageKey);
        const updatedStorageItem = newIds.reduce((acc, newId) => {
          const itemPath = buildItemPath(path, newId);
          return {
            ...acc,
            [itemPath]: true,
          };
        }, storageItem);

        setItem(storageKey, updatedStorageItem);
        setSubscriptions(updatedStorageItem);
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
