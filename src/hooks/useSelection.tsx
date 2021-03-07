import { useCallback, useMemo, useState } from 'react';

interface BasicList {
  id: string | number;
}
type SelectionState = 'all' | 'none' | 'partial';

export const useSelectionItems = <T extends BasicList>(
  list: T[],
  partialList: T[] = []
) => {
  const [selectedIdsMap, setSelectedIdsMap] = useState<
    Record<string, boolean | undefined>
  >({});
  const selectedIds = useMemo(() => Object.keys(selectedIdsMap), [
    selectedIdsMap,
  ]);
  const state: SelectionState =
    selectedIds.length === 0
      ? 'none'
      : selectedIds.length === list.length
      ? 'all'
      : 'partial';
  const partialState: SelectionState = useMemo(() => {
    const partialListSelected = partialList.filter(
      ({ id }) => selectedIdsMap[id] === true
    );
    return partialListSelected.length === 0
      ? 'none'
      : partialList.length === partialListSelected.length
      ? 'all'
      : 'none';
  }, [partialList, selectedIdsMap]);

  const toggleId = useCallback((id: string) => {
    setSelectedIdsMap((prev) => {
      const newPrev = { ...prev };
      if (newPrev[id]) {
        delete newPrev[id];
      } else {
        newPrev[id] = true;
      }
      return newPrev;
    });
  }, []);

  const toggleSelectAll = () => {
    if (state === 'none') {
      setSelectedIdsMap(
        list.reduce((acc, { id }) => {
          acc[id] = true;
          return acc;
        }, {} as any)
      );
    } else {
      setSelectedIdsMap(() => ({}));
    }
  };
  const toggleSelectAllPartial = () => {
    const ids = partialList.map(({ id }) => id);
    const shouldAdd = partialState === 'none';
    setSelectedIdsMap((prev) =>
      ids.reduce(
        (acc, id) => {
          if (shouldAdd) {
            acc[id] = true;
          } else {
            delete acc[id];
          }
          return acc;
        },
        { ...prev }
      )
    );
  };

  return {
    state,
    toggleId,
    selectedIds,
    selectedIdsMap,
    toggleSelectAll,
    partialState,
    toggleSelectAllPartial,
  };
};
