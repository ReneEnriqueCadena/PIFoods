export function blockButton(a){
    var resp = false
    for(let clave in a){
        if(a[clave] !== false) resp = true;
    }
    return resp;
}

export function validateN(name){
    if( !validName(name) || name.length < 3) return "The name must be made up only of letters";
    return false;
}

export function validateD(dishsummary){
    if(dishsummary.length < 5 || !validDishsummary(dishsummary)) return "Only letters and numbers";
    return false;
}

export function validateP(punctuation){
    if(!validPunctuation(punctuation)) return "This should be a number";
    return false;
}

export function validateS(stepbystep){
    if(stepbystep.length < 5 || !validStepbystep(stepbystep)) return "Must have at least one word";
    return false;
}


function validName(n){
    return /^[a-zA-Z\s]*$/.test(n);
}

function validPunctuation(p){
    return /^[0-9]*$/.test(p)
}

function validDishsummary(d){
    return /^[a-zA-Z0-9\s]*$/.test(d)
}

function validStepbystep(s){
    return /^[^$%&|<>#]*$/.test(s)
}
