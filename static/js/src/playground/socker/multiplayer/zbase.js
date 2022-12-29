class MultiPlaerSocker {
    constructor(playground) {
        this.playground = playground

        this.ws = new WebSocket("wss://app4299.acapp.acwing.com.cn/wss/multiplayer/");
        this.start();
    }

    start() {
        this.receive();
    }

    receive() {
        this.ws.onmessage = function(e) {
            let data = JSON.parse(e.data);
            console.log(data);
        }
    }

    send_created_player(username, photo) {
        let outer = this;
        this.ws.send(JSON.stringify({
            'event': "created",
            'uuid': outer.uuid,
            'username': username,
            'photo':photo,
        }));
    }

    reveice_created_player() {

    }
}