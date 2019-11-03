const {Router} = require('express');
const IndexController = require('../controllers/indexController');
const pool = require('../database');

class IndexRoutes{
    
    router = Router();
    indexController = new IndexController();
    numTransacciones = 0;

    constructor(){

        this.router.get('/', async (req, res) => {
            await pool.query('SELECT * FROM usuarios', (err, result, fields) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.get('/:cedula', async (req, res) =>{
            const cedula = req.params;
            await pool.query("SELECT * FROM usuarios WHERE cedula = ?", [cedula], (err, result, fiels) =>{
                if(err) throw err;
                res.json(result);
            });
        });

        this.router.post('/', async (req, res) =>{
            const datos = req.body;
            try {
                await pool.query("INSERT INTO usuarios set ?", [datos]);
                this.createBlock(datos);
                res.json({message : "Registro de usuario completo"});
            } catch (error) {
                console.log(error);
            }
        });

        this.router.put('/:cedula', async(req, res)=>{
            const {cedula} = req.params;
            const datos = req.body;
            await pool.query("UPDATE usuarios set ? WHERE cedula = ?", [datos, cedula]);
            this.createBlock(datos);
            res.json({message:"Registro de usuario se ha actualizado con exito"});
        });

        this.router.delete('/:cedula', async()=>{
            const cedula = req.params;
            await pool.query("DELETE FROM usuarios WHERE cedula = ?", [cedula]);
            res.json({message:"Usuario ha sido eliminado satifactoriamente"});
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

module.exports = IndexRoutes;