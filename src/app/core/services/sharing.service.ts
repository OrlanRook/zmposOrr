import { Injectable } from "@angular/core";
@Injectable()
export class SharingService {
    constructor() {}
    static downloadFile(path:string, filename:string){
  //<a href="localhost" target="_blank" "download=shape up"></a>
  const downloadInstance = document.createElement('a');
  downloadInstance.href=path;
  downloadInstance.target = '_blank';
  downloadInstance.download = filename;

  document.body.appendChild(downloadInstance);
  downloadInstance.click();
  document.body.removeChild(downloadInstance);
    }
}