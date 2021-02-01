export const checkTarget = function(target, value){
    if(target === value){
        console.log('Target is equal to value');
        return 0;
    } else if(target > value){
        console.log('Target is greater than value');
        return 1;
    } else if(target < value){
        console.log('Target is less than value');
        return -1;
    }
}