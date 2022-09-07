import Chat from "./Chat";

import './style.css';

const FORM_SELECTOR = '.chat-form';
const INPUT_NAME_SELECTOR = '#userName';
const INPUT_MESSAGE_SELECTOR = '#userMessage';
const LIST_SELECTOR = '.list';
const ERROR_EMPTY_FIELD = 'Fields must be filled';

const formEl = document.querySelector(FORM_SELECTOR);
const nameEl = document.querySelector(INPUT_NAME_SELECTOR);
const messageEl = document.querySelector(INPUT_MESSAGE_SELECTOR);
const listEl = document.querySelector(LIST_SELECTOR);
const chat = new Chat({ onMessage: renderMessage });

formEl.addEventListener('submit', onFormElSubmit);

function onFormElSubmit(e) {
    e.preventDefault();

    const message = getMessage();

    if (!chat.isValueNotEmpty(message)) {
        showError();
    }

    chat.send(message);
    clearField(messageEl);
};

function getMessage() {
    return {
        username: nameEl.value,
        message: messageEl.value,
    };
};

function renderMessage(message) {
    const messageHtml = generateMessageHtml(message);

    listEl.insertAdjacentHTML('beforeend', messageHtml);
};

function generateMessageHtml(message) {
    return `
        <li class="item">
            <p class="user-name">${message.username}:</p>
            <p class="user-message">${message.message}</p>
        </li>
    `;
};

function  showError() {
    alert(ERROR_EMPTY_FIELD);
};

function clearField(field) {
    field.value = '';
};
