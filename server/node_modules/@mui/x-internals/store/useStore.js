"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStore = useStore;
var _withSelector = require("use-sync-external-store/with-selector");
function useStore(store, selector, a1, a2, a3) {
  const selectorWithArgs = state => selector(state, a1, a2, a3);
  return (0, _withSelector.useSyncExternalStoreWithSelector)(store.subscribe, store.getSnapshot, store.getSnapshot, selectorWithArgs);
}