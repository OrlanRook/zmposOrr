import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { IGoalMonth, IGoalWeek } from './goals.interface';
import { GoalService } from './goals.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  now = new Date();

  localMonth: string[]      = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                               'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  goals: IGoalMonth[]       = [];
  years:           number[] = [];
  yearGoal:          number = 0;
  currentYear:       number = this.now.getFullYear();
  selectedMonth?:IGoalMonth;
  amountUpdate:      number = 0;
  newYear:           number = this.currentYear + 1;
  newYearAmount:     number = 0;
  newMonthAmount:    number = 0;

  constructor(private notifyService: NotificationService,
              private goalService: GoalService) { }

  ngOnInit(): void {
    this.goalService.getGoals().subscribe({
      next: (data:IGoalMonth[]) => {
        data.forEach(element => {
          if(  !this.years.includes(element.year) ) {
            this.years.push(element.year);
          };
        });
        this.years.sort();
      },
      error: (error) => {
        this.notifyService.showError('Error al obtener los objetivos financieros', 'Objetivos Financieros');
      }
    });

    this.goalService.getGoalsYearly(this.currentYear).subscribe({
      next: (data:IGoalMonth[]) => {
        this.goals = data;
        this.yearGoal = 0;
        this.goals.forEach(element => {
          element.name = this.localMonth[element.month - 1];
          this.yearGoal += Number(element.total);
        });
        this.yearGoal = Math.ceil(this.yearGoal);
      },
      error: (error) => {
        this.notifyService.showError('Error al obtener los objetivos financieros', 'Objetivos Financieros');
      }
    });
  }

  onChangeYear(event: any) {
    this.goalService.getGoalsYearly(event).subscribe({
      next: (data:IGoalMonth[]) => {
        this.goals = data;
        this.yearGoal = 0;
        this.goals.forEach(element => {
          element.name = this.localMonth[element.month - 1];
          this.yearGoal += Number(element.total);
        });
        this.yearGoal = Math.ceil(this.yearGoal);
      },
      error: (error) => {
        this.notifyService.showError('Error al obtener los objetivos financieros', 'Objetivos Financieros');
      }
    });
  }

  onUpdate(data: IGoalMonth) {
    this.selectedMonth = data;
    this.amountUpdate = data.total;
  }

  onChangeYearAmount() {
    this.newMonthAmount = this.newYearAmount / 12.0;
  }

  updateAmount() {
    let amount = Number(this.amountUpdate);
    if(this.selectedMonth) {
      this.goalService.updateGoal(this.selectedMonth, amount).subscribe({
        next: (data:IGoalMonth) => {
          if(this.selectedMonth) {
            this.selectedMonth.total = amount;
          }
          this.yearGoal = 0;
          this.goals.forEach(element => {
            this.yearGoal += Number(element.total);
          });
          this.yearGoal = Math.ceil(this.yearGoal);
          this.notifyService.showSuccess('Objetivo financiero actualizado correctamente', 'Objetivos Financieros');
        },
        error: (error) => {
          this.notifyService.showError('Error al obtener los objetivos financieros', 'Objetivos Financieros');
        }
      });
    }
  }

  newGoal() {
    if( !this.years.includes(this.newYear) ) {

      let newGoals: IGoalMonth[] = [];
      for (let i = 1; i < 13; i++) {
        let newMonth: IGoalMonth = {
          id:           0,
          yearmonth:    0,
          year:         this.newYear,
          month:        i,
          total:        Number((this.newYearAmount / 12.0).toFixed(2)),
          name:         ''
        };
        newGoals.push(newMonth);
      }

      let newGoalWeek: IGoalWeek[] = [];
      for (let i = 1; i < 52; i++) {
        let newWeek: IGoalWeek = {
          id:           0,
          yearweek:     0,
          year:         this.newYear,
          week:         i,
          total:        Number((this.newYearAmount / 52.0).toFixed(2))
        };
        newGoalWeek.push(newWeek);
      }

      this.goalService.createGoals(newGoals).subscribe({
        next: (data:IGoalMonth[]) => {
          this.years.push(this.newYear);
          this.years.sort();
          this.currentYear = this.newYear;
          this.onChangeYear(this.newYear);

          this.goalService.createWeekGoals(newGoalWeek).subscribe({
            next: (data:IGoalWeek[]) => {
              this.notifyService.showSuccess('Objetivos financieron registrados correctamente', 'Objetivos Financieros');
            },
            error: (error) => {
              this.notifyService.showError('Error al registrar los objetivos financieros', 'Objetivos Financieros');
            }
          });
        },
        error: (error) => {
          this.notifyService.showError('Error al registrar los objetivos financieros', 'Objetivos Financieros');
        }
      });
    }
    else {
      this.notifyService.showError('El registro del año seleccionado ya existe', 'Año duplicado');

    }
  }

}
