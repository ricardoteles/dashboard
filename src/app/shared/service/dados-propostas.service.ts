import { Injectable } from '@angular/core';

import { LoginService } from './login.service';
import { ApiService } from './api.service';
import { Proposta } from '../../models/proposta';
import { ResponseApi } from '../../models/response-api';
import { MessageService } from './message.service';
import { environment } from '../../../environments/environment.sit';


@Injectable()
export class DadosPropostasService {

  constructor(private loginService: LoginService, private apiService: ApiService, private messageService: MessageService) { }

  async obterDados(dataInicio, dataFim): Promise<Proposta[]> {
    const data = {
      'dataInicio': dataInicio,
      'dataFim': dataFim
    };


    await this.loginService.logar(environment.login, environment.password)
      .then(() => { })
      .catch(erro => {
        console.error(erro);
        this.messageService.showErrorMessage('Falha ao logar. Tente novamente mais tarde.');
        return Promise.reject('Falha ao logar!');
      });

    return this.apiService.post<ResponseApi>('estatistica/propostasPorStatusEtapa', data)
      .then((result) => {
        return result['retorno']['listaPropostaPorStatusEtapa'];
      })
      .catch((error) => {
        this.messageService.showErrorMessage('Erro ao conectar-se com a API. Tente novamente mais tarde.');
        return Promise.reject('Erro ao obter os dados da API');
      });
  }

}
