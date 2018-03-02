export const INPUT_FIAT = 'inputFiat';
export const INPUT_SELL = 'inputSell';
export const INPUT_PURCHASE = 'inputPurchase';
export const CURRENT_INPUT = 'currentInput';

export function getNumber(num){
    return isNaN(num) ? 0 : parseFloat(num);
}