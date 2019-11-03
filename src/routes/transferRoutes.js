const {Router} = require('express');

const IndexController = require('../controllers/indexController');
const pool = require('../database');

class TransferRoutes {

    router = Router();
    indexController = new IndexController();
    numTransacciones = 0;

    constructor(){

        this.router.get('/', async (req, res) =>{
            await pool.query("SELECT * FROM transferencias", (err, result, fiels)=>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.get('/:nro', async (req, res) =>{
            const nro = req.params;
            await pool.query("SELECT * FROM transferencias WHERE nroTransferencia = ?", [nro], (err, result, fiels) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.get('/:cedula', async (req, res) =>{
            const cedula = req.params;
            await pool.query("SELECT * FROM transferencias WHERE cedula = ?", [cedula], (err, result, fiels) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.post('/', async (req, res) =>{
            const transaccion = req.body;
            await pool.query("INSERT INTO transferencias set ?", [transaccion]);
            this.createBlock(transaccion);
            res.json({messasge:"Transferencia realizada con exito"});
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

module.exports = TransferRoutes;

