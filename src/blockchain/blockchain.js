const Block = require('./block');

class Blockchain{
    constructor(){
        this.chain = [this.crearBloqueGenesis()];
        this.dificultad = 3;
    }

    crearBloqueGenesis(){
        return new Block('01/01/2019', 'bloqueGenesis', '0')
    }

    getUltimoBloque(){
        return this.chain[this.chain.length - 1];
    }

    agregarBloque(nuevoBloque){
        nuevoBloque.hashprevio = this.getUltimoBloque().hash;
        nuevoBloque.minarBloque(this.dificultad);
        this.chain.push(nuevoBloque);
    }

    validarChain(){
        for (let i = 1; i < this.chain.length; i++) {
            const bloqueActual = this.chain[i];
            const bloqueAnterior = this.chain[i-1];

            if(bloqueActual.hash != bloqueActual.calcularHash()){
                return false;
            }

            if(bloqueActual.hashprevio != bloqueAnterior.hash){
                return false;
            }     
        }
        return true;
    }
}

module.exports = Blockchain;