import { BigNumber } from '@ethersproject/bignumber'
import Config from "./config.js";
import {chainData,chainTitle} from "./tradeUI";
const {baseUrl} = Config();
export const getBigNumber=(value)=>{
    return(BigNumber.from(toFixed(value)));
}

export   const toFixed = (_x)=> {
    let x=Math.floor(_x)
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x.toString();
  }
export function truncateAddress(address, isMobile = false){
    if (!address) return "No Account";
    const match = address.match(
      /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/
    );
    if (!match) return address;
    if (isMobile) return `0x…${match[2]}`
    return `${match[1]}…${match[2]}`;
};
  
export const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};


export function timeConverter(timestamp){
  const a = new Date(timestamp * 1000);
  const year = a.getFullYear();
  const month = (a.getMonth() + 1).toString().padStart(2, "0");
  const day = a.getDate().toString().padStart(2, "0");
  const hour = a.getHours().toString().padStart(2, "0");
  const min = a.getMinutes().toString().padStart(2, "0");
  const sec = a.getSeconds().toString().padStart(2, "0");
  const dateObj = `${day}-${month}-${year} - ${hour}:${min}:${sec}`;
  return dateObj;
};

export function numberFormat(num,fixed){
  if(!num || num == '0') return "";

  let numInt = num.toString().split('.')[0];
  let numFloat = num.toString().split('.')[1];

  if(parseInt(numInt) < 1){
      if(numFloat.startsWith('0000000')){
          return parseFloat(num).toFixed(fixed?fixed:9);
      } else {
          return parseFloat(num).toFixed(fixed?fixed:0);
      };
  } else if(parseInt(numInt) >= 1){
      return numInt.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')+
             (numFloat?"."+numFloat.toString().substring(0,fixed?fixed:2):"");
  };
};


export async function changeNetwork(_chainId){
        }