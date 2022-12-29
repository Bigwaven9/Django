class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "Web";
        if (this.root.acos) this .platform = "ACAPP";
        this.username = "";
        this.photo = "";


        this.$settings = $(`
            <div class="ac-game-settings">
                <div class="ac-game-settings-login">
                    <div class="ac-game-settings-title">
                        Sign in to GG
                    </div>
                    <div class="ac-game-settings-username">
                        <div class="ac-game-settings-item">
                            <input type="text" placeholder="Username">
                        </div>
                    </div>
                    <div class="ac-game-settings-password">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="password">
                        </div>
                    </div>
                    <div class="ac-game-settings-submit">
                        <div class="ac-game-settings-item">
                            <button class="click-item">Sign in</button>
                        </div>
                    </div>
                    <div class="ac-game-settings-error-message">
                    </div>
                    <div class="ac-game-settings-option">
                        Sign up
                    </div>
                    <br>
                    <div class="ac-game-settings-acwing">
                        <br>
                        <div>
                            or you can sign in with.
                            <br>
                            <br>
                            <img class="ac-game-settings-login-image" width="30" src="https://app4299.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
                        </div>
                    </div>
                </div>



                <div class="ac-game-settings-register">
                    <div class="ac-game-settings-title">
                        Sign up
                    </div>
                    <div class="ac-game-settings-username">
                        <div class="ac-game-settings-item">
                            <input type="text" placeholder="Username">
                        </div>
                    </div>
                    <div class="ac-game-settings-password ac-game-settings-password-first">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="Password">
                        </div>
                    </div>
                    <div class="ac-game-settings-password ac-game-settings-password-second">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="Confirm your password">
                        </div>
                    </div>
                    <div class="ac-game-settings-submit">
                        <div class="ac-game-settings-item">
                            <button>Sign up</button>
                        </div>
                    </div>
                    <div class="ac-game-settings-error-message">
                    </div>
                    <div class="ac-game-settings-option">
                        Sign in
                    </div>
                    <br>
                    <div class="ac-game-settings-acwing">
                        <br>
                        <div>
                            Sign in with Acwing
                            <br>
                            <img class=ac-game width="30" src="https://app4299.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
                        </div>
                    </div>
                </div>
            </div>
        `);
        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login_username = this.$login.find(".ac-game-settings-username input");
        this.$login_password = this.$login.find(".ac-game-settings-password input");
        this.$login_submit = this.$login.find(".ac-game-settings-submit button");
        this.$login_error_message = this.$login.find(".ac-game-settings-error-message");
        this.$login_register = this.$login.find(".ac-game-settings-option");
        this.$login.hide();


        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register_username = this.$register.find(".ac-game-settings-username input");
        this.$register_password = this.$register.find(".ac-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".ac-game-settings-password-second input");
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-message");
        this.$register_login = this.$register.find(".ac-game-settings-option");
        this.$register.hide();


        this.$acwing_login = this.$settings.find('.ac-game-settings-acwing img');

        this.root.$ac_game.append(this.$settings);
        this.start();
    }

    start() {
        this.getinfo();
    }

    add_listening_events() {
        let outer = this;
        this.add_listening_events_login();
        this.add_listening_events_register();

        this.$acwing_login.click(function() {
            outer.acwing_login();
        });
    }

    add_listening_events_login() {
        let outer = this;

        this.$login_register.click(function() {
            outer.register();
        });
        this.$login_submit.click(function() {
            outer.login_on_remote();
        });
    }

    add_listening_events_register() {
        let outer = this;
        this.$register_login.click(function() {
            outer.login();
        });
        this.$register_submit.click(function() {
            outer.register_on_remote();
        });
    }

    login_on_remote() {  // 在远程服务器上登录
        let outer = this;
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "https://app4299.acapp.acwing.com.cn/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();
                } else {
                    outer.$login_error_message.html(resp.result);
                }
            }
        });
    }

    register_on_remote() {  // 在远程服务器上注册
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();

        $.ajax({
            url: "https://app4299.acapp.acwing.com.cn/settings/register/",
            type: "GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success: function(resp) {
                if (resp.result === "success") {
                    location.reload();  // 刷新页面
                } else {
                    outer.$register_error_message.html(resp.result);
                }
            }
        });
    }

    logout_on_remote() {  // 在远程服务器上登出
        if (this.platform === "ACAPP") {
            // this.root.acappos.api.window.close();
            return false;
        } else {
            $.ajax({
                url: "https://app4299.acapp.acwing.com.cn/settings/logout/",
                type: "GET",
                success: function(resp) {
                    if (resp.result === "success") {
                        location.reload();
                    }
                }
            });
        }
    }

    register() {
        this.$login.hide();
        this.$register.show();
    }

    login() {
        this.$register.hide();
        this.$login.show();
    }

    getinfo_acapp() {
        let outer = this;

        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/settings/acwing/acapp/apply_code/",
            type: "GET",
            success: function(resp) {
                if (resp.result === "success") {
                    outer.acapp_login(resp.appid, resp.redirect_uri, resp.scope, resp.state);
                }
            }
        });
    }

    getinfo() {
        if (this.platform === "ACAPP") {
            this.getinfo_acapp();
        } else {
            let outer = this;

            $.ajax({
                url: "https://app4299.acapp.acwing.com.cn/settings/getinfo/",
                type: "GET",
                data: {
                    platform: outer.platform,
                },
                success: function(resp) {
                    if (resp.result === "success") {
                        outer.username = resp.username;
                        outer.photo = resp.photo;
                        outer.hide();
                        outer.root.menu.show();
                    } else {
                        outer.login();
                    }
                }
            });
            this.add_listening_events();
        }        
    }


    hide() {
        this.$settings.hide();
    }

    show() {
        this.Settings.show();
    }
}