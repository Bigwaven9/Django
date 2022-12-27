class Settings {
    constructor(root) {
        this.root = root;
        this.platform = "Web";
        this.username = "";
        this.photo = "";
        if (this.root.acos) this .platform = "ACAPP";
        this.start();
    }

    start() {
        this.getinfo();
    }

    register() {

    }

    login() {
        
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
                console.log(resp);
                if (resp.rusult === "success") {
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    console.log("asdfasdf");
                    outer.hide();
                    outer.root.menu.show();            
                } else {
                    outer.login();
                }
            }
        });
    }

    hide() {

    }

    show() {

    }
}