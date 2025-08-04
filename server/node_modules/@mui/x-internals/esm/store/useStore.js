import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/with-selector';
export function useStore(store, selector, a1, a2, a3) {
  const selectorWithArgs = state => selector(state, a1, a2, a3);
  return useSyncExternalStoreWithSelector(store.subscribe, store.getSnapshot, store.getSnapshot, selectorWithArgs);
}