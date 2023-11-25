import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Categoria } from 'src/app/services/categoria.model';
import { Tarefa } from 'src/app/services/tarefa.model';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  categorias : string[] = new Categoria().categorias
  tarefaCarregada! : Tarefa
  constructor(private tarefaService : TarefaService, private navCrtl : NavController, private activateRoute : ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.paramMap.subscribe( paramMap =>{
      if(!paramMap.has('tarefaId')){
        this.navCrtl.navigateBack('/home')
        return
      }
      let paramId : any = paramMap.get('tarefaId')
      this.tarefaCarregada = this.tarefaService.getbyId(paramId)
      this.categorias = this.tarefaService.getCategorias()
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
