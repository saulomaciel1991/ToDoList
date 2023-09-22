import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  tarefaCollection: any[] = [];
  constructor(
    private alertCtrl: AlertController,
    private tarefaService: TarefaService
  ) {}

  ionViewDidEnter() {
    this.listarTarefas();
  }

  listarTarefas() {
    this.tarefaCollection = this.tarefaService.listar();
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
}
