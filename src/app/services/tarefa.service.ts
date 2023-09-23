import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TarefaService {
  tarefaCollection: any[] = [];
  key: string = 'tarefaCollection';
  constructor() {}

  salvar(tarefa: any, callback: any) {
    tarefa.feito = false;

    let value = localStorage.getItem(this.key);

    if (value == null || value == undefined) {
      this.tarefaCollection.push(tarefa);
      localStorage.setItem(this.key, JSON.stringify(this.tarefaCollection));
    } else {
      let collection: any[] = JSON.parse(value);
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
      collection.find((item) => {
        if (item.tarefa == tarefa.tarefa){
          item.feito = tarefa.feito
        }
        return item.tarefa == tarefa.tarefa;
      });

      localStorage.setItem(this.key, JSON.stringify(collection));
    }

    if (callback != undefined) {
      callback();
    }
  }
}
