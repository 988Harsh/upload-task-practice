import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'file-upload-task-practice';

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files = [];
  dataUrl = [];
  recentFiles = [];
  addDropZone($event) {
    $event.currentTarget.classList.add('hovered');
  }

  removeDropZone($event) {
    $event.currentTarget.classList.remove('hovered');
  }

  fileDropped($event) {
    let currentFiles = [];
    for (const file of $event) {
      this.files.push(file);
      currentFiles.push(file);
    }
    currentFiles.forEach(file => {
      const fileInfo = {
        name: file.name,
        size: file.size,
        type: file.type
      };
      this.readFile(file, fileInfo);
    });
  }

  readFile(file, fileInfo) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      fileInfo.content = reader.result;
      this.dataUrl.push(fileInfo);
    };
  }



  openFile(i) {
    fetch(this.dataUrl[i].content)
      .then((res) => { return res.arrayBuffer(); })
      .then((buf) => { return new File([buf], this.dataUrl[i].name, { type: this.dataUrl[i].type }); })
      .then(data => {
        const fileURL = URL.createObjectURL(data);
        window.open(fileURL);
      })
  }

}

