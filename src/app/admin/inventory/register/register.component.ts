import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GlobalVariable, errorHandler } from 'src/app/global'; //ORR
import { RegisterService } from './register.service';
import { HttpEventType, HttpResponse ,HttpHeaders,HttpClient } from '@angular/common/http';
import { IRegister } from './register.interface';
import { NotificationService } from 'src/app/notification.service';
import { IFile } from 'src/app/common.interface';
import { formatDate } from '@angular/common';
import { Validators,FormBuilder } from '@angular/forms';
//import { Event } from '@angular/router';
import { map } from "rxjs/operators";
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  resultado!: string; //ORR
  filterValue:            string = '';
  filteredCount                  = { count: 0 };

  pagSize:                number = 10;
  pagPage:                number = 1;
  pagTotal:               number = 0;
  pagMessage:             string = '';
  fileSelected?: File;
  //selectedFiles?: FileList;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  barWidth: string = "0%";
  fileInfos:         IRegister[] = [];
  private mediaURL   = GlobalVariable.MEDIA_URL; //ORR
  private apiModule  = 'inventory/register/';
  
  constructor(private registerService: RegisterService,
              private notifyService: NotificationService,private http: HttpClient,private fb: FormBuilder) { } /* ORR */

  ngOnInit(): void {
    this.updateFiles();
  }

  selectFile(event: any): void {
    if (event.target.files?.length == 0) return;
    console.log(" selecfile = " , event.target.files?.length)
    this.selectedFiles = event.target.files;
    console.log("selectFile2",event.target.files)
    this.fileSelected = (event.target.files as FileList)[0];
    
    //console.log("selectFile3",this.selectedFiles.item(0).name,"algo");
    
  }

  
/*
  SelectFile(elemnt: any): void {
    if (elemnt.files?.length == 0) return;
    this.selectedFiles = (elemnt.files)[0];
    //this.imageUrl = this.sant.bypassSecurityTrustUrl(window.URL.createObjectURL(this.fileSelected)) as string;
    //this.base64 = "Base64...";
  }
*/
  updateFiles(): void {
    this.registerService.getAll().subscribe({
      next: (data: IRegister[]) => {
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
         this.registerService.uploadFile(this.currentFile).subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            
              let serverFile = event.body as IFile;
                  //---- 
              this.registerService.createRegister(serverFile).subscribe({
                next: (data: IRegister) => {
                  this.updateFiles();
                  this.notifyService.showSuccess('Archivo cargador correctamente en el servidor', 'Registro');
                },
                error: (error) => {
                  this.updateFiles();
                  this.notifyService.showError('No se pudo crear el registro del archivo', 'Registro');
                }
              }); //----
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
    } console.log("ERROR");
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
    this.registerService.getTemplate().subscribe(
      (response: any) => {
        var downloadURL = window.URL.createObjectURL(response);
        var link = document.createElement('a');
        link.href = downloadURL;
        let now = formatDate(Date.now(),'yyyyMMdd_hhmmss', 'en-US');
        link.download = 'Inv_New_Register_'+ now + '.xlsx';
        link.click();
      }),
      (error: any) => console.log('Error downloading the file')
  }

  downloadFile(register: IRegister) {
    this.registerService.downloadFile(register).subscribe(
      (response: any) => {
        var downloadURL = window.URL.createObjectURL(response);
        var link = document.createElement('a');
        link.href = downloadURL;
        link.download = register.file.original_name;
        link.click();
      }),
      (error: any) => console.log('Error downloading the file')
  }

  /*Codigo agregado Orlando*/ 
  saveFileWithProgress() {
    
    let fmData = new FormData();
    const formData: FormData = new FormData();
    if(this.selectedFiles){
      const file: File | null = this.selectedFiles.item(0);
      if(file){
      this.currentFile = file;
      formData.append('original_name', file.name);
      formData.append('path', this.apiModule);
      formData.append('url', file);
               }
     }
    
    //MEDIA_URL = 'media/'

    fmData.append("file", this.fileSelected as any);
    //console.log("Data  FM: ",fmData)
   // this.http.post("http://localhost:4300/uplaodFile", fmData, {
      this.http.post(this.mediaURL + 'files/', formData, {
 
      reportProgress: true,
      observe: "events" ,
      responseType: 'json'
    })
      .pipe(map(
        event => {
          if (event.type == HttpEventType.UploadProgress) {
            this.barWidth = Math.round((100 / (event.total || 0) * event.loaded)) + "%";

          } else if (event.type == HttpEventType.Response) {
            this.barWidth = "0%";
            //this.message = event.body;
           
            let serverFile = event.body as IFile;
            this.registerService.createRegister(serverFile).subscribe({
              next: (data: IRegister) => {
                this.updateFiles();
                this.notifyService.showSuccess('Archivo cargador correctamente en el servidor', 'Registro');
              },
              error: (error) => {
                this.updateFiles();
                this.notifyService.showError('No se pudo crear el registro del archivo', 'Registro');
              }
            }); //----
            //window.open(`http://localhost:4300${event.body}`, "_blank")
          }
          
        }
      ))
      .subscribe(res => {
      }, error => {
        alert("error");
        console.error(error);
      });
      this.fileSelected = undefined;
      this.selectedFiles = undefined;
      $("#fileControl").val('');
  }

}