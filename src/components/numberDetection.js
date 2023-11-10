export default function NumberDetection(num){
    let numInt = num.split('.')[0];
    let numFloat = num.split('.')[1];

    if(parseInt(numInt) < 1){
        if(numFloat.startsWith('0000000')){
            return parseFloat(num).toFixed(9);
        } else {
            return parseFloat(num).toFixed(7);
        };
    } else if(parseInt(numInt) > 1){
        return parseFloat(num).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };
};