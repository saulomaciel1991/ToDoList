import { Injectable } from '@angular/core';
import * as uuid from 'uuid';
import { Categoria } from './categoria.model';
import { Tarefa } from './tarefa.model';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  tarefaCollection: Tarefa[] = [];
  key: string = 'tarefaCollection';
  constructor() { }

  salvar(tarefa: Tarefa, callback: any) {
    tarefa.feito = false;
    let value = localStorage.getItem(this.key);
    if (tarefa.categoria == '') {
      tarefa.categoria = 'Diversos'
    }

    if (value == null || value == undefined) {
      tarefa.id = uuid.v4()
      this.tarefaCollection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(this.tarefaCollection));
    } else {
      let collection: any[] = JSON.parse(value);

      if (tarefa.id == undefined || tarefa.id == null || tarefa.id.length == 0) {
        tarefa.id = uuid.v4()
        collection.push(tarefa);
      } else {
        collection.find(el => {
          if (el.id == tarefa.id) {
            el.tarefa = tarefa.tarefa
            el.categoria = tarefa.categoria
          }
        })
      }

      localStorage.setItem(this.key, JSON.stringify(collection));
    }

    if (callback != undefined) {
      callback();
    }
  }

  listar() {
    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      return [];
    } else {
      let collection: any[] = JSON.parse(value);
      collection.sort(
        (a, b) => a.feito - b.feito || a.tarefa.localeCompare(b.tarefa)
      );
      collection.forEach(el => {
        if (el.categoria == null || el.categoria == undefined) {
          el.categoria = 'Diversos'
        }
      })
      return collection;
    }
  }

  listarPorCategoria(categoria: string) {
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return [];
    } else {
      let collection: Tarefa[] = JSON.parse(value);
      const result = collection.filter(el => {
        return el.categoria == categoria
      })
      return result;
    }
  }

  excluir(item: any, callback: any) {
    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      return;
    } else {
      let collection: any[] = JSON.parse(value);
      collection = collection.filter((tarefa) => {
        return tarefa.id != item.id;
      });

      localStorage.setItem(this.key, JSON.stringify(collection));

      if (callback != undefined) {
        callback();
      }
      return;
    }
  }

  excluirConcluidos(callback: any) {
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return;
    } else {
      let collection: any[] = JSON.parse(value);
      collection = collection.filter((tarefa) => {
        return tarefa.feito === false
      });

      localStorage.setItem(this.key, JSON.stringify(collection));

      if (callback != undefined) {
        callback();
      }
      return;
    }
  }

  concluirTodas(callback: any) {
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return;
    } else {
      let collection: any[] = JSON.parse(value);
      collection = collection.filter((tarefa) => {
        return tarefa.feito = true
      });

      localStorage.setItem(this.key, JSON.stringify(collection));

      if (callback != undefined) {
        callback();
      }
      return;
    }
  }

  atualizar(tarefa: any, callback: any) {
    let value = localStorage.getItem(this.key);
    if (value == null || value == undefined) {
      return;
    } else {
      let collection: any[] = JSON.parse(value);
      let pos = collection.findIndex((item) => {
        return item.id == tarefa.id;
      });

      if (pos > -1) {
        collection[pos] = tarefa;
      }

      localStorage.setItem(this.key, JSON.stringify(collection));
    }

    if (callback != undefined) {
      callback();
    }
  }

  getbyId(tarefaId: string): any {
    let tarefas = this.listar() as Tarefa[]
    const result = tarefas.filter(el => {
      return el.id == tarefaId
    })
    if (result.length > 0) {
      return { ...result[0] }
    } else {
      return []
    }
  }

  getCategorias(): string[] {
    let lista: any = localStorage.getItem('categorias');
    let categorias: string[] = []
    
    if (lista != null && lista != undefined){ 
      categorias = JSON.parse(lista);
      return categorias
    }else{
      categorias.push('Diversos')
      return categorias
    }
    
  }

  setCategorias(categoria: any, callback: any) {
    let cat = new Categoria()
    let lista: any = localStorage.getItem('categorias');
    
    if (lista != null && lista != undefined){ 
      cat.categorias = JSON.parse(lista);
      cat.categorias.push(categoria.categoria)
      localStorage.setItem('categorias', JSON.stringify(cat.categorias));
    }else{
      cat.categorias.push(categoria.categoria)
      localStorage.setItem('categorias', JSON.stringify(cat.categorias))
    }

    if (callback != undefined) {
      callback();
    }
  }

  setConfig(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  getConfig(key: string): any {
    let result = localStorage.getItem(key)
    let ret = null

    if (result === 'true') {
      ret = true
    } else if (result === 'false' || result === undefined || result === null) {
      ret = false
    } else {
      ret = result
    }

    return ret
  }


}
