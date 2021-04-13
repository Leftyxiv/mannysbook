import produce from 'immer';

import { Action } from './../actions/index';
import { ActionType } from './../action-types/index';

interface BundlesState {
  [key: string]: {
    loading: boolean;
    code: string;
    err: string;
  }
}

const initialState: BundlesState = {}

const reducer = produce((state: BundlesState = initialState, action: Action):BundlesState => {
  switch(action.type){
    case ActionType.BUNDLE_START:
      return state;
    case ActionType.BUNDLE_COMPLETE:
      return state;
    default:
      return state
  }
})

export default reducer;