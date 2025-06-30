import {
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  OnInit,
} from '@angular/core';
import {
  Router,
  NavigationEnd,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';

// Angular Material
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

// Servicios
import { AlcanceService } from '../../modules/configuracion/services/alcance.service';
import { ProvinciaService } from '../../modules/configuracion/services/provincia.service';
import { CausaService } from '../../modules/configuracion/services/causa.service';
import { InstitucionService } from '../../modules/configuracion/services/institucion.service';
import { OrganismoService } from '../../modules/configuracion/services/organismo.service';
import { ReglaService } from '../../modules/configuracion/services/regla.service';
import { TematicaService } from '../../modules/configuracion/services/tematica.service';
import { TipoSitioService } from '../../modules/configuracion/services/tipoSitio.service';

// Componentes de diálogo
import { AlcanceFormDialogComponent } from '../../modules/configuracion/alcances/alcance-form-dialog/alcance-form-dialog.component';
import { ProvinciaFormDialogComponent } from '../../modules/configuracion/provincias/provincia-form-dialog/provincia-form-dialog.component';
import { CausaFormDialogComponent } from '../../modules/configuracion/causas/causa-form-dialog/causa-form-dialog.component';
import { InstitucionFormDialogComponent } from '../../modules/configuracion/instituciones/institucion-form-dialog/institucion-form-dialog.component';
import { OrganismoFormDialogComponent } from '../../modules/configuracion/organismos/organismo-form-dialog/organismo-form-dialog.component';
import { ReglaFormDialogComponent } from '../../modules/configuracion/reglas-por-dominio/regla-form-dialog/regla-form-dialog.component';
import { TematicaFormDialogComponent } from '../../modules/configuracion/tematicas/tematica-form-dialog/tematica-form-dialog.component';
import { TipoFormDialogComponent } from '../../modules/configuracion/tipos-de-sitios/tipo-form-dialog/tipo-form-dialog.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [
    // Componentes de Router
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    // Angular Material
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
})
export class SidenavComponent implements OnInit {
  sidebarOpen = true;
  currentSubcategory: string | null = null;
  isMobile = false;
  showOverlay = false;
  configExpanded = true;

  menuItems = [
    { path: '/configuracion/provincias', title: 'Provincias', icon: 'map' },
    {
      path: '/configuracion/organismos',
      title: 'Organismos',
      icon: 'account_balance',
    },
    {
      path: '/configuracion/instituciones',
      title: 'Instituciones',
      icon: 'school',
    },
    { path: '/configuracion/tematicas', title: 'Temáticas', icon: 'category' },
    {
      path: '/configuracion/tipos-de-sitios',
      title: 'Tipos de Sitio',
      icon: 'public',
    },
    {
      path: '/configuracion/alcances',
      title: 'Alcances',
      icon: 'zoom_out_map',
    },
    {
      path: '/configuracion/reglas-por-dominio',
      title: 'Reglas por Dominio',
      icon: 'gavel',
    },
    { path: '/configuracion/causas', title: 'Causas', icon: 'warning' },
  ];

  constructor(
    private router: Router,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object,
    // Servicios
    private alcanceService: AlcanceService,
    private provinciaService: ProvinciaService,
    private causaService: CausaService,
    private tematicaService: TematicaService,
    private organismoService: OrganismoService,
    private institucionService: InstitucionService,
    private reglaService: ReglaService,
    private tipoSitioService: TipoSitioService
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.detectSubcategory();
        if (this.isMobile) {
          this.sidebarOpen = false;
          this.showOverlay = false;
        }
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.checkScreenSize();
    }
  }

  private checkScreenSize() {
    this.isMobile = window.innerWidth < 992;
    if (!this.isMobile) {
      this.sidebarOpen = true;
      this.showOverlay = false;
    }
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    if (this.isMobile) {
      this.showOverlay = this.sidebarOpen;
    }
  }

  private detectSubcategory() {
    const url = this.router.url;
    const match = url.match(/\/configuracion\/([^\/]+)/);
    this.currentSubcategory = match ? match[1] : null;
  }

  abrirFormularioCrear() {
    if (!this.currentSubcategory) {
      alert('No se pudo determinar la subcategoría actual.');
      return;
    }

    const DIALOG_CONFIG = {
      panelClass: ['bootstrap-dialog', 'modal-content'],
      width: '450px',
      maxWidth: '95vw',
    };

    switch (this.currentSubcategory) {
      case 'alcances':
        this.openDialog(
          AlcanceFormDialogComponent,
          this.alcanceService,
          'alcance',
          {
            nombre: '',
            descripcion: '',
            estado: true,
          },
          DIALOG_CONFIG
        );
        break;
      case 'provincias':
        this.openDialog(
          ProvinciaFormDialogComponent,
          this.provinciaService,
          'provincia',
          {
            nombre: '',
            descripcion: '',
            estado: true,
          },
          DIALOG_CONFIG
        );
        break;
      case 'causas':
        this.openDialog(
          CausaFormDialogComponent,
          this.causaService,
          'causa',
          {
            nombre: '',
            descripcion: '',
            estado: true,
          },
          DIALOG_CONFIG
        );
        break;
      case 'tematicas':
        this.openDialog(
          TematicaFormDialogComponent,
          this.tematicaService,
          'tematica',
          {
            nombre: '',
            descripcion: '',
            estado: true,
          },
          DIALOG_CONFIG
        );
        break;
      case 'organismos':
        this.openDialog(
          OrganismoFormDialogComponent,
          this.organismoService,
          'organismo',
          {
            nombre: '',
            descripcion: '',
            estado: true,
          },
          DIALOG_CONFIG
        );
        break;
      case 'instituciones':
        this.openDialog(
          InstitucionFormDialogComponent,
          this.institucionService,
          'institucion',
          {
            nombre: '',
            descripcion: '',
            estado: true,
          },
          DIALOG_CONFIG
        );
        break;
      case 'reglas-por-dominio':
        this.openDialog(
          ReglaFormDialogComponent,
          this.reglaService,
          'regla',
          {
            nombre: '',
            descripcion: '',
            estado: true,
          },
          DIALOG_CONFIG
        );
        break;
      case 'tipos-de-sitios':
        this.openDialog(
          TipoFormDialogComponent,
          this.tipoSitioService,
          'tipo',
          {
            // Cambiar 'tipoSitio' a 'tipo'
            nombre: '',
            descripcion: '',
            estado: true,
          },
          DIALOG_CONFIG
        );
        break;
        this.openDialog(
          TipoFormDialogComponent,
          this.tipoSitioService,
          'tipoSitio',
          {
            nombre: '',
            descripcion: '',
            estado: true,
          },
          DIALOG_CONFIG
        );
        break;
      default:
        alert('Subcategoría no reconocida');
    }
  }

  private openDialog(
    component: any,
    service: any,
    entityName: string,
    defaultData: any,
    config: any
  ) {
    const dialogRef = this.dialog.open(component, {
      ...config,
      data: {
        modoCreacion: true,
        [entityName]: defaultData,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        service.create(result).subscribe({
          next: (response: any) => {
            alert(
              `${this.capitalizeFirstLetter(
                entityName
              )} creado/a exitosamente (ID: ${response.id})`
            );
          },
          error: () => {
            alert(`Error al crear ${entityName}`);
          },
        });
      }
    });
  }

  private capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  toggleConfigExpanded(): void {
    this.configExpanded = !this.configExpanded;
  }
}
