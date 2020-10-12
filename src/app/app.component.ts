import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'file-upload-task-practice';

  files = [];
  dataUrl;
  addDropZone($event) {
    $event.currentTarget.classList.add('hovered');
  }

  removeDropZone($event) {
    $event.currentTarget.classList.remove('hovered');
  }

  fileDropped($event) {
    for (const file of $event) {
      this.files.push(file);
    }
  }

  readFile(file, fileInfo, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      fileInfo.content = e.target['result'];
      this.dataUrl = fileInfo;
      callback();
    };
    reader.readAsDataURL(file);
  }

  removeFile(i) {
    this.files.splice(i, 1);
  }


  openFile(i) {
    const fileInfo = {
      name: this.files[i].name,
      size: this.files[i].size,
      type: this.files[i].type
    };
    this.readFile(this.files[i], fileInfo, () => {
      fetch(this.dataUrl.content)
        .then((res) => { return res.arrayBuffer(); })
        .then((buf) => { return new File([buf], this.dataUrl.name, { type: this.dataUrl.type }); })
        .then(data => {
          const fileURL = URL.createObjectURL(data);
          let a = document.createElement('a');
          a.href = fileURL;
          a.target = '_blank';
          document.body.appendChild(a);
          a.click();
          a.remove();
        })
    });


  }

}

