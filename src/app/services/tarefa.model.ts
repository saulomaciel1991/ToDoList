export class Tarefa {
    id!: string
    feito!: boolean
    tarefa!: string
    categoria: string

    constructor(){
        this.categoria = ''
        this.feito = false
        this.tarefa = ''
        this.id = ''
    }
}