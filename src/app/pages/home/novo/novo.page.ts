import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.page.html',
  styleUrls: ['./novo.page.scss'],
})
export class NovoPage implements OnInit {
  tarefa! : string 
  constructor( private tarefaService: TarefaService, private navCrtl : NavController) { }

  ngOnInit() {
  }

  salvar(){
    let tarefa : any  = {tarefa : this.tarefa}
    this.tarefaService.salvar(tarefa, this.voltar())
  }

  voltar(){
    this.navCrtl.navigateBack('/home')
  }

}
