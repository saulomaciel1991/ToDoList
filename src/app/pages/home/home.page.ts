import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  ActionSheetOptions,
  AlertController,
} from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';

import { Optional } from '@angular/core';
import { IonRouterOutlet, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { Router } from '@angular/router';
import { Tarefa } from 'src/app/services/tarefa.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  tarefaCollection: Tarefa[] = [];
  ocultaConcluidos: boolean = false;
  tarefaAtual: any = { id: '', tarefa: '', status: '' }
  marcacaoSimples: boolean = false
  categorias: string[] = []

  constructor(
    private alertCtrl: AlertController,
    private tarefaService: TarefaService,
    private actionSheetCtrl: ActionSheetController,
    private platform: Platform,
    private router: Router,
    @Optional() private routerOutlet: IonRouterOutlet
  ) {
    this.platform.backButton.subscribeWithPriority(-1, () => {
      if (!this.routerOutlet.canGoBack()) {
        App.exitApp();
      }
    });
  }

  ngOnInit() {
   
  }

  ionViewDidEnter() {
    this.ocultaConcluidos = this.tarefaService.getConfig('ocultaConcluidos');
    this.marcacaoSimples = this.tarefaService.getConfig('marcacaoSimples');
    this.categorias = this.tarefaService.getCategorias()
    this.listarTarefas();
  }

  alternaMarcacao() {
    this.marcacaoSimples = !this.marcacaoSimples
    this.tarefaService.setConfig("marcacaoSimples", this.marcacaoSimples);
  }

  listarTarefas() {
    this.tarefaCollection = this.tarefaService.listar();
  }

  excluir(item: any) {
    this.tarefaService.excluir(item, () => {
      this.listarTarefas();
    });
  }

  atualizar(item: any) {
    this.tarefaAtual = item
    this.edit()
  }

  async edit() {
    const inputTarefa: any = document.querySelector("#input-tarefa")
    inputTarefa.value = this.tarefaAtual.tarefa
  }

  limpar() {
    const inputTarefa: any = document.querySelector("#input-tarefa")
    inputTarefa.value = ''
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      header: 'Informe a Tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          placeholder: 'Descreva sua tarefa',
        },
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { },
        },
        {
          text: 'Salvar',
          handler: (tarefa) => {
            this.tarefaService.salvar(tarefa, () => {
              this.listarTarefas();
            });
          },
        },
      ],
    });

    alert.present();
  }

  async showEdit(tarefa: any) {
    const alert = await this.alertCtrl.create({
      header: 'Atualize a Tarefa',
      inputs: [
        {
          name: 'tarefa',
          type: 'text',
          value: tarefa.tarefa,
        },
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => { },
        },
        {
          text: 'Salvar',
          handler: (form) => {
            tarefa.tarefa = form.tarefa
            this.tarefaService.atualizar(tarefa, () => {
              this.listarTarefas();
            });
          },
        },
      ],
    });

    alert.present();
  }

  async openActions(tarefa: any) {

    if (this.marcacaoSimples) {
      tarefa.feito = !tarefa.feito;
      this.tarefaService.atualizar(tarefa, () => {
        this.listarTarefas();
      });
    } else {
      let ac: ActionSheetOptions = {
        header: 'Opções?',
        buttons: [
          {
            text: tarefa.feito ? 'Marcar Como Pendente' : 'Marcar Como Concluido',
            icon: tarefa.feito ? 'information-circle' : 'checkmark-circle',
            handler: () => {
              tarefa.feito = !tarefa.feito;

              this.tarefaService.atualizar(tarefa, () => {
                this.listarTarefas()
              })
            },
          },
          {
            text: 'Editar',
            icon: 'pencil',
            handler: () => {
              this.router.navigate(['/', 'home', 'editar', tarefa.id])
            },
          },
          {
            text: 'Excluir',
            icon: 'trash',
            role: 'delete',
            handler: () => {
              this.tarefaService.excluir(tarefa, () => {
                this.listarTarefas()
              })
            },
          }
        ],
      };

      const actionSheet = await this.actionSheetCtrl.create(ac);
      actionSheet.present()
    }
  }

  alternaFeitos() {
    this.ocultaConcluidos = !this.ocultaConcluidos;
    this.tarefaService.setConfig("ocultaConcluidos", this.ocultaConcluidos);
    this.listarTarefas();
  }

  excluirTarefasFeitas() {
    this.tarefaService.excluirConcluidos(() => {
      this.listarTarefas();
    })
  }

  concluirTodas() {
    this.tarefaService.concluirTodas(() => {
      this.listarTarefas();
    })
  }

  listarPorCategoria(categoria: string): Tarefa[] {
    let lista: Tarefa[]

    lista = this.tarefaService.listarPorCategoria(categoria)

    return lista
  }
}
