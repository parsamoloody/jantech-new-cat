'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore, AppStore } from './store';
import { Dictionary, initializeDictionary } from './slices/dictionarySlice';

export default function StoreProvider({
  children,
  dictionary,
}: {
  children: React.ReactNode,
  dictionary: Dictionary,
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = makeStore()
    storeRef.current.dispatch(initializeDictionary(dictionary))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}