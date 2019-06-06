import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {TaskSavePage} from './task-save.page';
import {SharedModule} from "../../../shared/shared.module";

const routes: Routes = [
  {
    path: '',
    component: TaskSavePage
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskSavePage]
})
export class TaskSavePageModule {}
