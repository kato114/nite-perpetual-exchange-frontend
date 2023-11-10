import React from 'react';
import * as ethers from 'ethers';
import {LightweightChart} from '../../components/chart';
import {tokenInfo, tokenMenu1, tokenMenu2} from '../../components/tokens';
import {toFixed,getBigNumber,timeConverter, numberFormat, truncateAddress} from "../../components/utils";
import {recenttx,change, pairListData} from '../../api'
import {io} from 'socket.io-client';
import Config from '../../components/config'
import {Helmet} from "react-helmet";
import {chainData,EXPLORER_LIST,INTEREST_PRECISION,USDT_PRECISION_OMNICHAIN,MAXLIQ,BSCRPCURL,TOKENCONVERTOR,MARKET_ADDRESS_LIST,LIMIT_ADDRESS_LIST,USDT_PRECISION,USDT_ADDRESS,USDT_ADDRESS_LIST,EXECUTOR_FEE,TRADING_FEE,TIDEPOSITION_ADDRESS,TRADING_ADDRESS_LIST,
    STAKE_ADDRESS,STORAGE_ADDRESS,COLLRATERAL_MIN,COLLRATERAL_MAX,
    MARKET_ADDRESS,LIMIT_ADDRESS,ZEROLAYER_ENDPOINT_LIST,ZEROLAYER_CHAINID_LIST, TOKEN_ADDRESS_LIST, tokenForPair, tokenAddressForPair, EXCHANGE_ADDRESS} from "../../components/tradeUI.js";
import {TRADING_ABI} from "../../abi/TRADING";
import {STORAGE_ABI} from "../../abi/STORAGE";
import {STAKE_ABI} from "../../abi/STAKE";
import {MARKET_ABI} from "../../abi/MARKET";
import {LIMIT_ABI} from "../../abi/LIMIT";
import {ERC20_ABI} from "../../abi/ERC20";
import {ZERO_ABI} from "../../abi/ZERO";
import {EXCHANGE_ABI} from "../../abi/EXCHANGE";
import { Contract } from '@ethersproject/contracts'
import Web3 from 'web3';
import { toast } from 'react-toastify';
import TradeHeader from "../../components/TradeHeader";
import TradeCenter from "../../components/TradeCenter";
import TradeBottom from "../../components/TradeBottom";
import TradeRight from "../../components/TradeRight";
import "./trade.css";
import TradeConfirm from "../../modals/TradeConfirm"
import TradeCompleted from "../../modals/Completed"

const {sock} = Config();
const SOCKET = sock.local;
let socket = io(SOCKET, {
    autoConnect: false
});

const reNumber = /^[0-9\b\.]+$/;
class Trade extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            timer:null,
            dropdown: false,
            token: '0x965cAac30aFE710aB1119072ED9E25a49B0a5231',
            pairName: 'ETHUSD',
            pairIndex:"0",
            decimals: 18,
            pairInterest:0,
            pairBorrow:0,
            base0: false,
            stable: false,
            input: '',
            tokens: [],
            charttype:0,
            price:'0.00',
            entryprice:'0.00',
            lastEntryprice:'0.00',
            openPrice:'',
            high: '0.00',
            low: '0.00',
            change: '0.00',
            change_amount:'0.00',
            volume:'0.00',
            volume_quote:'0.00',
            past: '0.00',
            close: '0.00',
            supply: '0.00',
            marketcap: '0.00',
            upprice:true,
            menu: '',
            swap: '',
            isLoaded: false,
            changeLoaded: false,
            list: '',
            swapOption: 0,
            swapType: 0,
            fromAmount: '',
            toAmount: '',
            tokenMenu1: false,
            tokenMenu2: false,
            bottomOption: 1,
            fromSymbol: 'ETH',
            toSymbol: 'USDT',
            selectPay:true,
            fromBase: true,
            bscdecimals:2,
            fromAddress: '0x965cAac30aFE710aB1119072ED9E25a49B0a5231',
            fromDecimals: 18,
            toAddress: '0x6256976040B06BE5652d02Ce1F8956145CF08Cc8',
            toDecimals:18,
            fromSymbolSwap: 'ETH',
            toSymbolSwap: 'USDT',
            fromAmountSwap:'',
            toAmountSwap:'',
            openPriceSwap:'',
            slider: 20,
            sliderLabel: 0,
            sliderState: 0,
            slippage:0.3,
            errorMessage:"",
            txs:[],
            actions:0,
            futureBalace:'',
            fromBalanceSwap:'',
            toBalanceSwap:'',
            showTradingview:true,
            aniLowPrice:0,
            aniHighPrice:0,
            aniOldPrice:0,
            aniCurPrice:0,
            isOpenTradeConfirm:false,
            isOpenTradeCompleted:false,
            visitUrl:"",
            completedFromAmount:0.0,
            quotoType: 'ETH',
            quotePrices: {
                eth: 1000,
                btc: 100000,
                xrp: 100.2,
                pepe: 23.234
            }
        };
        this.handleTradingview = this.handleTradingview.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.handleToken = this.handleToken.bind(this);
        this.setToken = this.setToken.bind(this);
        this.search = React.createRef();
        this.searchButton = React.createRef();
        this.token2area = React.createRef();
        this.handleClickOutside = this.handleClickOutside.bind(this);
        this.handleSocket = this.handleSocket.bind(this);
        this.chartLoaded = this.chartLoaded.bind(this);
        this.getTokenListData = this.getTokenListData.bind(this);
        this.extraListInfo = this.extraListInfo.bind(this);
        this.handleSwapOptions = this.handleSwapOptions.bind(this);
        this.handleSwapType = this.handleSwapType.bind(this);
        this.handleChartType = this.handleChartType.bind(this);
        this.handleTokenMenu1 = this.handleTokenMenu1.bind(this);
        this.handleTokenMenu2 = this.handleTokenMenu2.bind(this);
        this.handleFromAmount = this.handleFromAmount.bind(this);
        this.handleToAmount = this.handleToAmount.bind(this);
        this.handleFromAmountSwap = this.handleFromAmountSwap.bind(this);
        this.handleToAmountSwap = this.handleToAmountSwap.bind(this);
        this.handleOpenPrice = this.handleOpenPrice.bind(this);
        this.handleOpenPriceSwap = this.handleOpenPriceSwap.bind(this);
        this.swapTokenMenu1 = this.swapTokenMenu1.bind(this);
        this.swapTokenMenu2 = this.swapTokenMenu2.bind(this);
        this.slippageBox = this.slippageBox.bind(this);
        this.handleSlider = this.handleSlider.bind(this);
        this.handleSwitch = this.handleSwitch.bind(this);
        this.handleSlippage = this.handleSlippage.bind(this);
        this.handleOpenPosition = this.handleOpenPosition.bind(this);
        this.getToAmount = this.getToAmount.bind(this);
        this.getFromAmount = this.getFromAmount.bind(this);
        this.processAmount = this.processAmount.bind(this);
        this.handleSwap = this.handleSwap.bind(this);
        this.setSwapToken = this.setSwapToken.bind(this);
        this.updateBalances = this.updateBalances.bind(this);
        this.setMaxFrom = this.setMaxFrom.bind(this);
        this.setMaxTo = this.setMaxTo.bind(this);
        this.updateToAmount = this.updateToAmount.bind(this);
        this.aniPrice = this.aniPrice.bind(this);
        this.setIsOpenTradeConfirm = this.setIsOpenTradeConfirm.bind(this);
        this.setIsOpenTradeCompleted = this.setIsOpenTradeCompleted.bind(this);
        this.confirmTrade = this.confirmTrade.bind(this);
        this.changeQuoteType = this.changeQuoteType.bind(this);
    };
    
    setIsOpenTradeCompleted(status){
        this.setState({
            isOpenTradeCompleted:status
        })
    }
    setIsOpenTradeConfirm(status){
        this.setState({
            isOpenTradeConfirm:status
        })
    }
    aniPrice(){
        if(this.state.aniLowPrice==0) return;
        const rand =  Number(this.state.close) + (Math.random() * 40-20)*(1/Math.pow(10,this.state.bscdecimals));
        if(this.state.pairName === "PEPEUSD"){
            this.setState({
                aniOldPrice:this.state.aniCurPrice,
                aniCurPrice:this.state.aniCurPrice
            })
        }else{
            this.setState({
                aniOldPrice:this.state.aniCurPrice,
                aniCurPrice:rand
            })
        }
    }
    handleTradingview(){
        let state = this.state.showTradingview;
        this.setState({showTradingview:!(state)})
    }
    setMaxFrom(){
        if(Number(this.state.fromBalanceSwap)>0){
            this.setState({
                fromAmountSwap:this.state.fromBalanceSwap*(1-TRADING_FEE)
            },()=>{
                this.processAmount(1);
            })
        }
    }
    setMaxTo(){
        if(Number(this.state.toBalanceSwap)>0){
            this.setState({
                toAmountSwap:this.state.toBalanceSwap*(1-TRADING_FEE)
            },()=>{
                this.processAmount(0);
            })
        }
    }
    setSwapToken(tokenInfo){
        this.setState({
            tokenMenu2: false,
        })
        if(this.state.selectPay){
            this.setState({
                fromAddress: tokenInfo.tideaddress,
                fromDecimals: tokenInfo.decimals,
                fromSymbolSwap: tokenInfo.symbol,
                fromAmountSwap:''
            }, ()=>{
            this.processAmount(1);
            });
        }else{
            this.setState({
                toAddress: tokenInfo.tideaddress,
                toDecimals: tokenInfo.decimals,
                toSymbolSwap: tokenInfo.symbol,
                toAmountSwap:''
            },()=>{
                this.processAmount(0);
            });
        }
    }
    handleSocket(){
        socket = io(SOCKET, {
            autoConnect: false
        });
        socket.connect();
        socket.on("connect", ()=>{
            socket.emit("pair", {'pairAddress': this.state.pairIndex});
            socket.on('change', (data)=>{
                const {isLoaded, changeLoaded} = this.state;
                const {conversionRate,pairIndex,priceChange,priceChangePercent,quotePrices} = data;
                this.setState({
                    quotePrices:{
                        eth: Number(quotePrices[0]),
                        btc: Number(quotePrices[1]),
                        xrp: Number(quotePrices[2]),
                        pepe: Number(quotePrices[3]),
                    }
                })
                const past = parseFloat(this.state.past);
                const current = parseFloat(conversionRate);
                const positive = current > past ? true : false;
                const percDiff = (100 * Math.abs((past - current) / ((past+current)/2))).toFixed(2);
                const change = positive ? `+${percDiff}%` : `-${percDiff}%`;
                const newLow = conversionRate < this.state.low ? conversionRate : this.state.low;
                const newHigh = conversionRate > this.state.high ? conversionRate : this.state.high;
                const price = conversionRate;
                const mcap = this.state.supply * conversionRate;
                const change_amount=current-past;
                if(isLoaded && changeLoaded){
                    if(Number(this.state.pairIndex)==Number(pairIndex)){
                        if(Number(price)!=Number(this.state.past)){
                            this.setState({
                                aniLowPrice:Math.min(Number(this.state.past),Number(price)),
                                aniHighPrice:Math.max(Number(this.state.past),Number(price))
                            })
                        }
                        this.setState({
                            high: newHigh,
                            low: newLow,
                            marketcap: mcap,
                            change: priceChangePercent,
                            change_amount:priceChange,
                            price: price,
                            swap: data,
                            close: price,
                            upprice:current>past,
                            past:price
                        });
                        if(this.state.swapType==0){
                            this.setState({
                                entryprice:price
                            })
                        }

                    }
                };
            });
            socket.on('tx', (data)=>{
                const {isLoaded, changeLoaded} = this.state;
                const {pairIndex,blockNumber,timestamp,type,txHash,baseAmount,quoteAmount,conversionRate} = data;
                let txs = this.state.txs;
                txs.push({pairIndex,blockNumber,timestamp,type,txHash,baseAmount,quoteAmount,conversionRate});
                if(txs.length>7) txs.shift();
                if(isLoaded && changeLoaded){
                    this.setState({
                        txs: txs
                    });
                };
            });
        });
    };
    setErrorMessage(messge){
        this.setState({errorMessage:messge});
        setTimeout(()=>{this.setState({errorMessage:""});},5000)
    }
    async updateBalances(){
        if(!(this.props.active)){
            this.setState({
                futureBalace:'',
                fromBalanceSwap:'',
                toBalanceSwap:''
            });
        }else{
            try{
                const web3 = new Web3(Web3.givenProvider || chainData[this.props.selectedChainId].rpcUrls[0]);
                const account = (await web3.eth.getAccounts())[0];
                let _balance = 0;
                if(this.state.quotoType === 'ETH'){
                    _balance = await web3.eth.getBalance(account)
                }else{
                    const tokenContract  = new web3.eth.Contract(ERC20_ABI,TOKEN_ADDRESS_LIST[this.state.quotoType]);
                    _balance = await tokenContract.methods.balanceOf(account).call({from:account});
                }
                const futureBalace = ethers.utils.formatUnits(
                    _balance,
                    this.props.selectedChainId==97?USDT_PRECISION:USDT_PRECISION_OMNICHAIN);
                this.setState({
                    futureBalace
                });
            }catch(e){
                toast.error("Please connect wallet",{
                icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>
                });
            }
        }
    }
    async handleSwap(){
        const orderType = this.state.swapType;
        const web3 = new Web3(Web3.givenProvider || chainData[this.props.selectedChainId].rpcUrls[0]);
        const slippageP = parseInt(this.state.slippage*10);
        const account = (await web3.eth.getAccounts())[0];
        const payContract  = new web3.eth.Contract(ERC20_ABI,TOKENCONVERTOR[this.state.fromAddress][this.props.selectedChainId]);
        const marketContract  = new web3.eth.Contract(MARKET_ABI,MARKET_ADDRESS_LIST[this.props.selectedChainId]);
        const limitContract  = new web3.eth.Contract(LIMIT_ABI,LIMIT_ADDRESS_LIST[this.props.selectedChainId]);
        const amountIn = ethers.utils.parseUnits(
                      this.state.fromAmountSwap,
                      this.state.fromDecimals
                    );
        let path = [];
        if(this.state.fromAddress.toLowerCase()!=USDT_ADDRESS.toLowerCase() && this.state.toAddress.toLowerCase()!=USDT_ADDRESS.toLowerCase()){
            path = [
                TOKENCONVERTOR[this.state.fromAddress][this.props.selectedChainId],
                TOKENCONVERTOR[USDT_ADDRESS][this.props.selectedChainId],
                TOKENCONVERTOR[this.state.toAddress][this.props.selectedChainId]
                ];
        }else{
            path = [
                TOKENCONVERTOR[this.state.fromAddress][this.props.selectedChainId],
                TOKENCONVERTOR[this.state.toAddress][this.props.selectedChainId]
                ];
        }
        const value = getBigNumber(orderType==0?0:EXECUTOR_FEE);
        if(orderType==0){//market

            let approveResult = await payContract.methods.allowance(account,MARKET_ADDRESS_LIST[this.props.selectedChainId]).call();
            approveResult = getBigNumber(approveResult);
            if(approveResult.lt(amountIn)){
              const rt = payContract.methods.approve(MARKET_ADDRESS_LIST[this.props.selectedChainId], getBigNumber(Math.pow(2,255))).send({from:account});
              await toast.promise(
                    rt,
                    {
                      pending: 'Get approve to send coins.',
                      success: {
                        render(){
                            return 'Got approve.'
                        },
                        icon:({theme, type}) =>  <img src="/assets/image/icon/ic-success.svg"/>,
                      },
                      error: {
                        render(){
                            return 'Rejected approve'
                        },
                        icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>,
                      }
                    }
                )
            }
            const amounts = await marketContract.methods.getAmountsOut(amountIn,path).call();
            const slippageP = parseInt(this.state.slippage*10);
            let amountOut = getBigNumber(amounts[amounts.length-1]).mul(1000-slippageP).div(1000);
            const toBlock = await web3.eth.getBlockNumber();
            const deadline = (await web3.eth.getBlock(toBlock)).timestamp+3600;
            
            try{
                const gas = await marketContract.methods.swapExactTokensForTokens(
                    amountIn,
                    0,
                    path,
                    account,
                    deadline
                    ).estimateGas({
                    from:account
                });
                
                const rt = marketContract.methods.swapExactTokensForTokens(
                    amountIn,
                    0,
                    path,
                    account,
                    deadline
                    ).send({
                    from:account,
                    gas
                });
                await toast.promise(
                    rt,
                    {
                      pending: 'Swapping.',
                      success: {
                        render(){
                            return 'Transaction completed.'
                        },
                        icon:({theme, type}) =>  <img src="/assets/image/icon/ic-success.svg"/>,
                      },
                      error: {
                        render(){
                            return 'Rejected swapping'
                        },
                        icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>,
                      }
                    }
                )
                this.setState({fromAmountSwap:0,toAmountSwap:0});
            }catch(error){
                if(error.__proto__.name === "Error"){ 
                    const start = error.message.indexOf("{");
                    const end = error.message.indexOf("}");
                    if(start>=0 && end>=0) {
                        error = JSON.parse(error.message.substring(start, end + 1));
                        this.setErrorMessage(error.message)
                    }
                }
                console.log({error})
            }
        }else{//limit
            let approveResult = await payContract.methods.allowance(account,LIMIT_ADDRESS_LIST[this.props.selectedChainId]).call();
            approveResult = getBigNumber(approveResult);
            if(approveResult.lt(amountIn)){
              const rt = await payContract.methods.approve(LIMIT_ADDRESS_LIST[this.props.selectedChainId], getBigNumber(Math.pow(2,255))).send({from:account});
            }
            const orderTypeLimit = getBigNumber(2);
            const assetIn = TOKENCONVERTOR[this.state.fromAddress][this.props.selectedChainId];
            const assetOut = TOKENCONVERTOR[this.state.toAddress][this.props.selectedChainId];
            const assetInOffered = ethers.utils.parseUnits(
                      this.state.fromAmountSwap.toString(),
                      this.state.fromDecimals
                    );
            const assetOutExpected = ethers.utils.parseUnits(
                      this.state.toAmountSwap.toString(),
                      this.state.toDecimals
                    );
            const executeFee = getBigNumber(EXECUTOR_FEE);
            try{
                const gas = await limitContract.methods.createOrder(
                        orderTypeLimit,
                        assetIn,
                        assetOut,
                        assetInOffered,
                        assetOutExpected,
                        path,
                        executeFee
                    ).estimateGas({
                        from:account,
                        value:value
                    });
                const rt =  limitContract.methods.createOrder(
                        orderTypeLimit,
                        assetIn,
                        assetOut,
                        assetInOffered,
                        assetOutExpected,
                        path,
                        executeFee                    
                    ).send({
                    from:account,
                    value:value.toString(),
                    gas
                });
                await toast.promise(
                    rt,
                    {
                      pending: 'Swapping.',
                      success: 'Transaction completed.',
                      error: 'Rejected swapping'
                    }
                )
                setTimeout(()=>{
                    this.setState({fromAmountSwap:0,toAmountSwap:0,openPriceSwap:0,actions:this.state.actions+1});    
                },3000);
                
            }catch(error){
                console.log({error});
                if(error.__proto__.name === "Error"){
                    const start = error.message.indexOf("{");
                    const end = error.message.indexOf("}");
                    console.log(error.message.substring(start, end + 1))
                    if(start>=0 && end>=0) {
                        error = JSON.parse(error.message.substring(start, end + 1));
                        this.setErrorMessage(error.message);
                    }
                }
            }
        }
    }
    
    async confirmTrade(){
        this.setIsOpenTradeConfirm(true);
    }

    async handleOpenPosition(){
        if (this.state.swapOption==2) {
            toast.info("Preparing swap.");
            this.handleSwap();
            return;
        }
        toast.info("Preparing trade.",{
            icon:({theme, type}) =>  <img src="/assets/image/icon/ic-info.svg"/>
        });
        //show dialog
        let nonce;
        const web3 = new Web3(Web3.givenProvider || chainData[this.props.selectedChainId].rpcUrls[0]);
        const account = (await web3.eth.getAccounts())[0];
        const orderType = this.state.swapType;
        const buy = 1-this.state.swapOption;
        const slippageP = parseInt(this.state.slippage*10);
        const pairIndex = this.state.pairIndex;
        let tokenPrice = this.state.quotePrices[tokenForPair[pairIndex]]
        let positionSizeDai = Number(this.state.fromAmount)*(Number(tokenPrice));
        let openPrice = Number(this.state.openPrice);             // PRECISION
        const leverage = parseInt(Number(this.state.slider));
        const web3bsc = new Web3(BSCRPCURL);
        const storageContract  = new web3bsc.eth.Contract(STORAGE_ABI,STORAGE_ADDRESS);
        const opentrades = await storageContract.methods.openTradesCount(account,pairIndex).call();
        const opemlimits = await storageContract.methods.openLimitOrdersCount(account,pairIndex).call();
        const maxtrades = await storageContract.methods.maxTradesPerPair().call();
        if(Number(opentrades)+Number(opemlimits)>=Number(maxtrades)){
            toast.error(`${maxtrades} positions allowed per pair.`,{
            icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>
            });
            this.setIsOpenTradeConfirm(false);
            return;
        }
        //check condition
        if(positionSizeDai <COLLRATERAL_MIN ||  positionSizeDai >COLLRATERAL_MAX ) {
            toast.error("Wrong collateral amount.(allowed 30-10k EUSD)",{
            icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>
            });
            this.setIsOpenTradeConfirm(false);
            return;
        }
        console.log("aria pairBorrow = ", this.state.pairBorrow)
        if(positionSizeDai*leverage>this.state.pairBorrow *MAXLIQ ){
            toast.error(`Too big position.(allowed ${(this.state.pairBorrow *MAXLIQ).toFixed(0)} EUSD)`,{
            icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>
            });
            this.setIsOpenTradeConfirm(false);
            return;
        }
        if(orderType==1 &&  openPrice==0) {
            toast.error("Wrong open price. ",{
            icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>
            });
            this.setIsOpenTradeConfirm(false);
            return;
        }
        positionSizeDai = getBigNumber(positionSizeDai*Math.pow(10,USDT_PRECISION));
        openPrice = getBigNumber(openPrice*Math.pow(10,USDT_PRECISION));
        this.setState({
            lastEntryprice:orderType==1?this.state.openPrice:this.state.entryprice,
            completedFromAmount:this.state.fromAmount
        })
        //get approve.
        const tradingContract  = new web3.eth.Contract(EXCHANGE_ABI,EXCHANGE_ADDRESS);
        if(tokenForPair[pairIndex] !== "eth"){
            tokenPrice = this.state.quotePrices['pepe']
            const usdtContract  = new web3.eth.Contract(ERC20_ABI,tokenAddressForPair[pairIndex]);
            let approveResult = await usdtContract.methods.allowance(account,EXCHANGE_ADDRESS).call();
            approveResult = getBigNumber(approveResult);
            if(approveResult.lt(positionSizeDai)){
                const rt = usdtContract.methods.approve(EXCHANGE_ADDRESS, getBigNumber(Math.pow(2,255))).send({from:account});
                toast.promise(
                    rt,
                {
                    pending: 'Getting approve to send',
                  success: {
                      render(){
                          return 'Approved to send'
                    },
                    icon:({theme, type}) =>  <img src="/assets/image/icon/ic-success.svg"/>,
                },
                error: {
                    render(){
                        return 'Rejected approve'
                    },
                    icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>,
                }
            }
            )
            await rt;
            }
        }
        const params = [
            account,
            pairIndex,
            0,
            positionSizeDai.toString(),
            openPrice.toString(),
            buy,
            leverage,
            0,
            0,
            0,
            tokenAddressForPair[pairIndex]
        ]
        let value ;
        if(this.props.selectedChainId!=97){
            const zeroContract  = new web3.eth.Contract(ZERO_ABI,ZEROLAYER_ENDPOINT_LIST[this.props.selectedChainId]);
            const _adapterParams = ethers.utils.solidityPack(
                ["uint16", "uint", "uint", "address"],
                [2, 600000, getBigNumber(orderType==0?EXECUTOR_FEE:EXECUTOR_FEE*2), TIDEPOSITION_ADDRESS]
            )
            const additionalValue = await zeroContract.methods.estimateFees(ZEROLAYER_CHAINID_LIST[97],TRADING_ADDRESS_LIST[97],"0x",false,_adapterParams).call({from:account});
            value = getBigNumber(additionalValue[0]);
            value = value.mul(1100).div(1000);
            const uaAddress = TRADING_ADDRESS_LIST[this.props.selectedChainId]
            nonce = await zeroContract.methods.getOutboundNonce(ZEROLAYER_CHAINID_LIST[97],uaAddress.toLowerCase()).call({from:account});
            nonce = Number(nonce)+1;
        }else{
            value = getBigNumber(tokenForPair[pairIndex] !== "eth"?0:this.state.fromAmount)
            value += getBigNumber(orderType==0?EXECUTOR_FEE:EXECUTOR_FEE*2);
        }
        try{
            console.log("aria param = ", params, orderType, slippageP)
            const gas = await tradingContract.methods.openTrade(
                params,
                orderType,
                slippageP
                ).estimateGas({
                    from:account,
                    value:value.toString(),
                });

            const opentrade = tradingContract.methods.openTrade(
                params,
                orderType,
                slippageP,
                ).send({
                from:account,
                gas,
                value:value.toString(),
            });
            const rtx = await toast.promise(
                opentrade,
                {
                  pending: 'Waiting for confirmation.',
                  success: {
                    render(){
                        return 'Complete to submit.'
                    },
                    icon:({theme, type}) =>  <img src="/assets/image/icon/ic-success.svg"/>,
                  },
                  error: {
                    render(){
                        return 'Rejected trading.'
                    },
                    icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>,
                  }
                }
            )
            let visitUrl;
            if(this.props.selectedChainId==97){
                visitUrl = EXPLORER_LIST[this.props.selectedChainId]+"/tx/"+rtx.transactionHash;
            }else{
                visitUrl = `https://testnet.layerzeroscan.com/${ZEROLAYER_CHAINID_LIST[this.props.selectedChainId]}/address/${TRADING_ADDRESS_LIST[this.props.selectedChainId].toLowerCase()}/message/10102/address/${TRADING_ADDRESS_LIST[97].toLowerCase()}/nonce/${nonce}`
            }
            this.setState({visitUrl})
            this.setIsOpenTradeCompleted(true);

            const mining = () => new Promise(resolve =>{
                const check = async()=>{
                    const opentradesafter = await storageContract.methods.openTradesCount(account,pairIndex).call();
                    const opemlimitsafter = await storageContract.methods.openLimitOrdersCount(account,pairIndex).call();
                    if (Number(opentradesafter)!=Number(opentrades) || 
                        Number(opemlimitsafter)!=Number(opemlimits)
                        )
                    {
                        this.setState({actions:this.state.actions+1,fromAmount:0,toAmount:0});
                        setTimeout(resolve,5000);
                    }else{
                        setTimeout(check,10000);
                    }
                }
                setTimeout(check,this.props.selectedChainId==97 ? 5000:40000);
            });
            await toast.promise(
                mining,
                {
                  pending: 'Updating trade list.', 
                  success: {
                    render(){
                        return 'Updated trade list.'
                    },
                    icon:({theme, type}) =>  <img src="/assets/image/icon/ic-success.svg"/>,
                  },
                  error: {
                    render(){
                        return 'Failed to update.'
                    },
                    icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>,
                  }
                }
            )                    
        }catch(error){
            if(error.__proto__.name === "Error"){ 
                const start = error.message.indexOf("{");
                const end = error.message.indexOf("}");
                if(start>=0 && end>=0) {
                    error = JSON.parse(error.message.substring(start, end + 1));
                    toast.error(error.message,{
                        icon:({theme, type}) =>  <img src="/assets/image/icon/ic-error.svg"/>
                    })
                }
            }
        }
    }

    changeQuoteType(type) {
        this.setState({
            quotoType: type
        })
    }

    handleSlippage(e){
        this.setState({
            slippage: Number(e.target.value)
        });
    }

    extraListInfo(pairAddress){
        const {list} = this.state; 
        const pairInfo = list.find(({address}) => address === pairAddress);
        const past = parseFloat(pairInfo.open);
        const current = parseFloat(pairInfo.close);
        const priceChangePercent = parseFloat(pairInfo.priceChangePercent);
        const positive = priceChangePercent > 0 ? true : false;
        const percDiff = (100 * Math.abs((past - current) / ( (past+current)/2 ))).toFixed(2);
        const change = `${priceChangePercent}%`;
        return {change: change, price: Number(pairInfo.price).toFixed(pairInfo.bscdecimals), positive: positive};
    };

    componentDidUpdate(prevProps,prevState){
        if(prevProps.active!=this.props.active ||
            prevProps.selectedChainId!=this.props.selectedChainId || 
            prevProps.address !=this.props.address || 
            prevState.actions != this.state.actions
            ){
            this.updateBalances();
        }
    }

    componentDidMount(){
        this.getTokenListData();
        this.setToken();
        this.updateBalances();
        setInterval(()=>{this.setState({actions:this.state.actions+1})},60000);
        setInterval(this.aniPrice,1000);
        document.addEventListener("mousedown", this.handleClickOutside);
        recenttx().then(res=>{
            let txs = this.state.txs;
            res.map(tx=>{
                const {pairIndex,blockNumber,timestamp,type,txHash,baseAmount,quoteAmount,conversionRate} = tx;
                if(txs.length<7){
                    txs.push({pairIndex,blockNumber,timestamp,type,txHash,baseAmount,quoteAmount,conversionRate});                
                }
            })
            this.setState({
                txs:txs
            })
        });
    };
    componentWillUnmount(){
        const closesocket = async()=>{
            socket.close();
            const myPromise = new Promise((resolve, reject) => {
                do{
                    this.sleep(5000);
                }while(socket.connected);
                resolve("disconnected");
            });
            await myPromise;
        }
        closesocket();
        document.removeEventListener("mousedown", this.handleClickOutside);
    };
    getTokenListData(){
        pairListData().then(res=>{
            this.setState({
                list: res,
                tokens: tokenInfo(),
            });
        });
    };

    handleSearch(){
        if(this.state.input === '') return;
        const address = tokenInfo().find(({address}) => address.toLowerCase().includes(this.state.input));
        const name = tokenInfo().find(({name}) => name.toLowerCase().includes(this.state.input));
        const symbol = tokenInfo().find(({symbol}) => symbol.toLowerCase().includes(this.state.input));
        let found = [];
        if(address) found.push(address);
        if(name) found.push(name);
        if(symbol) found.push(symbol);
        this.setState({
            tokens: found,
        });
    };

    setToken(){
        const setInfo = async()=>{
            try{
                const web3 = new Web3(BSCRPCURL);
                const stakeContract  = new web3.eth.Contract(STAKE_ABI,STAKE_ADDRESS);
                const pairInfo  = await stakeContract.methods.pairInfos(this.state.pairIndex).call();
                console.log("aria pairInfor = ", pairInfo)
                console.log("aria pairIndex = ", this.state.pairIndex)
                const tokenTotalStaked  = ethers.utils.formatUnits(
                          await stakeContract.methods.tokenTotalStaked(pairInfo.base,pairInfo.base).call(),
                          USDT_PRECISION
                        );
                const totalLocked  = ethers.utils.formatUnits(
                          await stakeContract.methods.totalLocked(pairInfo.base,pairInfo.base).call(),
                          USDT_PRECISION
                        );
                const pairInterest = ethers.utils.formatUnits(
                          await stakeContract.methods.lendingFees(USDT_ADDRESS).call(),
                          INTEREST_PRECISION
                        );
                const pairBorrow = tokenTotalStaked-totalLocked;
                this.setState({
                    pairInterest,
                    pairBorrow
                });

            }catch(e){
                console.log(e);
            }
        };
        setInfo();
        const token= tokenMenu2[this.state.pairIndex];
        this.setState({
                fromAddress: token.tideaddress,
                fromDecimals: token.decimals,
                fromSymbolSwap: token.symbol,
                fromAmountSwap:'',
                toAddress: USDT_ADDRESS,
                toDecimals: USDT_PRECISION,
                toSymbolSwap: "USDT",
                toAmountSwap:'',
                bscdecimals:token.bscdecimals
        })

        change({address: this.state.token}).then(res=>{
            const {volume,open,volumeQuote, high, low, close, supply,priceChange,priceChangePercent} = res;
            const mcap = (supply * close);
            const past = parseFloat(open);
            const current = parseFloat(close);
            const positive = current > past ? true : false;
            const percDiff = (100 * Math.abs( (past - current) / (past+current) / 2 )).toFixed(8);
            const change = positive ? `+${percDiff}%` : `-${percDiff}%`;
            this.setState({
                high: high,
                low: low,
                supply: supply,
                marketcap: mcap,
                change: priceChangePercent,
                change_amount: priceChange,
                past: past,
                volume:volume,
                volume_quote:volumeQuote,
                price:close.toString(),
                close: close.toString(),
                changeLoaded: true,
                aniCurPrice:Number(close),
                aniOldPrice:Number(close)
            });
            if(this.state.swapType==0){
                this.setState({
                    entryprice:close
                })
            }    
            this.handleSocket();        
        });

    };

    handleInput(e){
        this.setState({
            input: e.target.value.toLowerCase(),
        });

        clearTimeout(this.timeout);

        this.timeout = setTimeout(()=>{
            this.handleSearch();
        }, 1000);

        if(e.target.value === ''){
            this.setState({
                tokens: tokenInfo(),
            });
        };
    };

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    };
    async handleToken(token, symbol,tokenname,index){
        if(this.state.isLoaded==false) return;
        
        socket.close();
        const myPromise = new Promise((resolve, reject) => {
            do{
                this.sleep(5000);
                
            }while(socket.connected);
            resolve("disconnected");
        });
        await myPromise;
        
        this.setState({
            
            pairIndex:index,
            pairName: symbol,
            dropdown: false,
            fromSymbol:tokenname,
        }, ()=>{
            
            this.setState({token: token},()=>{
                this.setToken();
            })
        });
    };


    handleClickOutside(e){
        if(this.token2area.current && this.token2area.current.contains(e.target)==false){

            this.setState({
                tokenMenu2: false,
            })
        }
        this.setState({
            tokenMenu1: false,
        })
    };

    chartLoaded(){
        this.setState({
            isLoaded: true,
        });
    };

    handleSwapOptions(num){
        this.setState({
            swapOption: num
        });
    };
    handleChartType(num){

        this.setState({
            charttype: num,
            isLoaded:false
        });
    };

    handleSwapType(num){
        this.setState({
            swapType: num
        },()=>{
            if(this.state.swapOption==2){
                this.processAmount(0);
            }else{
                this.setState({toAmount:''})
            }

        });
    };


    slippageBox(){
        return(
          <div className="slippage-box">
            
            <div className="slippage-box-inner">
                <div className="slippage-bog-head">
                    Settings 
                    <button onClick={()=> this.props.setSlippage(false)} className="close-wallet-box">
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" fontSize="20" class="Modal-close-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                    </button>
                </div>
                <div className="slippage-bog-content">
                    <label>Allowed Slippage</label>
                    <input className="slippage-input" onChange={(e)=>{this.handleSlippage(e)}} type="number" value={this.state.slippage} />
                    <span className="percentage">%</span>
                </div>
                <button className="slippage-box-button">Save</button>
            </div>
                
          </div>
        )
    };
    

    swapTokenMenu1(){
        return (
            <div className="token-menu">
                {Object.keys(tokenMenu1).map((i)=>{
                    return (
                        <div key="{i}" className={"token-menu-item"+(i>0?" disable_item":"")}>
                            <img alt={tokenMenu1[i].symbol} src={`./img/token/${tokenMenu1[i].address}.webp`}></img>
                            <div>
                                <span>{tokenMenu1[i].symbol}</span>
                                <span style={{fontSize: '12px', color: 'var(--text)'}}>{tokenMenu1[i].name}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    };

    swapTokenMenu2(){
        return (
            <div className="token-menu" ref={this.token2area}>
                {Object.keys(tokenMenu2).map((i)=>{
                    return (
                        <div key={i} className="token-menu-item" onClick={()=>this.setSwapToken(tokenMenu2[i])}>
                            <img alt={tokenMenu2[i].symbol} src={`./img/token/${tokenMenu2[i].address}.webp`}></img>
                            <div>   
                                <span>{tokenMenu2[i].symbol}</span>
                                <span style={{fontSize: '12px', color: 'var(--text)'}}>{tokenMenu2[i].name}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    };

    handleTokenMenu1(){
        this.setState({
            tokenMenu1: this.state.tokenMenu1 ? false : true
        });
    };

    handleTokenMenu2(selectPay){
        this.setState({
            selectPay:selectPay,
            tokenMenu2: this.state.tokenMenu2 ? false : true
        });
    };


    handleOpenPrice(e){
        this.setState({
            openPrice: e.target.value
        },()=>{
            if (this.state.swapType===1){
                this.setState({entryprice:e.target.value})
                this.updateToAmount();
            }
        });
    }
    handleOpenPriceSwap(e){
        if(this.state.timer){
            clearTimeout(this.state.timer);
            this.setState({
                timer:null
            });
        }
        this.setState({
            openPriceSwap: e.target.value
        })
        const self = this;
        this.setState({
            timer:setTimeout(()=>{
                self.setOpenPrice();      
            },1000)
        });
    }
    updateToAmount(){
        let toAmount = Number(this.state.fromAmount * this.state.quotePrices[this.state.quotoType.toLowerCase()])*parseInt(Number(this.state.slider));
        const entryprice = this.state.swapType==0 ? Number(this.state.entryprice):Number(this.state.openPrice);
        if(entryprice>0){
             toAmount = (toAmount/entryprice).toFixed(6)
        }else{
            toAmount = 0;    
        }
        this.setState({
            toAmount: toAmount
        })
    }
    handleFromAmount(e){
        
        if (e.target.value === '' || reNumber.test(e.target.value)) {
            this.setState({
                fromAmount: e.target.value
            },()=>{
                    this.updateToAmount();
            });
        }
    
    }

    handleToAmount(type){
        let toAmount = Number(this.state.fromAmount * this.state.quotePrices[type.toLowerCase()])*parseInt(Number(this.state.slider));
        const entryprice = this.state.swapType==0 ? Number(this.state.entryprice):Number(this.state.openPrice);
        if(entryprice>0){
             toAmount = (toAmount/entryprice).toFixed(6)
        }else{
            toAmount = 0;    
        }
        this.setState({
            toAmount: toAmount
        })
    }
    async processAmount(changeType){
        if (this.state.swapType==1){
            if(changeType==0){
                if (isNaN(this.state.fromAmountSwap)==false && isNaN(this.state.openPriceSwap)==false ){
                    this.setState({
                        toAmountSwap:Number(this.state.fromAmountSwap)*Number(this.state.openPriceSwap)
                    });
                }
            }else if(changeType==1){
                if (isNaN(this.state.toAmountSwap)==false && isNaN(this.state.openPriceSwap)==false ){
                    this.setState({
                        toAmountSwap:Number(this.state.toAmountSwap)/Number(this.state.openPriceSwap)
                    });
                }
            }else {
                if (isNaN(this.state.fromAmountSwap)==false && isNaN(this.state.openPriceSwap)==false ){
                    this.setState({
                        toAmountSwap:Number(this.state.fromAmountSwap)*Number(this.state.openPriceSwap)
                    });
                }
            }
        }else{
            if(this.props.active==false) return;
            const web3 = new Web3(Web3.givenProvider || chainData[this.props.selectedChainId].rpcUrls[0]);
            const usdtMarket  = new web3.eth.Contract(MARKET_ABI,MARKET_ADDRESS_LIST[this.props.selectedChainId]);
            let path = [
                this.state.fromAddress,
                this.state.toAddress
                ];
            
            if(this.state.fromAddress.toLowerCase()!=USDT_ADDRESS.toLowerCase() && this.state.toAddress.toLowerCase()!=USDT_ADDRESS.toLowerCase()){
                path = [
                    this.state.fromAddress,
                    USDT_ADDRESS,
                    this.state.toAddress
                    ];
            }
            let amounts;
            let amountIn,amountOut;
            if(changeType==0){
                amountIn = ethers.utils.parseUnits(
                  Number(this.state.fromAmountSwap).toFixed(this.state.fromDecimals),
                  this.state.fromDecimals
                );
                amounts = await usdtMarket.methods.getAmountsOut(amountIn,path).call();
                this.setState({
                    toAmountSwap:ethers.utils.formatUnits(
                          amounts[amounts.length-1],
                          this.state.toDecimals
                        )
                })
            }else{
                amountOut = ethers.utils.parseUnits(
                  Number(this.state.toAmountSwap).toFixed(this.state.fromDecimals),
                  this.state.fromDecimals
                );
                amounts = await usdtMarket.methods.getAmountsIn(amountOut,path).call();
                this.setState({
                    fromAmountSwap:ethers.utils.formatUnits(
                          amounts[0],
                          this.state.fromDecimals
                        )
                })
            }
        }
    }
    async setOpenPrice(){
        this.processAmount(2);
    }
    async getToAmount(){
        this.processAmount(0);
    }

    async getFromAmount(){
        this.processAmount(1);
    }
    handleFromAmountSwap(e){
        if(this.state.timer){
            clearTimeout(this.state.timer);
            this.setState({
                timer:null
            });
        }
        this.setState({
            fromAmountSwap: e.target.value
        })
        const self = this;
        this.setState({
            timer:setTimeout(()=>{
                self.getToAmount();      
            },1000)
        });
    }

    handleToAmountSwap(e){
        if(this.state.timer){
            clearTimeout(this.state.timer);
            this.setState({
                timer:null
            });
        }
        this.setState({
            toAmountSwap: e.target.value
        })
        const self = this;
        this.setState({
            timer:setTimeout(()=>{
                self.getFromAmount();      
            },1000)
        });
    }

    handleSlider(e){
        this.setState({
            slider: parseInt(e.target.value),
            sliderLabel: (e.target.value / 30) * 350
        },()=>{
            this.updateToAmount();
        })
    }

    handleSwitch(){
        const {fromBase, toBalanceSwap,fromBalanceSwap,fromAmountSwap, toAmountSwap, fromAddress, toAddress, fromSymbolSwap, toSymbolSwap} = this.state
        this.setState({
            fromBase: fromBase ? false : true,
            fromAmountSwap: toAmountSwap,
            toAmountSwap: fromAmountSwap,
            fromAddress: toAddress,
            toAddress: fromAddress,
            fromSymbolSwap: toSymbolSwap,
            toSymbolSwap: fromSymbolSwap,
            fromBalanceSwap:toBalanceSwap,
            toBalanceSwap:fromBalanceSwap
        })
    }
  render(){
      const {openPrice,tokens, high, low, marketcap, pairName, isLoaded, change, close, changeLoaded, swapOption, swapType, 
          fromSymbol, toSymbol, tokenMenu1, tokenMenu2, fromAmount, toAmount,fromAmountSwap,toAmountSwap, 
          fromBase,slider,fromSymbolSwap,toSymbolSwap,change_amount, volume, volume_quote} = this.state;

      return (
        <div className="sc-sQjNv gPaEhc">
          <Helmet>
              <title>{`${pairName} - ${numberFormat(close,this.state.bscdecimals)}`}</title>
              <meta name="description" content="Nested component" />
          </Helmet>
            {tokenMenu1 &&
                this.swapTokenMenu1()
            }
            {tokenMenu2 &&
                this.swapTokenMenu2()
            }

          <TradeHeader 
            aniOldPrice={this.state.aniOldPrice}
            aniCurPrice={this.state.aniCurPrice}
            
            handleTradingview = {this.handleTradingview}
            fromSymbol={fromSymbol} close={close} high={high} low={low} 
            upprice={this.state.upprice}
            bscdecimals = {this.state.bscdecimals}
            change={change} change_amount={change_amount} volume={volume} volume_quote={volume_quote} changeLoaded={changeLoaded} pairName = {pairName} tokens = {tokens}  handleToken={this.handleToken} extraListInfo={this.extraListInfo}/>
            {this.state.showTradingview &&
              <TradeCenter pairName= {pairName} chartLoaded={this.chartLoaded}/>
            }
          <TradeRight 
            
            handleSwapOptions={this.handleSwapOptions} 
            swapOption ={swapOption}
            handleSwapType={this.handleSwapType}
            swapType = {swapType}
            handleTokenMenu1={this.handleTokenMenu1}
            handleTokenMenu2={this.handleTokenMenu2}

            setMaxFrom = {this.setMaxFrom}
            confirmTrade = {this.confirmTrade}
            handleOpenPrice = {this.handleOpenPrice}
            openPrice = {openPrice}
            handleFromAmount = {this.handleFromAmount}
            fromAmount={fromAmount}
            fromSymbol={fromSymbol}
            toAmount={toAmount}
            handleToAmount = {this.handleToAmount}
            handleSlider = {this.handleSlider}
            slider = {slider}
            activeWallet={this.props.active}
            setOpenModal= {this.props.setOpenModal}
            
            price={this.state.price}
            entryprice={this.state.entryprice}
            pairInterest = {this.state.pairInterest}
            pairBorrow = {this.state.pairBorrow}
            futureBalace = {this.state.futureBalace}
            slippage = {this.state.slippage}
            handleSlippage={this.handleSlippage}
            bscdecimals = {this.state.bscdecimals}

            quotePrices = {this.state.quotePrices}
            changeQuoteType = {this.changeQuoteType}
            updateBalances = {this.updateBalances}

            />
          <TradeBottom price={this.state.price} txs = {this.state.txs} outerActions={this.state.actions} slippageP={parseInt(this.state.slippage*10)} pairIndex={this.state.pairIndex} tokens={this.state.tokens}
            bscdecimals = {this.state.bscdecimals}
          />
          <TradeConfirm 
            entryprice = {this.state.entryprice}
            bscdecimals = {this.state.bscdecimals}
            fromAmount = {this.state.fromAmount}
            slider = {this.state.slider}
            fromSymbol = {this.state.fromSymbol}
            swapOption = {this.state.swapOption}
            slippage = {this.state.slippage}
            handleOpenPosition = {this.handleOpenPosition}
            isOpen={this.state.isOpenTradeConfirm} closeModal={()=>{this.setIsOpenTradeConfirm(false)}}/>
          <TradeCompleted 
            visitUrl={this.state.visitUrl} 
            fromSymbol={fromSymbol} 
            swapOption={this.state.swapOption} 
            fromAmount={this.state.completedFromAmount}
            lastEntryprice={numberFormat(this.state.lastEntryprice,this.state.bscdecimals)}
            isOpen={this.state.isOpenTradeCompleted}
            closeModal={()=>this.setIsOpenTradeCompleted(false)}/>
        </div>
      );
  }
}
export default Trade;