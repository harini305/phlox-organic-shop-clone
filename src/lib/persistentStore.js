"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny external store mirrored to localStorage. Components read it with
 * `usePersistentStore(store)`; the server (and the hydration pass) always see
 * `initial`, so markup never mismatches, and stored data appears right after.
 * Changes made in another tab are picked up through the `storage` event.
 */
export function createPersistentStore(key, initial) {
  let state = initial;
  let loaded = false;
  const listeners = new Set();

  function load() {
    if (loaded || typeof window === "undefined") return;
    loaded = true;
    try {
      const raw = window.localStorage.getItem(key);
      if (raw != null) state = JSON.parse(raw);
    } catch {
      // Private mode / blocked storage: keep the in-memory value.
    }
  }

  function emit() {
    listeners.forEach((listener) => listener());
  }

  function set(updater) {
    load();
    state = typeof updater === "function" ? updater(state) : updater;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Ignore quota / privacy errors; state still lives in memory.
    }
    emit();
  }

  function subscribe(listener) {
    listeners.add(listener);
    const onStorage = (e) => {
      if (e.key !== key) return;
      try {
        state = e.newValue == null ? initial : JSON.parse(e.newValue);
      } catch {
        state = initial;
      }
      emit();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  return {
    subscribe,
    getSnapshot: () => {
      load();
      return state;
    },
    getServerSnapshot: () => initial,
    set,
  };
}

export function usePersistentStore(store) {
  return useSyncExternalStore(store.subscribe, store.getSnapshot, store.getServerSnapshot);
}

const noopSubscribe = () => () => {};

/**
 * False during server rendering and hydration, true afterwards. Pages that
 * depend on stored state use it to avoid flashing their empty state.
 */
export function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
