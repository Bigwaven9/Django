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
                        登录
                    </div>
                    <div class="ac-game-settings-username">
                        <div class="ac-game-settings-item">
                            <input type="text" placeholder="用户名">
                        </div>
                    </div>
                    <div class="ac-game-settings-password">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="密码">
                        </div>
                    </div>
                    <div class="ac-game-settings-submit">
                        <div class="ac-game-settings-item">
                            <button>登录</button>
                        </div>
                    </div>
                    <div class="ac-game-settings-error-message">
                    </div>
                    <div class="ac-game-settings-option">
                        注册
                    </div>
                    <br>
                    <div class="ac-game-settings-acwing">
                        <img width="30" src="https://app165.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
                        <br>
                        <div>
                            AcWing一键登录
                        </div>
                    </div>
                </div>
                <div class="ac-game-settings-register">
                    <div class="ac-game-settings-title">
                        注册
                    </div>
                    <div class="ac-game-settings-username">
                        <div class="ac-game-settings-item">
                            <input type="text" placeholder="用户名">
                        </div>
                    </div>
                    <div class="ac-game-settings-password ac-game-settings-password-first">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="密码">
                        </div>
                    </div>
                    <div class="ac-game-settings-password ac-game-settings-password-second">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="确认密码">
                        </div>
                    </div>
                    <div class="ac-game-settings-submit">
                        <div class="ac-game-settings-item">
                            <button>注册</button>
                        </div>
                    </div>
                    <div class="ac-game-settings-error-message">
                    </div>
                    <div class="ac-game-settings-option">
                        登录
                    </div>
                    <br>
                    <div class="ac-game-settings-acwing">
                        <img width="30" src="https://app165.acapp.acwing.com.cn/static/image/settings/acwing_logo.png">
                        <br>
                        <div>
                            AcWing一键登录
                        </div>
                    </div>
                </div>
            </div>
        `);
        this.$login = this.$settings.find(".ac0game-settings-login");
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

    getinfo_web() {
        let outer = this;

        $.ajax({
            url: "https://app165.acapp.acwing.com.cn/settings/getinfo/",
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
    }


    hide() {
        this.$settings.hide();
    }

    show() {
        this.Settings.show();
    }
}