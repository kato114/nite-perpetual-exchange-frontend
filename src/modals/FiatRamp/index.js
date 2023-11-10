import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

import "./style.css";

import Web3 from 'web3';
import {chainData} from "../../components/tradeUI"
const web3 = new Web3();

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
};

export default function FiatRamp({ isOpen, closeModal}) {

    async function changeNetwork(){
        let _chainId ;
        if(window.ethereum.networkVersion!=97 && window.ethereum.networkVersion!=43113 && 
           window.ethereum.networkVersion!=420 && window.ethereum.networkVersion!=421613 ){
            _chainId = 97;
        }else{
            return;
        }
        if (window.ethereum.networkVersion !== _chainId) {
            try {
                const chainId = web3.utils.toHex(_chainId);
                console.log("changeNetwork",_chainId,chainId)
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId }]
                });
            } catch (err) {
                if (err.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainName: chainData[_chainId].chainName ,
                                chainId: web3.utils.toHex(_chainId),
                                nativeCurrency: chainData[_chainId].nativeCurrency ,
                                rpcUrls: chainData[_chainId].rpcUrls 
                            }
                        ]
                    });
                }
            }
        }
    }

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="moda-fiatramp" sx={style}>
        <div class="sc-hAsxaJ ia-DxTe">
          <div class="sc-yeoIj fYAHzI">
            <div class="sc-caXVBt btrGPJ">Deposit Fiat</div>
            <div class="sc-bPyhqo iijVdv" onClick={closeModal}></div>
          </div>
          <div class="sc-lkwKjF dIxMqX">
            <div class="sc-jmNpzm fVmVPEFiat">
                <img src="/assets/image/pay.png" style={{width:"100%"}}></img>
                Exchange any crypto instantly.
                Exchange Bitcoin, Ethereum, BNB and 200+ DeFi tokens in a fast, simple and secure way.
                <p/>
                <p>Coming Soon</p>
                <p/>                
                For more information please click <a className='ehzVWJ' href="/" target="_blank" rel="noopener noreferrer">here</a>.
            </div>
          </div>
        </div>
      </Box>
    </Modal>
  );
}
