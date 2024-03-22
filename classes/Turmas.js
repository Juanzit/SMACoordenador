class Turmas {
    constructor(nome, horario, dia, vaga){
        this.nome = nome
        this.horario = horario
        this.dia = dia
        this.vaga = vaga
        this.professor = []
        this.alunos = []
    }

    setNome = (nome) => {this.nome = nome}
    getNome = () => {return this.nome}

    setHorario = (horario) => {this.horario = horario}
    getHorario = () => {return this.horario}

    setDia = (dia) => {this.dia = dia}
    getDia = () => {return this.dia}

    setVaga = (vaga) => {this.vaga = vaga}
    getVaga = () => {return this.vaga}

}

export {Turmas}