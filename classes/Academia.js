class Academia {
    constructor(nome, cnpj, endereco){
        this.nome = nome
        this.cnpj = cnpj
        this.endereco = null
    }

    setNome = (nome) =>{ this.nome = nome}
    setCnpj = (cnpj) =>{ this.cnpj = cnpj}


    getNome = () => {return this.nome}
    getCnpj = () => {return this.cnpj}
    getPessoa = () => {return this.pessoa}

}



export {Academia}