const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(timestamp, data, hashprevio=''){
        this.timestamp = timestamp;
        this.data = data;
        this.hashprevio = hashprevio;
        this.comodin = 0;
        this.hash = this.calcularHash()
    }

    calcularHash(){
        return SHA256(this.timestamp + 
            this.hashprevio +
            JSON.stringify(this.data) + this.comodin).toString()
    }

    minarBloque(dificultad){
        while (this.hash.substring(0, dificultad) !== Array(dificultad + 1).join('0')) {
            this.comodin++;
            this.hash = this.calcularHash();

        }
        console.log('minar bloque : ' + this.hash);
    }
}

module.exports = Block;