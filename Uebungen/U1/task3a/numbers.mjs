function numbersLoop(from, to){
    let res = [];
    while(from <= to){
        res.push(from);
        from++;
    }

    return res;
}

function numbersNoLoop(from, to){
    if (from > to){
        return;
    }

    console.log(from);
    // from++ will not be calculated before entering the next function
    numbersNoLoop(++from, to);
}

export {numbersLoop, numbersNoLoop};
