import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {MenuController, NavController} from "@ionic/angular";
import {OverlayService} from "../../../core/services/overlay.service";

@Component({
    selector: 'app-logout-button',
    template: `
        <ion-buttons>
            <ion-button (click)="logout()">
                <ion-icon name="exit" slot="icon-only"></ion-icon>
            </ion-button>
        </ion-buttons>
    `
})
export class LogoutButtonComponent implements OnInit {

    @Input() menu: string;

    constructor(private authService: AuthService,
                private navController: NavController,
                private overlayService: OverlayService,
                private menuController: MenuController) {
    }

    async ngOnInit(): Promise<void>{
        if(! await this.menuController.isEnabled(this.menu)){
            this.menuController.enable(true, this.menu);
        }
    }

    async logout(): Promise<void> {
        await this.overlayService.alert({
            message: 'Do you really want to quit?',
            buttons: [
                {
                    text: 'Yes',
                    handler: async () => {
                        await this.authService.logout();
                        await this.menuController.enable(false, this.menu);
                        this.navController.navigateRoot('/login');
                    }
                },
                'No'
            ]
        });
    }
}
