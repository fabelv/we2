export {createAndFillFile, readAndDeleteFile, createAndFillFileAsync, readAndDeleteFileAsync};

import fs, { unlink, unlinkSync } from 'fs';
import fsPromis from 'fs/promises';

function createAndFillFile(path, content){
    try{
        fs.writeFileSync(path, content);
        console.log('File created');
    } catch(err){
        throw err;
    }
}

function readAndDeleteFile(path){
    try{
        let content = fs.readFileSync(path);
        console.log('File content: ' + content);
    } catch(err){
        throw err;
    }

    try{
        unlinkSync(path);
        console.log('File deleted');
    } catch(err){
        throw err;
    }
}

async function createAndFillFileAsync(path, content){
    try{
        await fsPromis.writeFile(path, content);
    }catch (err){
        throw err;
    }
}

async function readAndDeleteFileAsync(path){
    try{
        let content = await fsPromis.readFile(path);
        fsPromis.unlink(path);
        return content
    }catch(err){
        throw err;
    }
}

