import { Component, OnInit, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { INewItem } from '../items/item/item.interface';
import { IClient, ClientVoid } from '../records/client/client.interface';
import { DashboardService } from './dashboard.service';
import { ISaleWeekly, ISaleYearly, ISaleYearlySummary } from 'src/app/site/sales/sales.interface';
import { TitleStrategy } from '@angular/router';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexMarkers,
  ApexDataLabels,
  ApexStroke,
  ApexFill,
  ApexTooltip
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
  markers: ApexMarkers;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  colors: any[];
  fill: ApexFill;
  tooltip: ApexTooltip;
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptWeeklySales: Partial<ChartOptions> | any;
  public chartOptWeeklyReturns: Partial<ChartOptions> | any;
  public chartOptWeeklyOrders: Partial<ChartOptions> | any;
  public chartOptWeeklyRepairs: Partial<ChartOptions> | any;
  public chartOptYearlySales: Partial<ChartOptions> | any;

  userDetail: IClient       = ClientVoid;
  users: IClient[]          = []
  topProducts: INewItem[]   = []
  emptyStock: INewItem[]    = []

  weeklySales?: number      = 0;
  weeklySalesCnt?: number   = 0;
  weeklyReturns: number     = 0;
  weeklyReturnsCnt: number  = 0;
  weeklyOrders: number      = 0;
  weeklyOrdersCnt: number   = 0;
  weeklyRepairs: number     = 0;
  weeklyRepairsCnt: number  = 0;

  localMonth: string[]      = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                               'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  currentDate               = new Date();
  monthName: string         = this.localMonth[this.currentDate.getMonth()] + ' ' + this.currentDate.getFullYear();
  monthlySalesWThis: number = 0;
  monthlySalesWPrev: number = 0;
  monthlySalesThis: number  = 0;
  monthylSalesPrev: number  = 0;

  monthlySalesWGoal1: number = 100;
  monthlySalesWGoal2: number = 100;
  monthlySalesGoal1: number  = 100;
  monthlySalesGoal2: number  = 100;

  yearlyTitle:        string = this.currentDate.getFullYear()- 1 + ' vs ' + this.currentDate.getFullYear();
  yearlyYear:         number = 0;
  yearlyClient:       number = 0;
  yearlyPublic:       number = 0;
  yearlyIncome:       number = 0;
  yearlyIncomeClient: number = 0;
  yearlyIncomePublic: number = 0;

  yearlyIncomeIcon:        string = '';
  yearlyIncomeColor:       string = '';
  yearlyIncomeClientIcon:  string = '';
  yearlyIncomeClientColor: string = '';
  yearlyIncomePublicIcon:  string = '';
  yearlyIncomePublicColor: string = '';


  constructor(private dashboardService: DashboardService,
              private notifyService: NotificationService) {

    this.chartOptWeeklySales = {
      series: [{
        name: "Weekly sales",
        data: [0,0,0,0, 0,0,0,0, 0,0,0,0]
      }],
      chart: {
        type: "line",
        height: 65,
        toolbar: {
          show: !1
        },
        zoom: {
          enabled: !1
        },
        dropShadow: {
          enabled: !0,
          top: 3,
          left: 14,
          blur: 4,
          opacity: .12,
          color: "#17a00e"
        },
        sparkline: {
          enabled: !0
        }
      },
      markers: {
        size: 0,
        colors: ["#17a00e"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      dataLabels: {
        enabled: !1
      },
      stroke: {
        show: !0,
        width: 3,
        curve: "smooth"
      },
      colors: ["#17a00e"],
      xaxis: {
        categories: [0,0,0,0, 0,0,0,0, 0,0,0,0]
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        theme: "dark",
        fixed: {
          enabled: !1
        },
        y: {
          formatter: function (e: any) {
            var formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              });
            return formatter.format(e);
          }
        },
        marker: {
          show: false
        }
      }
    };
    this.chartOptWeeklyReturns = {
      series: [{
        name: "Weekly returns",
        data: [0,0,0,0, 0,0,0,0, 0,0,0,0]
      }],
      chart: {
        type: "line",
        height: 65,
        toolbar: {
          show: !1
        },
        zoom: {
          enabled: !1
        },
        dropShadow: {
          enabled: !0,
          top: 3,
          left: 14,
          blur: 4,
          opacity: .12,
          color: "#f41127"
        },
        sparkline: {
          enabled: !0
        }
      },
      markers: {
        size: 0,
        colors: ["#f41127"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      dataLabels: {
        enabled: !1
      },
      stroke: {
        show: !0,
        width: 3,
        curve: "smooth"
      },
      colors: ["#f41127"],
      xaxis: {
        categories: [0,0,0,0, 0,0,0,0, 0,0,0,0]
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        theme: "dark",
        fixed: {
          enabled: !1
        },
        y: {
          formatter: function (e: any) {
            var formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              });
            return formatter.format(e);
          }
        },
        marker: {
          show: false
        }
      }
    };
    this.chartOptWeeklyOrders = {
      series: [{
        name: "Weekly orders",
        data: [0,0,0,0, 0,0,0,0, 0,0,0,0]
      }],
      chart: {
        type: "line",
        height: 65,
        toolbar: {
          show: !1
        },
        zoom: {
          enabled: !1
        },
        dropShadow: {
          enabled: !0,
          top: 3,
          left: 14,
          blur: 4,
          opacity: .12,
          color: "#ffc107"
        },
        sparkline: {
          enabled: !0
        }
      },
      markers: {
        size: 0,
        colors: ["#ffc107"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      dataLabels: {
        enabled: !1
      },
      stroke: {
        show: !0,
        width: 3,
        curve: "smooth"
      },
      colors: ["#ffc107"],
      xaxis: {
        categories: [0,0,0,0, 0,0,0,0, 0,0,0,0]
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        theme: "dark",
        fixed: {
          enabled: !1
        },
        y: {
          formatter: function (e: any) {
            var formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              });
            return formatter.format(e);
          }
        },
        marker: {
          show: false
        }
      }
    };
    this.chartOptWeeklyRepairs = {
      series: [{
        name: "Weekly repairs",
        data: [0,0,0,0, 0,0,0,0, 0,0,0,0]
      }],
      chart: {
        type: "line",
        height: 65,
        toolbar: {
          show: !1
        },
        zoom: {
          enabled: !1
        },
        dropShadow: {
          enabled: !0,
          top: 3,
          left: 14,
          blur: 4,
          opacity: .12,
          color: "#0d6efd"
        },
        sparkline: {
          enabled: !0
        }
      },
      markers: {
        size: 0,
        colors: ["#0d6efd"],
        strokeColors: "#fff",
        strokeWidth: 2,
        hover: {
          size: 7
        }
      },
      dataLabels: {
        enabled: !1
      },
      stroke: {
        show: !0,
        width: 3,
        curve: "smooth"
      },
      colors: ["#0d6efd"],
      xaxis: {
        categories: [0,0,0,0, 0,0,0,0, 0,0,0,0]
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        theme: "dark",
        fixed: {
          enabled: !1
        },
        y: {
          formatter: function (e: any) {
            var formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              });
            return formatter.format(e);
          }
        },
        marker: {
          show: false
        }
      }
    };
    this.chartOptYearlySales = {
      series: [{
        name: "2021",
        data: [0,0,0,  0,0,0,  0,0,0,  0,0,0]
      }, {
        name: "2022",
        data: [0,0,0,  0,0,0,  0,0,0,  0,0,0]
      }],
      chart: {
        foreColor: "#9ba7b2",
        type: "bar",
        height: 300,
        toolbar: {
          show: !1
        }
      },
      plotOptions: {
        bar: {
          horizontal: !1,
          columnWidth: "55%",
          endingShape: "rounded"
        }
      },
      dataLabels: {
        enabled: !1
      },
      stroke: {
        show: !0,
        width: 2,
        colors: ["transparent"]
      },
      colors: ["#6a1067", "#e514a3"],
      xaxis: {
        categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      },
      fill: {
        opacity: 1
      },
      tooltip: {
        theme: "dark",
        y: {
          formatter: function (e: any) {
            return "$ " + e
          }
        }
      }
    };
  }

  ngOnInit(): void {

    this.dashboardService.getNewClients().subscribe({
      next: (data: IClient[]) => {
        this.users = data;
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener clientes');
      }
    })

    this.dashboardService.getTopProducts().subscribe({
      next: (data: INewItem[]) => {
        this.topProducts =data;
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener productos');
      }
    })

    this.dashboardService.getEmptyStock().subscribe({
      next: (data: INewItem[]) => {
        this.emptyStock = data;
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener productos');
      }
    })

    this.dashboardService.getWeeklySales().subscribe({
      next: (data: ISaleWeekly[]) => {
        let valueSerie: number[] = [];
        let xaxis: string[] = [];
        data.forEach(element => {
          valueSerie.push(element.total);
          xaxis.push(element.year + '-' + (element.week).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
        });
        this.chartOptWeeklySales.series = [{ name:'', data: valueSerie }];
        this.chartOptWeeklySales.xaxis = { categories: xaxis };
        var lastItem = data[11];
        this.weeklySales = lastItem?.total;
        this.weeklySalesCnt = lastItem?.quantity;
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener las ventas semanales');
      }
    });

    this.dashboardService.getWeeklyReturns().subscribe({
      next: (data: ISaleWeekly[]) => {
        let valueSerie: number[] = [];
        let xaxis: string[] = [];
        data.forEach(element => {
          valueSerie.push(element.total);
          xaxis.push(element.year + '-' + (element.week).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
        });
        this.chartOptWeeklyReturns.series = [{ name:'', data: valueSerie }];
        this.chartOptWeeklyReturns.xaxis = { categories: xaxis };
        var lastItem = data[11];
        this.weeklyReturns = lastItem?.total;
        this.weeklyReturnsCnt = lastItem?.quantity;
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener las devoluciones semanales');
      }
    });

    this.dashboardService.getWeeklyOrders().subscribe({
      next: (data: ISaleWeekly[]) => {
        let valueSerie: number[] = [];
        let xaxis: string[] = [];
        data.forEach(element => {
          valueSerie.push(element.total);
          xaxis.push(element.year + '-' + (element.week).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
        });
        this.chartOptWeeklyOrders.series = [{ name:'', data: valueSerie }];
        this.chartOptWeeklyOrders.xaxis = { categories: xaxis };
        var lastItem = data[11];
        this.weeklyOrders = lastItem?.total;
        this.weeklyOrdersCnt = lastItem?.quantity;
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener las órdenes semanales');
      }
    });

    this.dashboardService.getWeeklyRepairs().subscribe({
      next: (data: ISaleWeekly[]) => {
        let valueSerie: number[] = [];
        let xaxis: string[] = [];
        data.forEach(element => {
          valueSerie.push(element.total);
          xaxis.push(element.year + '-' + (element.week).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false}));
        });
        this.chartOptWeeklyRepairs.series = [{ name:'', data: valueSerie }];
        this.chartOptWeeklyRepairs.xaxis = { categories: xaxis };
        var lastItem = data[11];
        this.weeklyRepairs = lastItem?.total;
        this.weeklyRepairsCnt = lastItem?.quantity;
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener las reparaciones semanales');
      }
    });

    this.dashboardService.getCurrentWeeklySales().subscribe({
      next: (data: ISaleWeekly[]) => {
        this.monthlySalesWThis = data[0].total;
        this.monthlySalesWPrev = data[1].total;
        this.monthlySalesThis  = data[2].total;
        this.monthylSalesPrev  = data[3].total;

        this.monthlySalesWGoal1 = data[0].total * 100.0 / data[0].goal;
        this.monthlySalesWGoal2 = data[1].total * 100.0 / data[1].goal;
        this.monthlySalesGoal1  = data[2].total * 100.0 / data[2].goal;
        this.monthlySalesGoal2  = data[3].total * 100.0 / data[3].goal;
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener el resumen de ventas');
      }
    });

    this.dashboardService.getCurrentYearlySales().subscribe({
      next: (data: ISaleYearly[]) => {
        let y1 = this.currentDate.getFullYear() - 1;
        let y2 = this.currentDate.getFullYear();

        let arr1 = new Array<number>(12);
        let arr2 = new Array<number>(12);

        data.forEach(element => {
          if( element.year == y1 ) arr1[element.month-1] = element.total;
          if( element.year == y2 ) arr2[element.month-1] = element.total;
        });
        this.chartOptYearlySales.series = [{
          name: y1,
          data: arr1
        }, {
          name: y2,
          data: arr2
        }];
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener las ventas anuales');
      }
    });

    this.dashboardService.getCurrentYearlySummarySales().subscribe({
      next: (data: ISaleYearlySummary[]) => {
        data.forEach(element => {
          switch(element.att) {
            case 'year':
              this.yearlyYear         = element.total;
              break;
            case 'client':
              this.yearlyClient       = element.total;
              break;
            case 'public':
              this.yearlyPublic       = element.total;
              break;
            case 'incoming':
              this.yearlyIncome       = element.total;
              if( element.total >= 0){
                this.yearlyIncomeIcon  = 'bx bxs-up-arrow';
                this.yearlyIncomeColor = 'text-success';
              }
              else {
                this.yearlyIncomeIcon  = 'bx bxs-down-arrow';
                this.yearlyIncomeColor = 'text-danger';
              }
              break;
            case 'incomingClient':
              this.yearlyIncomeClient = element.total;
              if( element.total >= 0){
                this.yearlyIncomeClientIcon  = 'bx bxs-up-arrow';
                this.yearlyIncomeClientColor = 'text-success';
              }
              else {
                this.yearlyIncomeClientIcon  = 'bx bxs-down-arrow';
                this.yearlyIncomeClientColor = 'text-danger';
              }
              break;
            case 'incomingPublic':
              this.yearlyIncomePublic = element.total;
              if( element.total >= 0){
                this.yearlyIncomePublicIcon  = 'bx bxs-up-arrow';
                this.yearlyIncomePublicColor = 'text-success';
              }
              else {
                this.yearlyIncomePublicIcon  = 'bx bxs-down-arrow';
                this.yearlyIncomePublicColor = 'text-danger';
              }
              break;
          }
        });
      },
      error: (error) => {
        this.notifyService.showError(error, 'Error al obtener las ventas anuales');
      }
    });
  }

  clientDetailModal(data: IClient){
    this.userDetail = data;
  }

}
