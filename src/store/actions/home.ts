import { AnyAction } from 'redux';

export const SEARCH = 'SEARCH';
export const CHANGE_SEARCH_RESULT = 'CHANGE_SEARCH_RESULT';

export const searchAction = (songs: Array<object>): AnyAction => ({
  type: CHANGE_SEARCH_RESULT,
  payload: { songs },
});
