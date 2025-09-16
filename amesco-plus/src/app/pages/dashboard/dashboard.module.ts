import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Dashboard } from './dashboard';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuModalModule } from '../menu-modal/menu-modal.module';

@NgModule({
    declarations: [Dashboard],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        FontAwesomeModule,
        MenuModalModule
    ]
})
export class DashboardModule { }