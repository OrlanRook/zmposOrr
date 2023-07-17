import { Component, OnInit } from '@angular/core';
import { BranchesService } from './branches.service';
import { clone, IBranch, BranchVoid } from './branches.interface';
import { HttpResponse } from '@angular/common/http';
import { NotificationService } from 'src/app/notification.service';

import * as $ from 'jquery';

type dtModel = IBranch;
const dtModelVoid = BranchVoid;

const toastTitle    = 'Sucursales';
const toastCSuccess = 'Sucursal creada correctamente';
const toastCFailure = 'No se pudo crear la sucursal';
const toastRSuccess = 'Sucursales leidas correctamente';
const toastRFailure = 'Error al obtener la lista de sucursales';
const toastUSuccess = 'Sucursal actualizada correctamente';
const toastUFailure = 'No se pudo actualizar ls sucursal';
const toastDSuccess = 'Sucursal elimanda correctamente';
const toastDFailure = 'No se pudo eliminar la sucursal';

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.scss']
})
export class BranchesComponent implements OnInit {

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

  modalTitle:             string = 'Sucursal';
  modalReadonly:         boolean = false;
  modalAction:            string = '';
  modalOkButton:          string = '';

  constructor(private httpService: BranchesService,
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
          // this.dataSelected.image_url = this.preview;
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
              // this.dataSelected.image_url = event.body.url;

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
    this.httpService.update(this.dataSelected).subscribe({
      next: (data: dtModel) => {
        this.notifyService.showSuccess(toastUSuccess, toastTitle);
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
}
