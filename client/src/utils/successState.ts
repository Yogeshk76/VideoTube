import type {Draft} from '@reduxjs/toolkit';

export function setSuccessState<T extends { statusCode?: number; message?: string }>(
  state: Draft<any>, 
  payload: T
) {
  state.loading = false;
  state.statusCode = payload.statusCode ?? null;
  state.message = payload.message ?? null;
  state.error = null;
}