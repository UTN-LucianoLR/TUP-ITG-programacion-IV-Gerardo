import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { conectarDB } from './config/db.js';
import 'dotenv/config';

import authRoutes from './routes/auth.routes.js';
import productoRoutes from './routes/producto.routes.js';
import proveedorRoutes from './routes/proveedor.routes.js';
import ventaRoutes from './routes/venta.routes.js';

const app = express();

//Middlewares globales
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use('/api/login', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/ventas', ventaRoutes);

conectarDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor Express listo en http://localhost:${PORT}`);
    });
});