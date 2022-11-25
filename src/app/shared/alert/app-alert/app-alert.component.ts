import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './app-alert.component.html',
  styleUrls: ['./app-alert.component.css']
})
export class AppAlertComponent {

  @Input() message: string;
  @Output() close_alert = new EventEmitter<void>();

  onClose() {
    this.close_alert.emit();
  }

}
