import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Task} from "../../models/task.model";
import {TasksService} from "../../services/tasks.service";
import {NavController} from "@ionic/angular";
import {OverlayService} from "../../../core/services/overlay.service";
import {take} from "rxjs/operators";

@Component({
    selector: 'app-tasks-list',
    templateUrl: './tasks-list.page.html',
    styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage implements OnInit {

    tasks$: Observable<Task[]>;

    constructor(private navController: NavController, private overlayService: OverlayService, private taskService: TasksService) {
    }

    async ngOnInit(): Promise<void> {
        const loading = await this.overlayService.loading();
        this.tasks$ = this.taskService.getAll();
        this.tasks$.pipe(take(1)).subscribe(tasks => loading.dismiss());
    }

    onUpdate(task: Task): void {
        this.navController.navigateForward(['tasks', 'edit', task.id]);
    }

    async onDelete(task: Task): Promise<void> {
        await this.overlayService.alert({
           message: `Do you really want to delete the task "${task.title}"?`,
            buttons: [
                {
                  text: 'Yes',
                  handler: async () => {
                      await this.taskService.delete(task);
                      await this.overlayService.toast({
                          message: `Task "${task.title}" deleted!`
                      })
                  }
                },
                'No'
            ]
        });
    }

}
