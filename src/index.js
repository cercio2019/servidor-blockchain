const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const IndexRoutes = require('./routes/indexRoutes');
const TransferRoutes = require('./routes/transferRoutes');
const PagoRouter = require('./routes/pagoRouter');
const EmpresasRoutes = require('./routes/empresasRoutes');
const ServiciosRoutes = require('./routes/empresasRoutes');

class servidor{

    app = express();
    indexRoutes = new IndexRoutes();
    transferRoutes = new TransferRoutes();
    pagoRouter = new PagoRouter();
    empresasRoutes = new EmpresasRoutes();
    serviciosRoutes = new ServiciosRoutes();

    constructor(){
        this.creandoServidor();
        this.routes();
    }

    creandoServidor(){
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
    }

    routes(){
        this.app.use('/', this.indexRoutes.router);
        this.app.use('/transferencias', this.transferRoutes.router);
        this.app.use('/pagos', this.pagoRouter.router);
        this.app.use('/empresas', this.empresasRoutes.router);
        this.app.use('/servicios', this.serviciosRoutes.router);
    }

    activarServidor(){
        this.app.listen(this.app.get('port'), () =>{
            console.log('servidor activo en el puerto', this.app.get('port'))
        })
    }
}

const server = new servidor();
server.activarServidor();