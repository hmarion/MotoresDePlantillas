import express from 'express';
import cors from 'cors';
import multer from 'multer';
import {engine} from 'express-handlebars';
import productosRouter from './routes/productos.js';
import Contenedor from './classes/contenedor.js';

const upload = multer();
const app = express();
const productos = new Contenedor();

app.engine('handlebars',engine());
app.set('views','./views');
app.set('view engine', 'handlebars');

app.use(upload.single('file'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(express.static('public'));
app.use('/api/productos', productosRouter);
const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log('Servidor escuchando en ' + PORT);
});

app.get('/productos',(req, res)=>{
    productos.getAll().then(result=>{
        let info = result.message;
        let object = {
            list: info
        }
        res.render('productos', object)
    })
})
