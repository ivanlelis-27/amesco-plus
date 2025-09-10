import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MenuModal } from './menu-modal';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [MenuModal],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        FontAwesomeModule
    ],
    exports: [MenuModal]
})
export class MenuModalModule { }