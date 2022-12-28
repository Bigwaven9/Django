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
                            <button class="ac-game-setting-item-click">Sign in</button>
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
                            <img width="30" src="https://app4299.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
                        </div>
                    </div>
                </div>
            </div>
        `);
        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login.hide();
        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register.hide();



        this.root.$ac_game.append(this.$settings);
        this.start();
    }

    start() {
        this.getinfo();
    }

    register() {
        this.$login.hide();
        this.$register.show();
    }

    login() {
        this.$register.hide();
        this.$login.show();
    }

    getinfo() {
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
                    // console.log("fialed");
                    // outer.login();
                    outer.register();
                }
            }
        });
    }


    hide() {
        this.$settings.hide();
    }

    show() {
        this.Settings.show();
    }
}