import { Component, ViewChild, OnInit, Input } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { DadosPropostasService } from '../../shared/service/dados-propostas.service';
import { Proposta } from '../../models/proposta';
import { UtilService } from '../../shared/service/utils.service';

@Component({
    selector: 'app-tabela',
    templateUrl: './tabela.component.html',
    styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent implements OnInit {
    @Input() public dados;
    listaPropostas: Proposta[];
    displayedColumns = ['index', 'etapa', 'status', 'qtddPropostas', 'valor'];
    dataSource = new MatTableDataSource();
    public dadosTabelaDisponivel: boolean;

    @ViewChild(MatSort) sort: MatSort;

    constructor(private dadosService: DadosPropostasService, private utilService: UtilService) {
    }

    ngOnInit() {
        // this.utilService.emisorDatas.subscribe(data => {
        //     this.geraTabela(data.inicio, data.fim);
        // });
        this.geraTabela();
    }

    geraTabela() {

        this.listaPropostas = this.dados;

        if (this.listaPropostas.length > 0) {
            this.dataSource = new MatTableDataSource<Proposta>(this.listaPropostas);
            this.dataSource.sort = this.sort;
            this.dadosTabelaDisponivel = true;
        }
    }
}
