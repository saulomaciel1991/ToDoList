export class Categoria {
    categorias! : any

    constructor() {
        this.categorias = ['Diversos', 'Compras', 'Filmes', 'Feira', 'Farmacia']
        this.categorias.sort()
    }
}