import { Component, OnInit } from '@angular/core';
import { EmployeeService } from './employee.service';
import { clone, IProfile, IRole, ProfileVoid } from 'src/app/site/profile/profile.interface';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/notification.service';

import * as $ from 'jquery';

type dtModel = IProfile;
const dtModelVoid = ProfileVoid;

const toastTitle    = 'Empleados';
const toastCSuccess = 'Empleado creado correctamente';
const toastCFailure = 'No se pudo crear el empleado';
const toastRSuccess = 'Empleados leidos correctamente';
const toastRFailure = 'Error al obtener la lista de empleados';
const toastUSuccess = 'Empleado actualizado correctamente';
const toastUFailure = 'No se pudo actualizar el empleado';
const toastDSuccess = 'Empleado elimando correctamente';
const toastDFailure = 'No se pudo eliminar el empleado';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  filterValue:        string = '';
  filteredCount              = { count: 0 };

  pagSize:                number = 10;
  pagPage:                number = 1;
  pagTotal:               number = 0;
  pagMessage:             string = '';

  isDeleting:             string = 'bg-danger';
  isDelFontColor:         string = 'text-white';

  dataBinding:         dtModel[] = [];
  dataSelected:          dtModel = { ...dtModelVoid };
  dataPrevious:          dtModel = { ...dtModelVoid };

  selectedFiles?: FileList;
  currentFile?: File;
  progress                       = 0;
  message                        = '';
  preview                        = '';

  modalTitle:             string = 'Empleado';
  modalReadonly:         boolean = false;
  modalAction:            string = '';
  modalOkButton:          string = '';

  roles:                 IRole[] = [];

  constructor(private httpService: EmployeeService,
              private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.httpService.getAll().subscribe({
      next: (data: dtModel[]) => {
        this.dataBinding = data;
        this.pagTotal = data.length;
        this.onPageChange();
      },
      error: (error) => {
        this.notifyService.showError(toastRFailure, toastTitle);
      }
    });

    this.httpService.getRoles().subscribe({
      next: (data: IRole[]) => {
        this.roles = data;
      },
      error: (error) => {
        this.notifyService.showError('No se pudo obtener la lista de roles', toastTitle);
      }
    });

    $.getScript('./assets/plugins/fancy-file-uploader/jquery.ui.widget.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.fileupload.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.iframe-transport.js');
    $.getScript('./assets/plugins/fancy-file-uploader/jquery.fancy-fileupload.js');
  }

  onKeyFilterEscape() {
    this.filterValue = "";
    this.onPageChange();
  }
  
  onKeyFilter(event: Event){
    if( this.filterValue == '') {
      this.onPageChange();
    }
    else {
      this.pagMessage = 'Mostrando ' + this.filteredCount.count + ' registros';
    }
  }

  onPageChange() {
    let total = this.dataBinding.length;
    let begin = (this.pagSize * (this.pagPage-1)) + 1;
    let end = total > (begin + this.pagSize) ? this.pagSize * this.pagPage : total;
    this.pagMessage = 'Mostrando registros del ' + begin +' al ' + end + ' de un total de ' + total + ' registros';
  }

  pageChangeEvent(event: number){
    this.pagPage = event;
    this.onPageChange();
  }

  onFileChange(event:any) {
    this.message = '';
    this.preview = '';
    this.progress = 0;
    this.selectedFiles = event.target.files;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.preview = '';
        this.currentFile = file;

        const reader = new FileReader();

        reader.onload = (e: any) => {
          this.preview = e.target.result;
          this.dataSelected.image_url = this.preview;
        };

        reader.readAsDataURL(this.currentFile);
      }
    }
  }

  onAction(data: dtModel, action: string) {
    this.modalAction = action;
    this.dataPrevious = { ...data };

    switch(action) {
      case 'C':
        this.isDeleting = '';
        this.isDelFontColor = '';
        this.dataSelected = { ...dtModelVoid };
        this.dataSelected.role = this.roles[0];
        this.modalOkButton = 'Agregar';
        break;
      case 'R':
        this.isDeleting = '';
        this.isDelFontColor = '';
        this.dataSelected = data;
        this.modalReadonly = true;
        this.modalOkButton = 'Cerrar';
        break;
      case 'U':
        this.isDeleting = '';
        this.isDelFontColor = '';
        this.dataSelected = data;
        this.dataSelected.role = this.roles.find(o => o.id === data.role.id) as any;
        this.modalOkButton = 'Actualizar';
        break;
      case 'D':
        this.isDeleting = 'bg-danger';
        this.isDelFontColor = 'text-white';
        this.modalReadonly = true;
        this.dataSelected = data;
        this.modalOkButton = 'Eliminar';
        break;
    }
  }

  

  modalCancel() {
    this.modalReadonly = false;
    clone(this.dataPrevious, this.dataSelected);
  }

  modalResult() {
    this.modalReadonly = false;

      if( this.currentFile ) {
        this.httpService.uploadImage(this.currentFile).subscribe({
          next: (event: any) => {
            if (event instanceof HttpResponse) {
              this.dataSelected.image_url = event.body.url;

              if( 'C' == this.modalAction ) {
                this.create();
              }
              else if( 'R' == this.modalAction ) {
                // Nothing to do.
              }
              else if( 'U' == this.modalAction ) {
                this.update();
              }
              else if( 'D' == this.modalAction ) {
                this.delete();
              }

              this.currentFile = undefined;
            }
          },
          error: (err: any) => {
            this.notifyService.showError('No se pudo cargar la imagen', toastTitle);
            this.currentFile = undefined;
          },
        });
      }
      else {
        if( 'C' == this.modalAction ) {
          this.create();
        }
        else if( 'R' == this.modalAction ) {
          // Nothing to do.
        }
        else if( 'U' == this.modalAction ) {
          this.update();
        }
        else if( 'D' == this.modalAction ) {
          this.delete();
        }
      }

  }

  create(){
    this.dataSelected.role = this.dataSelected.role.id as any;
    this.dataSelected.drawer = undefined as any;
    this.httpService.create(this.dataSelected).subscribe({
      next: (data: dtModel) => {
        this.notifyService.showSuccess(toastCSuccess, toastTitle);
        this.dataBinding.push(data);
        this.dataBinding.sort((a, b) => a.name.localeCompare(b.name));
        this.pagTotal = this.dataBinding.length;
      },
      error: (error) => {
        this.notifyService.showError(toastCFailure, toastTitle);
      }
    });
  }

  update(){
    this.dataSelected.role = this.dataSelected.role.id as any;
    this.httpService.update(this.dataSelected).subscribe({
      next: (data: dtModel) => {
        this.notifyService.showSuccess(toastUSuccess, toastTitle);
        this.dataSelected.role = data.role;
      },
      error: (error) => {
        this.notifyService.showError(toastUFailure, toastTitle);
      }
    });
  }

  delete() {
    const index = this.dataBinding.indexOf(this.dataSelected, 0);
    if (index > -1) {
      this.httpService.delete(this.dataSelected).subscribe({
        next: () => {
          this.notifyService.showSuccess(toastDSuccess, toastTitle);
          this.dataBinding.splice(index, 1);
          this.pagTotal = this.dataBinding.length;
        },
        error: (error) => {
          this.notifyService.showError(toastDFailure, toastTitle);
        }
      });
    }
  }

  getMsgActive(value: boolean) {
    return value ? 'Activo' : 'No activo';
  }

  getMsgStaff(value: boolean) {
    return value ? 'Staff' : 'Normal';
  }

  getMsgRole(value: IRole) {
    if( value )
      return value.name;
    else
      return '';
  }

}
