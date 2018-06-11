import { Injectable } from '@angular/core';
import { Proposta } from '../../models/proposta';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class RequisicaoTesteService {

  constructor(private http: Http) { }

  public getDados(): Promise<Proposta[]> {
    return this.http.get('http://localhost:3000/listaPropostaPorStatusEtapa').toPromise()
      .then((result: any) => {
        return result.json();
      })
      .catch((error) => {
        // this.messageService.showErrorMessage('Erro ao conectar-se com a API. Tente novamente mais tarde.');
        return Promise.reject('Erro ao obter os dados da API');
      });
  }
}
