import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  tarefaCollection: any[] = [];
  key: string = 'tarefaCollection';
  config: string = 'config';
  constructor() {}

  salvar(tarefa: any, callback: any) {
    tarefa.feito = false;

    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      tarefa.id = this.tarefaCollection.length + 1;
      this.tarefaCollection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(this.tarefaCollection));
    } else {
      let collection: any[] = JSON.parse(value);
      tarefa.id = this.tarefaCollection.length + 1;
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
        return tarefa.tarefa != item.tarefa;
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

      debugger
      if (pos > -1) {
        collection[pos] = tarefa
      }

      localStorage.setItem(this.key, JSON.stringify(collection));
    }

    if (callback != undefined) {
      callback();
    }
  }

  setConfig(config: any) {
    localStorage.setItem(this.config, config);
  }

  getConfig(): boolean {
    let ret = null;

    if (localStorage.getItem(this.config) == 'true') {
      ret = true;
    } else {
      ret = false;
    }

    return ret;
  }
}
