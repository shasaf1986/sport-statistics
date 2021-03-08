import { useCallback, useMemo, useState } from 'react';
import { BaseEntity, SelectionState } from '../types';

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

export const useSelectionItems = <T extends BaseEntity>(
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
    setSelectedIdsMap((prevSelectedIdsMap) => {
      const newSelectedIdsMap = { ...prevSelectedIdsMap };
      if (newSelectedIdsMap[id]) {
        delete newSelectedIdsMap[id];
      } else {
        newSelectedIdsMap[id] = true;
      }
      return newSelectedIdsMap;
    });
  }, []);

  const togglePartialList = useCallback(() => {
    const shouldAdd = partialState !== 'selected';

    setSelectedIdsMap((prevSelectedIdsMap) => {
      const newSelectedIdsMap = { ...prevSelectedIdsMap };
      partialList.forEach(({ id }) => {
        if (shouldAdd) {
          newSelectedIdsMap[id] = true;
        } else {
          delete newSelectedIdsMap[id];
        }
      });
      return newSelectedIdsMap;
    });
  }, [partialState, partialList]);

  const toggleList = useCallback(() => {
    const shouldAdd = state !== 'selected';

    setSelectedIdsMap((prevSelectedIdsMap) => {
      if (shouldAdd) {
        const newSelectedIdsMap = { ...prevSelectedIdsMap };
        list.forEach(({ id }) => {
          newSelectedIdsMap[id] = true;
        });
        return newSelectedIdsMap;
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
