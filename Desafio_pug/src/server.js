import express from 'express';
import cors from 'cors';
import multer from 'multer';
import productosRouter from './routes/productos.js';
import Contenedor from './classes/contenedor.js';

const upload = multer();
const app = express();
const productos = new Contenedor();

app.set('views','./views');
app.set('view engine', 'pug');

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
    const prod = productos.getAll().then(result=>{
        let prod = result.message;

        res.render("productos", {
            productos: prod
        })
    })
})
