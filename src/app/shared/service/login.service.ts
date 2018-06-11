import { ApiService, AUTHORIZATION_TOKEN } from './api.service';
import { RequestOptions, Headers } from '@angular/http';
import { ResponseApi } from '../../models/response-api';
import { Injectable } from '@angular/core';
import { Usuario } from '../../models/usuario';

@Injectable()
export class LoginService {
  logado: Promise<void>;

  constructor(private apiService: ApiService) { }

  public logar(usuario: string, senha: string): Promise<void> {
    if (localStorage.getItem(AUTHORIZATION_TOKEN) != null) {
      return Promise.resolve();
    }

    const user = new Usuario(usuario, senha);

    this.logado = this.apiService.post<ResponseApi>('login', user)
      .then((result) => {
        return Promise.resolve();
      })
      .catch((error) => {
        console.error(error);
        return Promise.reject(error);
      });

    return this.logado;
  }
}
