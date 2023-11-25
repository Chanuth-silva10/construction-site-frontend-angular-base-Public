import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() name: string | undefined
  @Input() submit: boolean | undefined
  @Input() type: string | undefined
  @Input() formName: string | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
