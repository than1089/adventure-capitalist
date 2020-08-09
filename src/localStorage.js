import { processBackgroundCalculating } from './utils/game';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('Capitalist_State');
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
    localStorage.setItem('Capitalist_State', JSON.stringify(state));
  } catch (error) {
    console.warn(error);
  }
}

export const getCloseTime = () => {
  try {
    const time = localStorage.getItem('Capitalist_CloseTime');
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
    localStorage.setItem('Capitalist_CloseTime', (new Date().getTime()));
  } catch (error) {
    console.warn(error);
  }
}