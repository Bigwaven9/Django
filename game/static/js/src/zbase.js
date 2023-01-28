 export class AcGame {
    constructor(id, acappos, access, refresh) {
        this.id = id;
        this.$ac_game = $('#' + id);
        this.acappos = acappos;

        this.refresh = refresh;
        this.access = access;

        this.settings = new Settings(this)
        this.menu = new AcGameMenu(this);
        this.playground = new AcGamePlayground(this);

        this.start();
    }

    start() {
    }
}
