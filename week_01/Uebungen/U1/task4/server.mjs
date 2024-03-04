import http from 'http';
import {numbersLoop} from '../task3a/numbers.mjs';
import {createAndFillFileAsync, readAndDeleteFileAsync} from '../task3b/file.mjs'

let server = http.createServer(async function(req, res){
    let message = 'Hi there';
    console.log(req.url);
    switch(req.url) {
        case '/file':
            let date = new Date();
            createAndFillFileAsync('./tmp.txt', date.toString());
            message = await readAndDeleteFileAsync('./tmp.txt');
            message = message.toString();
            break;
        case '/number':
            message = numbersLoop(1,50);
            break;
    }; 
    res.end(JSON.stringify(message));
});

server.listen(8080);
