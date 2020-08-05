import { BUY_BUSINESS } from "../actionTypes";
import businesses from '../../data/businesses';
import { round } from '../../utils/number';


const initialState = businesses;
const PROFIT_GAIN = 1.3;
const PRICE_GAIN = 1.1;

export default function(state = initialState, action) {
  switch (action.type) {
    case BUY_BUSINESS: {
      const businessId = action.payload.businessId;
      const business = state[businessId];
      const qty = action.payload.qty;
      return {
        ...state,
        [businessId]: {
          ...business,
          quantityPurchased: business.quantityPurchased + qty,
          price: round(business.price * PRICE_GAIN * qty),
          profit: round(business.profit * PROFIT_GAIN * qty),
        }
      };
    }
    default:
      return state;
  }
}
