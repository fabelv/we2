import http from 'http';
import {numbersLoop} from '../task3a/numbers.mjs';
import {createAndFillFileAsync, readAndDeleteFileAsync} from '../task3b/file.mjs';
import fsPromis from 'fs/promises'; 

async function getNumbers(){
    let numbers = numbersLoop(0,50);
    return numbers.toString();
}

async function getFile(){
    let today = new Date();
    let file = './tmp.txt';
    let content = '';
    try{
        await createAndFillFileAsync(file, today.toString())
        content = await readAndDeleteFileAsync(file);
    }catch(err){
        content = "unable to create or read file: " + err;
    }

    return content.toString();
}

async function readHtmlFile(){
    let html = fsPromis.readFile('./task5/test.html');
    return await html;
}

async function readJsFile(){
    let js = fsPromis.readFile('./task5/js.js');
    return await js;
}

async function routing(url){
    let payload = 'Hello World';
    let contentType = 'text/plain';

    switch(url){
        case '/number':
            payload = await getNumbers();
            break;
        case '/file':
            payload = await getFile();
            break;
        case '/html':
            payload = await readHtmlFile();
            contentType = 'text/html';
            break;
        case '/js':
            payload = await readJsFile();
            contentType = 'text/plain';
    }

    return {payload: payload, contentType: contentType};
}

let server = http.createServer(async function(req, res){
    let url = req.url;
    let result = await routing(url);
    console.log(result);

    res.writeHeader(200, {"Content-Type": result.contentType});
    res.write(result.payload);
    res.end();
});

server.listen(8080);
