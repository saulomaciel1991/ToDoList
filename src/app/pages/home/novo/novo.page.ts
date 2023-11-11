import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Tarefa } from 'src/app/services/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-novo',
  templateUrl: './novo.page.html',
  styleUrls: ['./novo.page.scss'],
})
export class NovoPage implements OnInit {
  tarefa : Tarefa = new Tarefa()
  categorias : string [] = []
  constructor( private tarefaService: TarefaService, private navCrtl : NavController) { }

  ngOnInit() {
    this.categorias = ['Diversos', 'Compras', 'Filmes', 'Feira', 'Farmacia']
    this.categorias.sort()
  }

  salvar(){
    this.tarefaService.salvar(this.tarefa, this.voltar())
  }

  voltar(){
    this.navCrtl.navigateBack('/home')
  }

}
