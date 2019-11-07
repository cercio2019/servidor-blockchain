const {Router} = require('express');

const IndexController = require('../controllers/indexController');
const pool = require('../database');

class ServiciosRoutes {

    router = Router();
    indexController = new IndexController();
    numTransacciones = 0;

    constructor(){

        this.router.get('/', async (req, res) =>{
            await pool.query("SELECT * FROM servicios", (err, result, fiels) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.get('/:nro', async (req, res) =>{
            const {nro} = req.params;
            await pool.query("SELECT * FROM servicios WHERE nro_servicio = ?", [nro], (err, result, fiels) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.post('/', async (req, res) =>{
            const datos = req.body;
            await pool.query("INSERT INTO servicios set ?", [datos]);
            this.createBlock(datos);
            res.json({message:"Servicio registrado satisfactoriamente"});
        });

        this.router.put('/:nro', async (req, res)=>{
            const datos = req.body;
            const {nro} = req.params;
            await pool.query("UPDATE servicios set ? WHERE nro_servicio = ?", [datos, nro]);
            this.createBlock(datos);
            res.json({message:"El servicio ha sido actualizada con exito"});
        });

        this.router.delete('/:nro', async (req, res)=>{
            const {nro} = req.params;
            await pool.query("DELETE FROM servicios WHERE nro_servicio = ?", [nro]);
            res.json({message:"EL servicio seleccionado a sido eliminado exitosamente"});
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

module.exports = ServiciosRoutes;