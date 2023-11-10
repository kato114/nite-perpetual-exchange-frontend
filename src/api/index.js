import Config from "../components/config";

const {baseUrl} = Config();

const api = baseUrl.local;

const header = {
    headers: {
        "Content-Type": "application/json",
    },
}

export async function recenttx(){
    const res = await fetch(`${api}/api/recenttx`, {
        method: 'GET',
        header,
    });
    return await res.json();
    
}

export async function getChart(data){
    const {address, resolution} = data;
    const res = await fetch(`${api}/api/chart?address=${address}&resolution=${resolution}`, {
        method: 'GET',
        header,
    });
    return await res.json();
};

export async function checkwallet(address){
    const res = await fetch(`${api}/api/checkwallet?address=${address}`, {
        method: 'GET',
        header,
    });
    return await res.json();
}

export async function registerwallet(address){
    const res = await fetch(`${api}/api/registerwallet?address=${address}`, {
        method: 'GET',
        header,
    });
    return await res.json();
}

export async function change(data){
    const {address} = data;
    const res = await fetch(`${api}/api/change?address=${address}`, {
        method: 'GET',
        header,
    });

    return await res.json();    
    
};


export async function getTideUSDT(data){
    const {address,chainId} = data;
    const res = await fetch(`${api}/api/sendUSDT?address=${address}&chainId=${chainId}`, {
        method: 'GET',
        header
    });
    return await res.json();    
    
};


export async function pairListData(){
    const res = await fetch(`${api}/api/tokenlistdata`, {
        method: 'GET',
        header,
    });
    return await res.json();    
    
};
