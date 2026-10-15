import { Component } from '@angular/core';
import { TicketDashboardComponent } from '../features/ticket-dashboard/ticket-dashboard.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TicketDashboardComponent],
  template: `<app-ticket-dashboard class="ion-page"></app-ticket-dashboard>`
})
export class HomePage {}