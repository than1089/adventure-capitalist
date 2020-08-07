import { getCloseTime } from '../localStorage';

export const processBackgroundCalculating = state => {

  let earning = 0;
  const now = (new Date()).getTime();
  const closeTime = getCloseTime() || now;

  Object.values(state.businesses).forEach(item => {
    // auto running businesses
    if (item.quantityPurchased && item.hasManager && item.lastRun) {
      const elapsedSeconds = Math.floor((now - item.lastRun)/1000);
      const completedTimes = Math.floor(elapsedSeconds/item.timeTaken);
      earning += completedTimes * item.profit;
      // Set new lastRun
      item.lastRun += completedTimes*item.timeTaken*1000;
    }
    if (item.quantityPurchased && item.hasManager && !item.lastRun) {
      item.lastRun = now;
    }

    // businesses that started but not completed when window closing.
    if (item.quantityPurchased && !item.hasManager && item.lastRun 
      && (closeTime - item.lastRun) < item.timeTaken * 1000)  {
      if ((now - item.lastRun) >= item.timeTaken * 1000) {
        earning += item.profit;
      }
    }
    state.businesses[item.id] = item;
  });
  state.balance.amount += earning;
  return state;
}