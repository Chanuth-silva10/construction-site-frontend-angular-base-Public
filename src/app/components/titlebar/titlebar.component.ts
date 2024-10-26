import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-titlebar',
  templateUrl: './titlebar.component.html',
  styleUrls: ['./titlebar.component.css']
})
export class TitlebarComponent implements OnInit {

  @Input() breadcrumb: string | undefined;
  @Input() title: string | undefined;
  @Input() buttons: Array<{type:string,name:string, formName?: string,submit?:boolean,route?:string}> | undefined;

  constructor(private router:Router) { }

  ngOnInit(): void {

  }
  onClick(route){
    if(route!=undefined){
      this.router.navigate([route])
    }
  }
}
