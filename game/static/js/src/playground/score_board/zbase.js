class ScoreBoard extends AcGameObject {
    constructor(playground) {
        super();

        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;

        this.state = null;
        this.win_img = new Image();
        this.win_img.src = "https://www.bgvw.org/static/image/win_lose/win.png";

        this.lose_img = new Image();
        this.lose_img.src = "https://www.bgvw.org/static/image/win_lose/lose.png";
    }

    start() {
    }

    add_listening_events() {
        let $canvas = this.playground.game_map.$canvas;

        $canvas.on('click', () =>  {
            this.playground.hide();
            this.playground.root.menu.show();
        });
    }

    win() {
        this.state = "win";

        setTimeout( () =>  {
            this.add_listening_events();
        }, 1000);
    }

    lose() {
        this.state = "lose";

        setTimeout( () => {
            this.add_listening_events();
        }, 1000);
    }

    late_update() {
        this.render();
    }

    render() {
        let len = this.playground.height / 2;
        if (this.state === "win") {
            this.ctx.drawImage(this.win_img, this.playground.width / 2 - len / 2, this.playground.height / 2 - len / 2, len, len);
        } else if (this.state === "lose") {
            this.ctx.drawImage(this.lose_img, this.playground.width / 2 - len / 2, this.playground.height / 2 - len / 2, len, len);
        }
    }
}