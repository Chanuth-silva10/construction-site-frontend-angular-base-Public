import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-add-container',
  templateUrl: './add-container.component.html',
  styleUrls: ['./add-container.component.css']
})
export class AddContainerComponent implements OnInit {

  @Input() title: String | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
