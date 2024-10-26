import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-container',
  templateUrl: './all-container.component.html',
  styleUrls: ['./all-container.component.css']
})   
export class AllContainerComponent implements OnInit {

  @Input() title: String | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
