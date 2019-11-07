const {Router} = require('express');

const IndexController = require('../controllers/indexController');
const pool = require('../database');

class EmpresasRoutes {

    router = Router();
    indexController = new IndexController();
    numTransacciones = 0;

    constructor(){

        this.router.get('/', async (req, res) =>{
            await pool.query("SELECT * FROM empresas", (err, result, fiels) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.get('/:rif', async (req, res) =>{
            const {rif} = req.params;
            await pool.query("SELECT * FROM empresas WHERE rif = ?", [rif], (err, result, fiels) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.post('/', async (req, res) =>{
            const datos = req.body;
            await pool.query("INSERT INTO empresas set ?", [datos]);
            this.createBlock(datos);
            res.json({message:"Empresa registrada satisfactoriamente"});
        });

        this.router.put('/:rif', async (req, res)=>{
            const datos = req.body;
            const {rif} = req.params;
            await pool.query("UPDATE empresas set ? WHERE rif = ?", [datos, rif]);
            this.createBlock(datos);
            res.json({message:"Empresa ha sido actualizada con exito"});
        });

        this.router.delete('/:rif', async (req, res)=>{
            const {rif} = req.params;
            await pool.query("DELETE FROM empresas WHERE rif = ?", [rif]);
            res.json({message:"La empresa seleccionada a sido eliminada exitosamente"});
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

module.exports = EmpresasRoutes;


