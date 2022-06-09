//const arr = [{name:'c',diets:['a','b','c']},{name:'a',diets:['a','b','c']},{name:'b',diets:['a','c']}]

export function sortByNameAz(arr, x) {
    console.log(arr)
    var resp1 = [];
    if(x === 'All foods'){
        resp1 = arr;
    }
    if(x && x !== 'All foods') {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].diets.includes(x)) {
                resp1.push(arr[i])
            }
        }
    }   else resp1 = arr;
    console.log(resp1)
    function SortArray(x, y){
        if (x.name < y.name) {return -1;}
        if (x.name > y.name) {return 1;}
        return 0;
    }
    var resp = resp1.sort(SortArray);
    console.log(resp)
    return resp;
}


export function sortByNameZa(arr,x){
    var resp1 = [];
    if(x === 'All foods'){
        resp1 = arr;
    }
    if(x && x !== 'All foods') {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].diets.includes(x)) {
                resp1.push(arr[i])
            }
        }
    }   else resp1 = arr;
    console.log(resp1)
    function SortArray(x, y){
        if (x.name < y.name) {return 1;}
        if (x.name > y.name) {return -1;}
        return 0;
    }
    var resp = resp1.sort(SortArray);
    return resp;
}

export function sortByHigh(arr,x){
    var resp1 = [];
    if(x === 'All foods'){
        resp1 = arr;
    }
    if(x && x !== 'All foods') {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].diets.includes(x)) {
                resp1.push(arr[i])
            }
        }
    }   else resp1 = arr;
    console.log(resp1)

    function SortArray(x, y){
        if (x.punctuation < y.punctuation) {return 1;}
        if (x.punctuation > y.punctuation) {return -1;}
        return 0;
    }
    var resp = resp1.sort(SortArray);
    return resp;
}

export function sortByLow(arr,x){
    var resp1 = [];
    if(x === 'All foods'){
        resp1 = arr;
    }
    if(x && x !== 'All foods') {
        for (let i = 0; i < arr.length; i++) {
            if(arr[i].diets.includes(x)) {
                resp1.push(arr[i])
            }
        }
    }   else resp1 = arr;
    console.log(resp1)
    function SortArray(x, y){
        if (x.punctuation < y.punctuation) {return -1;}
        if (x.punctuation > y.punctuation) {return 1;}
        return 0;
    }
    var resp = resp1.sort(SortArray);
    return resp;
}
