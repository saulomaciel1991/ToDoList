import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  constructor( private tarefaService: TarefaService, private navCrtl : NavController) { }

  ngOnInit() {
    
  }

  salvar(){
    this.tarefaService.salvar(this.tarefa, this.voltar())
  }

  voltar(){
    this.navCrtl.navigateBack('/home')
  }

}
