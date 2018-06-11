import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { UtilService } from '../../shared/service/utils.service';
import { MessageService } from '../../shared/service/message.service';
import { DadosPropostasService } from '../../shared/service/dados-propostas.service';
import { RequisicaoTesteService } from '../../shared/service/requisicao-teste.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public dados;
  public unavailability = { dataInicio: new Date(), dataFim: new Date() };

  public formulario: FormGroup;

  constructor(private datePipe: DatePipe, private formBuilder: FormBuilder, 
    private messageService: MessageService, private dadosService: DadosPropostasService,
    private requisicaoTeste: RequisicaoTesteService) {

    this.formulario = this.formBuilder.group({
      dataInicio: [this.unavailability.dataInicio],
      dataFim: [this.unavailability.dataFim]
    });

  }

  ngOnInit() {
  }

  mostraDados() {
    if (!this.formulario.valid) {
      this.messageService.showErrorMessage('Por favor, selecione uma data válida.');
    } else {

      const data = this.formulario.value;

      // soma-se um dia a data de termino
      const dataFimMaisUm = new Date(data['dataFim'].getTime() + (60 * 60 * 24 * 1000)); 

      // formata as datas recebidas do input(html) para passar a API
      const dataInicio = this.datePipe.transform(data['dataInicio'], 'yyyy-MM-dd');
      const dataFim = this.datePipe.transform(dataFimMaisUm, 'yyyy-MM-dd');
      
      this.requisicaoTeste.getDados().then((resposta: any) => {
        this.dados = resposta;
      });

      // this.dadosService.obterDados(dataInicio, dataFim).then(dados => {
      //   // this.dados = dados;
      //   this.dados = {data: '12/04/18'};
      // }).catch(erro => {
      // });
    }
  }
}
