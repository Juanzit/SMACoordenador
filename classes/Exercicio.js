class Exercicio {
    constructor (nome, tipo, musculos, descricao, imagem){
        this.nome = nome
        this.tipo = tipo
        this.musculos = musculos
        this.descricao = descricao
        this.variacao = []
        this.execucao = []
        this.imagem = null
    }

    setNome = (nome) => {this.nome = nome}
    getNome = () => {return this.nome}
    
    setTipo = (tipo) => {this.tipo = tipo}
    getTipo = () => {return this.tipo}

    setMusculos = (musculos) => {this.musculos = musculos}
    getMusculos = () => {return this.musculos}

    setDescricao = (descricao) => {this.descricao = descricao}
    getDescricao = () => {return this.descricao}

    setVariacao = (variacao) => {this.variacao = variacao}
    getVariacao = () => {return this.variacao}

    setExecucao = (execucao) => {this.execucao = execucao}
    getExecucao = () => {return this.execucao}

    setImagem = (imagem) => {this.imagem = imagem}
    getImagem = () => {return this.imagem}
    
}

export {Exercicio}