import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import {randomRoutes} from './routes/random.js';
import {helpers} from './utils/handlebar-util.js'
import exphbs from 'express-handlebars';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const app = express();
const hbs = exphbs.create({
    extname: '.hbs',
    defaultLayout: "default",
    helpers: {
        ...helpers
    }
});


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.resolve(__dirname, 'views')); 

app.use(express.static(path.resolve(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(randomRoutes);

// 404 handler
app.use((req, res, next) => {
    let error = new Error("Page not Found")
    next(error);
});

// error middleware
app.use((err, req, res, next) => {
    res.render('error', { title: 'Error', message: err.message });
});

const hostname = '127.0.0.1';

const port = 3001;
app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
