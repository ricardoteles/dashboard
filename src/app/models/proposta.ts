export class Proposta {
    status: string;
    etapa: string;
    qtddPropostas: number;

    constructor(status: string, etapa: string, qtddPropostas: number) {
        this.status = status;
        this.etapa = etapa;
        this.qtddPropostas = qtddPropostas;
    }
}
