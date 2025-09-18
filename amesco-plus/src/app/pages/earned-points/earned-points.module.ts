import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EarnedPoints } from './earned-points';

@NgModule({
    declarations: [EarnedPoints],
    imports: [CommonModule, FormsModule, IonicModule]
})
export class EarnedPointsModule { }