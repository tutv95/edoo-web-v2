import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {AccountService} from "../../services/account.service";
import {StorageService} from "../../services/storage.service";
import {Title} from "@angular/platform-browser";

@Component({
    selector: 'change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    public old_pass: string = '';
    public new_pass: string = '';
    public confirm_pass: string = '';
    private isDisabled = false;

    constructor(private notification: NotificationService,
                private accountService: AccountService,
                private storageService: StorageService,
                private titleService: Title) {
    }

    ngOnInit() {
        this.titleService.setTitle('Thay đổi mật khẩu');
    }

    public submit() {
        var valid = this.validate();

        if (!valid) {
            return;
        }

        this.update();
    }

    public update() {
        this.isDisabled = true;

        this.accountService
            .changePassword(this.old_pass, this.new_pass)
            .subscribe(
                data => {
                    var token = data.token;
                    this.storageService.setToken(token);
                    this.notification.success('Cập nhập thành công');
                    this.reset_all();

                    this.isDisabled = false;
                },
                error => {
                    this.isDisabled = false;

                    var body = JSON.parse(error._body);
                    this.notification.error(body.message);
                    this.reset_all();
                }
            )
    }

    public validate() {
        if (this.new_pass !== this.confirm_pass) {
            this.notification.error('Mật khẩu không khớp! Vui lòng thử lại');
            this.new_pass = '';
            this.confirm_pass = '';

            return false;
        }

        return true;
    }

    public reset_all() {
        this.old_pass = '';
        this.new_pass = '';
        this.confirm_pass = '';
    }
}

export const changePasswordState = {
    name: 'settings.changePassword',
    url: '/change-password',
    component: ChangePasswordComponent,
};
