import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.sit';

export const AUTHORIZATION_TOKEN = 'Authorization';
const X_API_KEY = environment.apiKey;

// @inheritdoc
@Injectable()
export class ApiService {

    private url = environment.serverUrl;

    constructor(private httpClient: HttpClient, public messageService: MessageService) {
    }

    async externalGet<T>(url: string, options?: any): Promise<HttpEvent<T>> {
        try {
            return await this.httpClient.get<T>(url, options).toPromise();
        } catch (error) {
            this.messageService.showErrorMessage('Ocorreu um erro ao obter dado.');
        }
    }

    async externalPost<T>(url: string, body: any, options?: any): Promise<HttpEvent<T>> {
        try {
            return await this.httpClient.post<T>(url, body, options).toPromise();
        } catch (error) {
            this.messageService.showErrorMessage('Ocorreu um erro ao enviar dado.');
        }
    }

    async get<T>(api: string): Promise<T> {
        try {
            return this.getResponse<T>(this.httpClient.get<T>(this.url + api, this.putHeader()));

        } catch (error) {
            this.messageService.showErrorMessage('Ocorreu um erro ao obter dado.');
        }
    }

    async post<T>(api: string, body: any): Promise<T> {
        try {
            return this.getResponse<T>(this.httpClient.post<T>(this.url + api, body, this.putHeader()));
        } catch (error) {
            this.messageService.showErrorMessage('Ocorreu um erro ao obter dado.');
        }
    }

    async put<T>(api: string, body: any): Promise<T> {
        try {
            return this.getResponse<T>(this.httpClient.put<T>(this.url + api, body, this.putHeader()));

        } catch (error) {
            this.messageService.showErrorMessage('Ocorreu um erro ao obter dado.');
        }
    }

    async delete<T>(api: string): Promise<T> {
        try {
            return this.getResponse<T>(this.httpClient.delete<T>(this.url + api, this.putHeader()));

        } catch (error) {
            this.messageService.showErrorMessage('Ocorreu um erro ao obter dado.');
        }
    }

    /*
     * All http request must contains
     * in its header the latest auth-token key
     * provided by ibi backend server.
     */
    private putHeader(options?: any): any {

        const token = localStorage.getItem(AUTHORIZATION_TOKEN) || '';

        if (options) {
            options.headers.set('Authorization', 'Bearer ' + token);
            options.headers.set('x-api-key', X_API_KEY);
            return options;
        }
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token,
                'x-api-key': X_API_KEY,
            })
        };

        return httpOptions;
    }

    private getResponse<T>(request: Observable<any>): Promise<T> {
        return request.toPromise()
            .then((response: any) => {

                if (response.retorno && response.retorno.token) {
                    localStorage.setItem(AUTHORIZATION_TOKEN, response.retorno.token);
                }

                return Promise.resolve(response);
            }).catch((error: Response) => {
                if (error.status === 401 || error.status === 403) {
                    localStorage.removeItem(AUTHORIZATION_TOKEN);
                    // TODO: Aqui é quando o usuário não possui autorização (401, 403)
                } else if (error.status === 504) {
                    // Adiciona mensagem de erro para sistema fora do ar
                    this.messageService.showErrorMessage('Serviço temporariamente indisponível. Tente novamente mais tarde.');
                }
                return Promise.reject(error);
            });
    }
}
