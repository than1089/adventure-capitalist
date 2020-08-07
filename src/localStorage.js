import { processBackgroundCalculating } from './utils/game';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('AC_State');
    if (serializedState === null) {
      return undefined;
    }
    return processBackgroundCalculating(JSON.parse(serializedState));
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    localStorage.setItem('AC_State', JSON.stringify(state));
  } catch (error) {
    console.warn(error);
  }
}

export const getCloseTime = () => {
  try {
    const time = localStorage.getItem('AC_CloseTime');
    if (time === null) {
      return undefined;
    }
    return Number(time);
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

export const saveCloseTime = () => {
  try {
    localStorage.setItem('AC_CloseTime', (new Date().getTime()));
  } catch (error) {
    console.warn(error);
  }
}