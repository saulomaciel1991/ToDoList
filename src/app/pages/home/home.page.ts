import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  ActionSheetOptions,
  AlertController,
} from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  tarefaCollection: any[] = [];
  ocultaConcluidos: boolean = false;

  constructor(
    private alertCtrl: AlertController,
    private tarefaService: TarefaService,
    private actionSheetCtrl: ActionSheetController
  ) {}
  
  ngOnInit() {
    this.ocultaConcluidos = this.tarefaService.getConfig()
  }

  ionViewDidEnter() {
    this.listarTarefas();
  }

  listarTarefas() {
    this.tarefaCollection = this.tarefaService.listar();
  }

  excluir(item: any) {
    this.tarefaService.excluir(item, () => {
      this.listarTarefas();
    });
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
          handler: () => {},
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

  async openActions(tarefa: any) {
    // let ac: ActionSheetOptions = {
    //   header: 'O que deseja Fazer?',
    //   buttons: [
    //     {
    //       text: tarefa.feito ? 'Pendente' : 'Feito',
    //       icon: tarefa.feito ? 'square-outline' : 'checkbox',
    //       handler: () => {
    //         tarefa.feito = !tarefa.feito;

    //         this.tarefaService.atualizar(tarefa, () => {
    //           this.listarTarefas()
    //         })
    //       },
    //     },
    //   ],
    // };

    // const actionSheet = await this.actionSheetCtrl.create(ac);

    // actionSheet.present()
    tarefa.feito = !tarefa.feito;
    this.tarefaService.atualizar(tarefa, () => {
      this.listarTarefas();
    });
  }

  alternaFeitos(){
    this.ocultaConcluidos = !this.ocultaConcluidos
    this.tarefaService.setConfig(this.ocultaConcluidos)
    this.listarTarefas()
  }
}
