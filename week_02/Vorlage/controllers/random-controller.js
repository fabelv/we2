import { getRandomList } from '../services/random-service.js';

export function index(req, res) {
    res.render('random', {title: 'Random'});
}

export function random(req, res, next) {
    let {count, min, max} = req.body;

    // convert
    count = parseInt(count, 10);
    min = parseInt(min, 10);
    max = parseInt(max, 10);

    if (isNaN(count) || isNaN(min) || isNaN(max)) {
        const error = new Error('Invalid input: count, min, and max must be numbers.');
        return next(error); 
    } else if (min > max) {
        const error = new Error('Invalid input: min must be less than or equal to max.');
        return next(error);
    }    

    let randomNumber = getRandomList(count, min, max);
    res.render('randomResult', {title: 'Random Result', result: randomNumber, input: {count, min, max}});
}
