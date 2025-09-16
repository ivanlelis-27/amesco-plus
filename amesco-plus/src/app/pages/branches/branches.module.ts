import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Branches } from './branches';
import { MapComponent } from '../../components/map/map';

@NgModule({
    declarations: [Branches, MapComponent],
    imports: [
    CommonModule,
    IonicModule,
],
    exports: [Branches]
})
export class BranchesModule { }