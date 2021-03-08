import { useCallback, useMemo, useState } from 'react';
import { SelectionState } from '../types';

interface BasicList {
  id: number;
}

const getSelectionState = (
  currentLength: number,
  totalLength: number
): SelectionState => {
  if (currentLength === 0) {
    return 'unselected';
  }
  if (currentLength === totalLength) {
    return 'selected';
  }
  return 'indeterminate';
};

export const useSelectionItems = <T extends BasicList>(
  list: T[],
  partialList: T[] = []
) => {
  const [selectedIdsMap, setSelectedIdsMap] = useState<
    Record<string, boolean | undefined>
  >({});
  const selectedIds = useMemo(
    () => Object.keys(selectedIdsMap).map((id) => +id),
    [selectedIdsMap]
  );
  const partialSelectedIds = useMemo(
    () => partialList.filter(({ id }) => selectedIdsMap[id] === true),
    [partialList, selectedIdsMap]
  );

  const state = getSelectionState(selectedIds.length, list.length);
  const partialState = getSelectionState(
    partialSelectedIds.length,
    partialList.length
  );

  const toggle = useCallback((id: number) => {
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

  const togglePartialList = useCallback(() => {
    const shouldAdd = partialState === 'unselected';

    setSelectedIdsMap((prev) => {
      const newPrev = { ...prev };
      partialList.forEach(({ id }) => {
        if (shouldAdd) {
          newPrev[id] = true;
        } else {
          delete newPrev[id];
        }
      });
      return newPrev;
    });
  }, [partialState, partialList]);

  const toggleList = useCallback(() => {
    const shouldAdd = state === 'unselected';

    setSelectedIdsMap((prev) => {
      if (shouldAdd) {
        const newPrev = { ...prev };
        list.forEach(({ id }) => {
          newPrev[id] = true;
        });
        return newPrev;
      }
      return {};
    });
  }, [list, state]);

  const reset = useCallback(() => {
    setSelectedIdsMap({});
  }, []);

  const getIsSelected = useCallback(
    (id: number) => selectedIdsMap[id] === true,
    [selectedIdsMap]
  );

  return useMemo(
    () => ({
      selectedIds,
      toggleList,
      togglePartialList,
      toggle,
      state,
      partialState,
      reset,
      getIsSelected,
    }),
    [
      getIsSelected,
      partialState,
      reset,
      selectedIds,
      state,
      toggle,
      toggleList,
      togglePartialList,
    ]
  );
};
