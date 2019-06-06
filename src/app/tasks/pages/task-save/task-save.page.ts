import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TasksService} from "../../services/tasks.service";
import {NavController} from "@ionic/angular";
import {OverlayService} from "../../../core/services/overlay.service";
import {error} from "selenium-webdriver";

@Component({
    selector: 'app-task-save',
    templateUrl: './task-save.page.html',
    styleUrls: ['./task-save.page.scss'],
})
export class TaskSavePage implements OnInit {

    taskForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private navController: NavController,
        private overlayService: OverlayService,
        private tasksService: TasksService) {
    }

    ngOnInit(): void {
        this.createForm();
    }

    createForm(): void {
        this.taskForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            done: [false]
        });
    }

    async onSubmit(): Promise<void> {
        const loading = await this.overlayService.loading({
            message: 'Saving...'
        });
        try {
            const task = await this.tasksService.create(this.taskForm.value);
            console.log('Task created! ', task);
            this.navController.navigateBack('/tasks');
        } catch (error) {
            console.log('Error saving Task: ', error);
            await this.overlayService.toast({
                message: error.message
            });
        } finally {
            loading.dismiss();
        }
    }
}
