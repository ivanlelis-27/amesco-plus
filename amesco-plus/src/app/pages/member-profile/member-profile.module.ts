import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MemberProfile } from './member-profile';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [MemberProfile],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        FontAwesomeModule
    ],
    exports: [MemberProfile]
})
export class MemberProfileModule { }