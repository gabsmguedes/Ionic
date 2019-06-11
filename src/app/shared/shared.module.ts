import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {CommonModule} from "@angular/common";
import {MenuToggleComponent} from "./component/menu-toggle/menu-toggle.component";
import {LogoutButtonComponent} from "./component/logout-button/logout-button.component";

@NgModule({
    declarations:
        [
            MenuToggleComponent,
            LogoutButtonComponent
        ],

    imports:
        [
            IonicModule
        ],

    exports:
        [
            CommonModule,
            ReactiveFormsModule,
            IonicModule,
            MenuToggleComponent,
            LogoutButtonComponent
        ]
})

export class SharedModule {
}
