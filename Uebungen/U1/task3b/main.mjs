import {createAndFillFile, readAndDeleteFile, createAndFillFileAsync, readAndDeleteFileAsync} from './file.mjs';

createAndFillFile('./test.txt', 'test');
readAndDeleteFile('./test.txt');

createAndFillFileAsync('async.txt', 'async');
readAndDeleteFileAsync('async.txt');
