import { NgModule, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Announcement } from './announcement';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [Announcement],
    imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        FontAwesomeModule
    ]
})
export class AnnouncementModule { }