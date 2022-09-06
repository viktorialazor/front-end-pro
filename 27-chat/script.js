const URL = 'wss://fep-app.herokuapp.com';
const INPUT_NAME_SELECTOR = '#userName';
const INPUT_MESSAGE_SELECTOR = '#userMessage';
const SEND_BTN_SELECTOR = '.send-button';
const LIST_SELECTOR = '.list';
const ERROR_EMPTY_FIELD = 'Fields must be filled';

const nameEl = document.querySelector(INPUT_NAME_SELECTOR);
const messageEl = document.querySelector(INPUT_MESSAGE_SELECTOR);
const sendBtnEl = document.querySelector(SEND_BTN_SELECTOR);
const listEl = document.querySelector(LIST_SELECTOR);

let socket;

initConnection();

sendBtnEl.addEventListener('click', sendMessage);

function initConnection() {
    socket = new WebSocket(URL);
};

socket.onopen = () => {
    console.log('Socket opened');
};

socket.onmessage = (event) => {
    showMessage(event);
};

socket.onerror = (event) => {
    console.log('Some error', event.data);
};

socket.onclose = () => {
    console.log('Socket closed');
    initConnection();
};

function sendMessage(event) {
    event.preventDefault();

    if (isValueNotEmpty(nameEl.value) && isValueNotEmpty(messageEl.value)) {
        const data = JSON.stringify({
            username: nameEl.value,
            message: messageEl.value,
        });
        socket.send(data);
    } else {
        showError(ERROR_EMPTY_FIELD);
    }

};

function showMessage(event) {
    try {
        renderMessage(JSON.parse(event.data));
    } catch(e) {
        console.log('Error', e);
    }
};

function renderMessage(message) {
    const messageHtml = generateMassageHtml(message);

    listEl.insertAdjacentHTML('beforeend', messageHtml);
};

function generateMassageHtml(message) {
    return `
        <li class="item">
            <p class="user-name">${message.username}:</p>
            <p class="user-message">${message.message}</p>
        </li>
    `;
};

function isValueNotEmpty(value) {
    return value.trim() !== '';
};

function  showError(message) {
    alert(message);
};
