import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InputService } from './input.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { IInput } from './input.interface';
import { NotificationService } from 'src/app/notification.service';
import { IFile } from 'src/app/common.interface';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  filterValue:            string = '';
  filteredCount                  = { count: 0 };

  pagSize:                number = 10;
  pagPage:                number = 1;
  pagTotal:               number = 0;
  pagMessage:             string = '';

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';

  fileInfos:         IInput[] = [];

  constructor(private inputService: InputService,
              private notifyService: NotificationService) { }

  ngOnInit(): void {
    this.updateFiles();
  }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  updateFiles(): void {
    this.inputService.getAll().subscribe({
      next: (data: IInput[]) => {
        this.fileInfos = data;
        this.onPageChange();
      },
      error: (error) => {
        this.notifyService.showError('No se pudo obtener el historial de archivos', 'Registro');
      }
    });
  }

  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.inputService.uploadFile(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              let serverFile = event.body as IFile;

              this.inputService.createInput(serverFile).subscribe({
                next: (data: IInput) => {
                  this.updateFiles();
                  this.notifyService.showSuccess('Archivo cargador correctamente en el servidor', 'Registro');
                },
                error: (error) => {
                  this.updateFiles();
                  this.notifyService.showError('No se pudo crear el registro del archivo', 'Registro');
                }
              });
            }
          },
          error: (err: any) => {
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
              this.notifyService.showError('No se pudo cargar el archivo al servidor', 'Registro');
            }
          }
        });
      }

      this.currentFile = undefined;
      this.selectedFiles = undefined;
      $("#fileControl").val('');
    }
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
    let total = this.fileInfos.length;
    let begin = (this.pagSize * (this.pagPage-1)) + (total == 0 ? 0: 1);
    let end = total > (begin + this.pagSize -1) ? this.pagSize * this.pagPage : total;
    this.pagMessage = 'Mostrando registros del ' + begin +' al ' + end + ' de un total de ' + total + ' registros';
  }

  pageChangeEvent(event: number){
    this.pagPage = event;
    this.onPageChange();
  }

  downloadTemplate() {
    this.inputService.getTemplate().subscribe(
      (response: any) => {
        var downloadURL = window.URL.createObjectURL(response);
        var link = document.createElement('a');
        link.href = downloadURL;
        let now = formatDate(Date.now(),'yyyyMMdd_hhmmss', 'en-US');
        link.download = 'Inv_IO_Template_'+ now + '.xlsx';
        link.click();
      }),
      (error: any) => console.log('Error downloading the file')
  }

  downloadFile(input: IInput) {
    this.inputService.downloadFile(input).subscribe(
      (response: any) => {
        var downloadURL = window.URL.createObjectURL(response);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = input.file.original_name;
        link.click();
      }),
      (error: any) => console.log('Error downloading the file')
  }



}
