import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';

import { ApiService } from './shared/service/api.service';

import { ChartsModule } from 'ng2-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatExpansionModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTooltipModule,
} from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { LoginService } from './shared/service/login.service';
import { DadosPropostasService } from './shared/service/dados-propostas.service';
import { MessageService } from './shared/service/message.service';
import { HeaderComponent } from './components/header/header.component';
import { GraficoComponent } from './components/grafico/grafico.component';
import { TabelaComponent } from './components/tabela/tabela.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UtilService } from './shared/service/utils.service';
import { HttpClientModule } from '@angular/common/http';
import { RequisicaoTesteService } from './shared/service/requisicao-teste.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GraficoComponent,
    TabelaComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    CdkTableModule,
    MatSortModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    NgxChartsModule,
    MatTooltipModule,
    HttpModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    LoginService,
    DadosPropostasService,
    UtilService,
    ApiService,
    MessageService,
    DatePipe,
    RequisicaoTesteService
  ],
  bootstrap: [AppComponent],
  exports: [
    CdkTableModule,
  ]
})
export class AppModule { }
