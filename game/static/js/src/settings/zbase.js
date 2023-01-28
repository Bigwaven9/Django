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
                            <img class="ac-game-settings-login-image" width="30" src="https://bgvw.org/static/image/settings/acwing_logo.png">
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
                            <img class=ac-game width="30" src="https://bgvw.org/static/image/settings/acwing_logo.png">
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
        if (this.root.access) {
            this.getinfo();
            this.refresh_jwt_token();
        } else {
            this.login();
        }
        this.add_listening_events();
    }

    refresh_jwt_token() {
        setInterval( () => {
            $.ajax({
                url: "https://bgvw.org/settings/token/refresh/",
                type: "post",
                data: {
                    refresh: this.root.refresh,
                },
                success: resp => {
                    this.root.access = resp.access;
                    console.log(resp);
                }
            })
        }, 270000);
        
        setTimeout(() => {
            $.ajax({
                url: "https://bgvw.org/settings/ranklist/",
                type: "get",
                headers: {
                    'Authorization': "Bigwave " + this.root.access,
                },
                success: resp => {
                    console.log(resp);
                }
            });
        }, 5000);

    }

    add_listening_events() {
        this.add_listening_events_login();
        this.add_listening_events_register();

        this.$acwing_login.click( () => {
            this.acwing_login();
        });
    }

    add_listening_events_login() {
        this.$login_register.click( () => {
            this.register();
        });
        this.$login_submit.click( () =>  {
            this.login_on_remote();
        });
    }

    add_listening_events_register() {
        this.$register_login.click( () => {
            this.login();
        });
        this.$register_submit.click( () => {
            this.register_on_remote();
        });
    }

    login_on_remote() {  // 在远程服务器上登录
        let username = this.$login_username.val();
        let password = this.$login_password.val();
        this.$login_error_message.empty();

        $.ajax({
            url: "https://bgvw.org/settings/token/",
            type: "POST",
            data: {
                username: username,
                password: password,
            },
            success: resp => {
                this.root.access = resp.access;
                this.root.refresh = resp.refresh;
                this.refresh_jwt_token();
                this.getinfo();
            },
            error: ()=> {
                this.$login_error_message.html("Wrong username or password.");
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
            url: "https://bgvw.org/settings/register/",
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
            this.root.acappos.api.window.close();
            return false;
        } else {
            this.root.access = "";
            this.root.refresh = "";
            location.href = "/";
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
            url: "https://bgvw.org/settings/acwing/acapp/apply_code/",
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
            $.ajax({
                url: "https://bgvw.org/settings/getinfo/",
                type: "get",
                data: {
                    platform: this.platform,
                },
                headers: {
                    'Authorization': "Bigwave " + this.root.access,
                },
                success: resp => {
                    if (resp.result === "success") {
                        this.username = resp.username;
                        this.photo = resp.photo;
                        this.hide();
                        this.root.menu.show();
                    } else {
                        this.login();
                    }
                }
            });
        }        
    }


    hide() {
        this.$settings.hide();
    }

    show() {
        this.Settings.show();
    }
}