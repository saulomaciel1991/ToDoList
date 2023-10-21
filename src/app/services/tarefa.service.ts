import { Injectable } from '@angular/core';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  tarefaCollection: any[] = [];
  key: string = 'tarefaCollection';
  constructor() { }

  salvar(tarefa: any, callback: any) {
    tarefa.feito = false;
    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      tarefa.id = uuid.v4()
      this.tarefaCollection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(this.tarefaCollection));
    } else {
      let collection: any[] = JSON.parse(value);
      tarefa.id = uuid.v4()
      collection.push(tarefa);
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
      return collection;
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

  getbyId(tarefaId: string) {
    let tarefas = this.listar()

    if (tarefas != null){
      return {
        ...tarefas.find(tarefa => {
          return tarefa.id == tarefaId
        })
      }
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
