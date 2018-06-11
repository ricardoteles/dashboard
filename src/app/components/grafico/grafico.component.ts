import { Component, OnInit, Input } from '@angular/core';
import { DadosPropostasService } from '../../shared/service/dados-propostas.service';
import { EventEmitter } from 'events';
import { UtilService } from '../../shared/service/utils.service';

@Component({
  selector: 'app-grafico',
  templateUrl: './grafico.component.html',
  styleUrls: ['./grafico.component.scss']
})
export class GraficoComponent implements OnInit {
  @Input() public dados;

  qtdeTotalPropostas: number;
  qtdePropostasAprovadas: number;
  qtdePropostasReprovadas: number;
  dadosGraficoDisponivel = false;
  dadosGrafico: any[];
  view: any[] = [650, 350];

  // options
  showLegend = false;

  colorScheme = {
    domain: ['#EE7777', '#3BDC8A']
  };

  // pie
  showLabels = false;
  explodeSlices = false;
  doughnut = true;

  constructor(private utilService: UtilService) { }

  ngOnInit() {
    console.log(this.dados);
    this.geraGrafico();
  }

  public geraGrafico() {
    this.inicializaAtributos();
    this.dadosAcumulados();
    this.desenhaGrafico();  
  }

  inicializaAtributos() {
    this.utilService.mostrarSpinner(true);

    this.qtdePropostasAprovadas = 0;
    this.qtdePropostasReprovadas = 0;
    this.dadosGrafico = [];
    this.dadosGraficoDisponivel = false;
  }

  dadosAcumulados() {
    const qtddPropostas = this.dados.map(a => a.qtddPropostas);
    this.qtdeTotalPropostas = qtddPropostas.reduce((a, b) => a + b, 0);

    // calcula a quantidade de propostas aprovadas
    this.dados.forEach(elem => {
      if (elem['status'] === 'APROVADA') {
        this.qtdePropostasAprovadas += elem['qtddPropostas'];
        console.log(elem['valor']);
      }
    });

    this.qtdePropostasReprovadas = this.qtdeTotalPropostas - this.qtdePropostasAprovadas;
  }

  desenhaGrafico() {
    this.dadosGrafico.push({
      name: 'REPROVADAS',
      value: this.qtdePropostasReprovadas
    },
      {
        name: 'APROVADAS',
        value: this.qtdePropostasAprovadas
      });

    this.utilService.mostrarSpinner(false);

    if (this.dadosGrafico.length > 0) {

      Object.assign(this.dadosGrafico);
      this.dadosGraficoDisponivel = true;
    }
  }

  onSelect(event) {
    console.log(event);
  }
}
