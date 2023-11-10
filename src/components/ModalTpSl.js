import { Modal } from "@chakra-ui/react";
import {useState,useEffect} from "react";
import {USDT_PRECISION} from './tradeUI.js';

export default function ModalTpSl({ isOpen, setOpenModal,Tp,Sl,updateTPSL,index }) {
    const [mtp,setMtp] = useState(0);
    const [msl,setMsl] = useState(0);
    useEffect(()=>{
        const newTp = Number(Tp)/Math.pow(10,USDT_PRECISION);
        const newSl = Number(Sl)/Math.pow(10,USDT_PRECISION);
        setMtp(newTp);
        setMsl(newSl);
    },[Tp,Sl]);
    const confirm = ()=>{
        updateTPSL(mtp,msl,index);
        setOpenModal(false);
    }
    return (
        <Modal isOpen={isOpen} isCentered>
            <div className="wallet-choose">
                <div className="wallet-box-header">
                    <span>Manage TP/SL</span>
                    <button className="close-wallet-box" onClick={()=>{setOpenModal(false)}}>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" fontSize="20" className="Modal-close-icon" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" d="M0 0h24v24H0z"></path>
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                        </svg>
                    </button>

                </div>
                <div className="devider"></div>
                <div className="wallet-box-menu">
                    <div className="Exchange-swap-section">
                        <div className="Exchange-swap-section-top">
                            <div className="muted align-left">Take Profit</div>
                            <div className="muted align-right"></div>
                        </div>
                        <div className="Exchange-swap-section-bottom">
                            <div className="Exchange-swap-input-container">
                                <input type="number" min="0" value={mtp} onChange={(e)=>setMtp(e.target.value)} placeholder="0.0" className="tpslfield Exchange-swap-input" />
                            </div>
                        </div>
                    </div>
                    <div className="Exchange-swap-section">
                        <div className="Exchange-swap-section-top">
                            <div className="muted align-left">StopLoss</div>
                            <div className="muted align-right"></div>
                        </div>
                        <div className="Exchange-swap-section-bottom">
                            <div className="Exchange-swap-input-container">
                                <input type="number" min="0" value={msl} onChange={(e)=>setMsl(e.target.value)}  placeholder="0.0" className="Exchange-swap-input tpslfield" />                            </div>
                        </div>
                    </div>
                    <div style={{display:"flex"}}>
                        <button className="wallet-box-item" onClick={()=>setOpenModal(false)} style={{flex:"1 1 0",padding:"10px"}}>
                            <div style={{width:"100%"}}>Cancel</div>
                        </button>
                        <div style={{width:"10px"}}></div>
                        <button className="wallet-box-item" onClick={confirm} style={{flex:"1 1 0",padding:"10px",backgroundColor:"var(--main)"}}>
                            <div style={{width:"100%"}}>Confirm</div>
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}