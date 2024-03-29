import {AppState} from '@/store/state';
import {UiState} from '@/store/ui/state';
import {Component, HostBinding, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppService} from '@services/app.service';
import {Observable} from 'rxjs';

const BASE_CLASSES = 'main-sidebar elevation-4';
@Component({
    selector: 'app-menu-sidebar',
    templateUrl: './menu-sidebar.component.html',
    styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent implements OnInit {
    @HostBinding('class') classes: string = BASE_CLASSES;
    public ui: Observable<UiState>;
    public user;
    public menu = MENU;

    constructor(
        public appService: AppService,
        private store: Store<AppState>
    ) {}

    ngOnInit() {
        this.ui = this.store.select('ui');
        this.ui.subscribe((state: UiState) => {
            this.classes = `${BASE_CLASSES} ${state.sidebarSkin}`;
        });
        this.user = this.appService.user;
        this.menu = this.filterMenuByRole();
    }

    filterMenuByRole() {      
      if (this.user.role === 1) {
        return MENU.filter((item) => ['Dashboard','Email', 'Ticket', 'User Registered'].includes(item.name));        
      } else {
        return MENU;
      }
    }
}


export const MENU = [
    {
        name: 'Dashboard',
        iconClasses: 'fas fa-tachometer-alt',
        path: ['/']
    },
    {
      name: 'Email',
      iconClasses: 'far fa-envelope',
      path: ['/email-management']
    },
    {
      name: 'Ticket',
      iconClasses: 'far fa-file',
      path: ['/ticket-management']
    },
    {
      name: 'User Registered',
      iconClasses: 'far fa-user',
      path: ['/account-management']
    },
    {
      name: 'User Internal',
      iconClasses: 'ion ion-person',
      path: ['/admin-management']
    },
];
