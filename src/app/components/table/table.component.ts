import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {SelectionModel} from "@angular/cdk/collections";
import {environment} from "../../../environments/environment";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HttpClient} from "@angular/common/http";
import {HttpService} from "../../services/http.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent <T> implements OnInit {

  @Input() displayedColumns: string[] | undefined;
  @Input() url: string = "";
  @Input() columns:any;
  @Input() name:string;
  @Input() aggregate?:boolean = false;
  @Input() url2?:string;

  loadedData:T[] = [];
  isFetching = false;
  error = null;
  imageUrl = "http://localhost:3001/"+this.url+"/image/";
  // @ts-ignore
  dataSource: MatTableDataSource<T>;
  // @ts-ignore
  selection: SelectionModel<T>;

  toggleStatus(i:any , e:any){
    console.log(i);
    let data:Object;
    if(e.checked){
      data ={
        id:i._id,
        status:"active"
      }
    }else{
      data ={
        id:i._id,
        status:"inactive"
      }
    }
    this.dataService.updateStatus(this.url,data).subscribe(response=>{
      },
      error => {
        this.error = error;
      })
  }

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort,{static:false}) sort: MatSort | undefined;
  constructor(private http: HttpClient, private dataService:HttpService<T>, public dialog:MatDialog) {}

  ngOnInit() {
    if(!this.aggregate){
      this.getAllData(this.url);
    }else{
      this.getAllData(this.url);
      this.getAllData(this.url2);
    }
    this.imageUrl = "http://localhost:3001/"+this.url+"/image/";

  }
  openDialog(id:string) {
    let dialogRef = this.dialog.open(DialogComponent, {
      autoFocus: false,
      width: '450px'
    })
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataService.delete(this.url,id).subscribe(data=>{
          this.loadedData = this.loadedData.filter((data:any) => {
            return data._id != id;
          })
          this.dataSource = new MatTableDataSource(this.loadedData);
        })
      }
    });
  }
  getAllData(url){
    this.isFetching = true;
    this.dataService.getAll(url).subscribe(
      data=>{
        console.log(data);
        this.isFetching = false;
        this.loadedData.push(...data);
        this.dataSource = new MatTableDataSource(this.loadedData);
        this.selection = new SelectionModel<T>(true, []);
      },
      error => {
        this.error = error;
      }
    )
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
    // @ts-ignore
    this.dataSource.sort = this.sort;

  }

  pageSizes = [5,10,25,50,100];

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Format text as readable **/
  formatText(text: string) {
    const words = text.split("_");
    const capitalizedWords =  words.map(word => {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    });
    return capitalizedWords.join(" ");
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.dataSource.data);
  }

}
