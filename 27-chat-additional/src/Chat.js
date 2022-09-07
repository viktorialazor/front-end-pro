const URL = 'wss://fep-app.herokuapp.com';

export default class Chat {
    static DEFAULT_MESSAGE = {
        username: 'System',
        message: 'New user connected',
    };
    static ERROR_EMPTY_FIELD = 'Fields must be filled';
    static ERROR_PARSE = 'Cannot parse message';

    constructor(options) {
        this.initConnection(options);
        this.options = options;
    }

    initConnection() {
        this.socket = new WebSocket(URL);
        this.socket.onopen = this.onOpen.bind(this);
        this.socket.onclose = this.onClose.bind(this);
        this.socket.onmessage = this.onMessage.bind(this);
    }

    onOpen() {
        this.send(Chat.DEFAULT_MESSAGE);
    }

    onClose() {
        this.initConnection();
    }

    onMessage(event) {
        try {
            const message = JSON.parse(event.data);

            this.options.onMessage(message);
        } catch (e) {
            throw new Error(Chat.ERROR_PARSE);
        }
    }

    send(message) {
        if (!this.isValueNotEmpty(message)) {
            throw new Error(Chat.ERROR_EMPTY_FIELD);
        }

        this.socket.send(JSON.stringify(message));
    }

    isValueNotEmpty(message) {
        return message.username.trim() !== '' && message.message.trim() !== '';
    };
}
