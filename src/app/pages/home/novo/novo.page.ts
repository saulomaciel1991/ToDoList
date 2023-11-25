import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { Categoria } from 'src/app/services/categoria.model';
import { Tarefa } from 'src/app/services/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.page.html',
  styleUrls: ['./novo.page.scss'],
})
export class NovoPage implements OnInit {
  categorias : string[] = new Categoria().categorias
  tarefa : Tarefa = new Tarefa()
  constructor( private tarefaService: TarefaService, private navCrtl : NavController, private alertCtrl : AlertController) { }

  ngOnInit() {
    this.categorias = this.tarefaService.getCategorias()
  }

  salvar(){
    this.tarefaService.salvar(this.tarefa, this.voltar())
  }

  voltar(){
    this.navCrtl.navigateBack('/home')
  }

  async showAdd() {
    const alert = await this.alertCtrl.create({
      header: 'Informe a categoria',
      inputs: [
        {
          name: 'categoria',
          type: 'text',
          placeholder: 'Descreva sua categoria',
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
          handler: (categoria : Categoria) => {
            this.tarefaService.setCategorias(categoria)
          },
        },
      ],
    });

    alert.present();
  }
}
