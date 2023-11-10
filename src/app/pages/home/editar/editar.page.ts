import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Tarefa } from 'src/app/services/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {

  tarefaCarregada! : Tarefa
  constructor(private tarefaService : TarefaService, private navCrtl : NavController, private activateRoute : ActivatedRoute) { }

  ngOnInit() {
    this.tarefaCarregada = {
      tarefa : 'Teste',
      id : '10',
      feito : false
    }

    this.activateRoute.paramMap.subscribe( paramMap =>{
      if(!paramMap.has('tarefaId')){
        this.navCrtl.navigateBack('/home')
        return
      }
      let paramId : any = paramMap.get('tarefaId')
      this.tarefaCarregada = this.tarefaService.getbyId(paramId) as Tarefa
    })
  }

  salvar(){
    let tarefa : Tarefa  = this.tarefaCarregada
    this.tarefaService.salvar(tarefa, this.voltar())
  }

  voltar(){
    this.navCrtl.navigateBack('/home')
  }

}
