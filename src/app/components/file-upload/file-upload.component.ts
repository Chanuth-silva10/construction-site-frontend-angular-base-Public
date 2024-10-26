import {
  Component,
  EventEmitter,
  ElementRef,
  Input,
  OnInit,
  Output,
  ViewChild,
  AfterViewInit,
  OnChanges, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})

export class FileUploadComponent implements OnInit,OnChanges {

  files:any[] = [];
  images:any[] = [];
  @Input() imageUrl:string;
  @Input() editImages:any = [];
  @Input() singleImage:string;
  @Input() multiple=false;
  @Output() fileUploadEvent  = new EventEmitter<File>();
  @Output() fileRemoveEvent  = new EventEmitter<number>();


  // @ts-ignore
  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;



  /**
   * on file drop handler
   */
  onFileDropped($event:any) {
    this.prepareFilesList($event);
  }
  onFileUpload(file:File){
    this.fileUploadEvent.emit(file)
  }
  /**
   * handle file from browsing
   */
  fileBrowseHandler(target:any) {
    this.prepareFilesList(target.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
    this.images.splice(index,1);
    this.fileRemoveEvent.emit(index);
  }
  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
      this.onFileUpload(item);
      this.createImage(item);
    }

    this.fileDropEl.nativeElement.value = "";
  }
  createImage(item:any){
    if (this.files.length === 0)
      return;

    const mimeType = item.type;
    if (mimeType.match(/image\/*/) == null) {
      // this.message = "Only images are supported.";
      return;
    }
    const name = item.name.split('.').slice(0,-1).join(" ");
    const reader = new FileReader();
    reader.readAsDataURL(item);
    let i = 0;
    console.log("Before pushing to images")
    console.log(this.editImages);
    reader.onload = (_event) => {
      if(this.multiple){
        this.images.push({img:reader.result, name:name});
      }else{
        this.images = [];
        this.images.push({img:reader.result, name:name});
      }

    }
    console.log("Create Image");
    console.log(this.editImages);
  }
  constructor() { }

  ngOnInit(): void {

  }

  ngOnChanges(changes:SimpleChanges): void{
    console.log("onChange");
    console.log(changes);

    if(this.editImages.length > 0){
      this.images=[];
      if(this.multiple){
        this.images.push(...this.editImages);
      }else{
        this.images.push(this.editImages);
      }
    }
  }

}
