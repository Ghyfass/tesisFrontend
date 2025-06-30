import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  standalone: true,
  template: `
    <h1>Bienvenido a Directorio Web App</h1>
    <p>Selecciona una opción en el menú para empezar.</p>
  `,
  styles: [`
    h1 {
      color: #2c3e50;
      margin-bottom: 10px;
    }
    p {
      font-size: 1.1em;
      color: #34495e;
    }
  `]
})
export class WelcomeComponent {}
