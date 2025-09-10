import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Privacy } from './privacy';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [Privacy],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        FontAwesomeModule
    ],
    exports: [Privacy]
})
export class PrivacyModule { }