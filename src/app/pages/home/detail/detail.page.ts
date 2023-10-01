import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TarefaService } from 'src/app/services/tarefa.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {
  tarefaCarregada: any = null
  status: string = ''

  constructor(private tarefasService: TarefaService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('tarefaId')) {
        //in the future, will redirect
        return
      }
      const tarefaId: any = paramMap.get('tarefaId')
      this.tarefaCarregada = this.tarefasService.getbyId(tarefaId)
      this.status = this.tarefaCarregada.feito ? 'Concluída' : 'Pendente'
    })
  }

}
