import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { IItem } from '../../items/item/item.interface';
import { ItemService } from '../../items/item/item.service';
import { ReportService } from './general.service';

interface Report {
  id:    number;
  name:  string;
  class: string;
  disable: boolean;
}

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  now = new Date();

  rptSelected:              number = 1;
  rptName:                  string = 'Utilidad por artículo';
  rptDate:                  string = 'Fecha ' + this.formatDate(this.now);

  radioDateSelected:        string = '';
  
  rptFilterItem:            string = '';
  rptFilterClient:          string = '';
  rptFilterBranch:          string = '';
  rptFilterDrawer:          string = '';

  rptDateCurrent:           number = 1;
  rptDateDay:               string = this.formatDate(this.now);
  rptDateWeek:              string = '';
  rptDateMonth:             string = '';
  rptDateYear:              string = '';
  rptDateRangeBegin:        string = '';
  rptDateRangeEnd:          string = '';

  rptDateDayDisable:       boolean = false;
  rptDateWeekDisable:      boolean = true;
  rptDateMonthDisable:     boolean = true;
  rptDateYearDisable:      boolean = true;
  rptDateRangeDisable:     boolean = true;

  rptList:                Report[] = [];

  constructor(private itemService: ItemService,
              private notifyService: NotificationService,
              private reportService: ReportService) { }

  ngOnInit(): void {

    let spcL1 = "&nbsp;".repeat(3);
    let spcL2 = "&nbsp;".repeat(6);

    let rpt: Report = { id:0, name:"UTILIDAD",                    class:"fw-bold", disable:true  };  this.rptList.push(rpt);
    rpt = { id:1, name:spcL1 + "Utilidad por Artículos",          class:"",        disable:false };  this.rptList.push(rpt);
    rpt = { id:2, name:spcL1 + "Utilidad por Clientes",           class:"",        disable:false };  this.rptList.push(rpt);
    rpt = { id:3, name:spcL1 + "Utilidad por Venta",              class:"",        disable:false };  this.rptList.push(rpt);
    rpt = { id:0, name:"VENTAS",                                  class:"fw-bold", disable:true  };  this.rptList.push(rpt);
    rpt = { id:0, name:spcL1 + "ARTÍCULO",                        class:"fw-bold", disable:true  };  this.rptList.push(rpt);
    rpt = { id:4, name:spcL2 + "Ventas por Artículo General",     class:"",        disable:false };  this.rptList.push(rpt);
    rpt = { id:5, name:spcL2 + "Ventas por Artículo por Cliente", class:"",        disable:false };  this.rptList.push(rpt);
    rpt = { id:0, name:spcL1 + "CLIENTE",                         class:"fw-bold", disable:true  };  this.rptList.push(rpt);
    rpt = { id:6, name:spcL2 + "Ventas por Cliente General",      class:"",        disable:false };  this.rptList.push(rpt);
    rpt = { id:7, name:spcL2 + "Ventas por Cliente por Artículo", class:"",        disable:false };  this.rptList.push(rpt);
    rpt = { id:0, name:spcL1 + "SUCURSAL",                        class:"fw-bold", disable:true  };  this.rptList.push(rpt);
    rpt = { id:8, name:spcL2 + "Ventas por Sucursal General",     class:"",        disable:false };  this.rptList.push(rpt);
    rpt = { id:9, name:spcL2 + "Ventas por Sucursal por Cajero",  class:"",        disable:false };  this.rptList.push(rpt);
  }

  onClickGenerate()
  {
    let isValid: boolean = true;
    let params: string[] = [];

    if(this.rptDateCurrent == 1) {
      if(this.rptDateDay == '') {
        this.notifyService.showError('Falta ingresar la fecha','Fecha Día');
        isValid = false;
      }
      else {
        params.push('d='+ this.rptDateDay);
      }
    }
    else if(this.rptDateCurrent == 2) {
      if(this.rptDateWeek == '') {
        this.notifyService.showError('Falta ingresar la semana','Fecha Semana');
        isValid = false;
      }
      else {
        params.push('w='+ this.rptDateWeek);
      }
    }
    else if(this.rptDateCurrent == 3) {
      if(this.rptDateMonth == '') {
        this.notifyService.showError('Falta ingresar el mes','Fecha Mes');
        isValid = false;
      }
      else {
        params.push('m='+ this.rptDateMonth);
      }
    }
    else if(this.rptDateCurrent == 4) {
      if(this.rptDateYear == '') {
        this.notifyService.showError('Falta ingresar el año','Fecha Año');
        isValid = false;
      }
      else {
        params.push('y='+ this.rptDateYear);
      }
    }
    else if(this.rptDateCurrent == 5) {
      if(this.rptDateRangeBegin == '') {
        this.notifyService.showError('Falta ingresar la fecha de inicio','Rango de fechas');
        isValid = false;
      }
      if(this.rptDateRangeEnd == '') {
        this.notifyService.showError('Falta ingresar la fecha final','Rango de fechas');
        isValid = false;
      }

      if(this.rptDateRangeBegin && this.rptDateRangeEnd) {
        let d1 = new Date(this.rptDateRangeBegin);
        let d2 = new Date(this.rptDateRangeEnd);
        if( d1 > d2) {
          this.notifyService.showWarning('La fecha inicial es mayor a la final. Corrección automática.','Rango de fechas');
          let tmp = this.rptDateRangeBegin;
          this.rptDateRangeBegin = this.rptDateRangeEnd;
          this.rptDateRangeEnd = tmp;
        }
      }
      if( isValid ) {
        params.push('rb='+ this.rptDateRangeBegin);
        params.push('re='+ this.rptDateRangeEnd);
      }
    }

    if(isValid) {
      params.unshift('id='+ this.rptSelected);

      let fileName = this.rptName + ' ' + this.toIsoString(new Date()).replace('T', ' ').substring(0,19) + '.pdf';

      this.reportService.getReport(params.join('&')).subscribe({
        next: (response: any) => {
          var downloadURL = window.URL.createObjectURL(response);
          var link = document.createElement('a');
          link.href = downloadURL;
          link.download = fileName;
          link.click();
        },
        error: (error: any) => {
          this.notifyService.showError('Error al obtener el reporte','Generar reportes');
        }
      });
    }
  }

  OnChangeReport(e: any) {
    let rpt = this.rptList.find((obj) => {
      return obj.id === this.rptSelected;
    });
    if(rpt){
      this.rptName = rpt.name.replace(/&nbsp;/g,'');
    }
  }

  OnChangeDate(e: any) {
    this.rptDateDayDisable   = true;
    this.rptDateWeekDisable  = true;
    this.rptDateMonthDisable = true;
    this.rptDateYearDisable  = true;
    this.rptDateRangeDisable = true;

    switch(e.target.id) {
      case 'dateDay':
        this.rptDateDayDisable   = false;
        this.rptDate = 'Fecha ' + this.rptDateDay;
        this.rptDateCurrent      = 1;
        break;
      case 'dateWeek':
        this.rptDateWeekDisable  = false;
        this.rptDate = 'Semana ' + this.rptDateWeek;
        this.rptDateCurrent      = 2;
        break;
      case 'dateMonth':
        this.rptDateMonthDisable = false;
        this.rptDate = 'Mes ' + this.rptDateMonth;
        this.rptDateCurrent      = 3;
        break;
      case 'dateYear':
        this.rptDateYearDisable  = false;
        this.rptDate = 'Año ' + this.rptDateYear;
        this.rptDateCurrent      = 4;
        break;
      case 'dateRange':
        this.rptDateRangeDisable = false;
        this.rptDate = 'Rango ' + this.rptDateRangeBegin + ' - ' + this.rptDateRangeEnd;
        this.rptDateCurrent      = 5;
        break;
    }
  }

  OnChangeCalendar(e: any) {
    switch(e.target.id) {
      case 'dateDayValue':
        this.rptDate = 'Fecha ' + this.rptDateDay;
        break;
      case 'dateWeekValue':
        this.rptDate = 'Semana ' + this.rptDateWeek;
        break;
      case 'dateMonthValue':
        this.rptDate = 'Mes ' + this.rptDateMonth;
        break;
      case 'dateYearValue':
        this.rptDate = 'Año ' + this.rptDateYear;
        break;
      case 'rangeBegin':
        this.rptDate = 'Rango ' + this.rptDateRangeBegin + ' - ' + this.rptDateRangeEnd;
        break;
      case 'rangeEnd':
        this.rptDate = 'Rango ' + this.rptDateRangeBegin + ' - ' + this.rptDateRangeEnd;
        break;
    }
  }

  formatDate(date: Date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  toIsoString(date: Date) {
    var tzo = -date.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function(num: any) {
            return (num < 10 ? '0' : '') + num;
        };
  
    return date.getFullYear() +
        '-' + pad(date.getMonth() + 1) +
        '-' + pad(date.getDate()) +
        'T' + pad(date.getHours()) +
        ':' + pad(date.getMinutes()) +
        ':' + pad(date.getSeconds()) +
        dif + pad(Math.floor(Math.abs(tzo) / 60)) +
        ':' + pad(Math.abs(tzo) % 60);
  }
  

}
