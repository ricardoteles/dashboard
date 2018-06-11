import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class UtilService {

  emisorDatas = new EventEmitter<any>();
  spinnerVisivel = new EventEmitter<boolean>();

  constructor() { }

  emitirDatas(dataInicio, dataFim) {
    const data = {
      inicio: dataInicio,
      fim: dataFim
    };
    this.emisorDatas.emit(data);
  }

  mostrarSpinner(visivel: boolean) {
    this.spinnerVisivel.emit(visivel);
  }
}
