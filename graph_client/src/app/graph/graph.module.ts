import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { GraphComponent } from './graph.component';

@NgModule({
  declarations: [ GraphComponent ],
  imports: [ ReactiveFormsModule ],
  exports: [ GraphComponent ],
})
export class GraphModule { }
