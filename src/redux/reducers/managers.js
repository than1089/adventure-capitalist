import { HIRE_MANAGER } from "../actionTypes";
import managers from '../../data/managers';

const initialState = managers;

export default function(state = initialState, action) {
  switch (action.type) {
    case HIRE_MANAGER: {
      const manager = action.payload.manager;
      manager.hired = true;
      return [
        ...state,
        manager
      ];
    }
    default:
      return state;
  }
}
