import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SidenavComponent } from './shared/sidenav/sidenav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidenavComponent],
  template: '<app-sidenav></app-sidenav>',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'DirectorioWebApp';
}
