const Block = require('../blockchain/block');
const Blockchain = require('../blockchain/blockchain');

class IndexController {

    blockUser = new Blockchain();
    transacciones = [];
   
    crearBloqueUsuarios(){
        const fecha = new Date();
        this.blockUser.agregarBloque(new Block(fecha, this.transacciones));
        console.log(JSON.stringify(this.blockUser, null, 4));
        this.transacciones = [];
    }

    guardarBloques(datos){
        this.transacciones.push(datos);
    }

}

module.exports = IndexController;