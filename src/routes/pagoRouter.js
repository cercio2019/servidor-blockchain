const {Router} = require('express');

const IndexController = require('../controllers/indexController');
const pool = require('../database');

class PagoRouter {

    router = Router();
    indexController = new IndexController();
    numTransacciones = 0;

    constructor(){

        this.router.get('/', async (req, res) =>{
            await pool.query("SELECT * FROM pagos", (err, result, fiels) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.get('/:nro', async(req, res)=>{
            const nroPago = req.params;
            await pool.query("SELECT * FROM pagos WHERE nroPago = ?", [nroPago], (err, result, fiels) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.get('/:cedula', async(req, res)=>{
            const cedula = req.params;
            await pool.query("SELECT * FROM pagos WHERE cedula = ?", [cedula], (err, result, fiels) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.post('/', async(req, res)=>{
            const datosPagos = req.body;
            await pool.query("INSERT INTO pagos set ?", [datosPagos]);
            this.createBlock(datosPagos);
            res.json({message:"El pago se ha realizado con exito"});
        });

        this.router.put('/:nro', async(req, res)=>{
            const datosPagos = req.body;
            const {nro} = req.params;
            await pool.query("UPDATE pagos set ? WHERE nroPago = ?", [datosPagos, nro]);
            this.createBlock(datosPagos);
            res.json({message:"El pago ha sido actualizado con exito"});
        });

    }

    createBlock(datos){
        
        if(this.numTransacciones < 3){
            this.indexController.guardarBloques(datos);
            this.numTransacciones++;
        }else{
            this.indexController.crearBloqueUsuarios();
            this.numTransacciones = 0;
        }
    }
}

module.exports = PagoRouter;