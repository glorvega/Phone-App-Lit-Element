import { html, css, LitElement } from "lit";

import "@polymer/paper-input/paper-input";
import "@polymer/paper-button/paper-button";

export class ChatboxComponent extends LitElement {
  static get styles() {
    return css`
      .container {
        position: absolute;
        left: 0px;
        height: 785px;
        width: 400px;
        backdrop-filter: blur(3px);
        background-image: url("https://i.imgur.com/am0eYJO.gif");
        background-size: cover;
        border-radius: 0px 0px 40px 40px;
      }

      .message-container {
        padding-left: 25px;
        overflow: hidden scroll;
        max-height: 90vh;
      }

      .header {
        display: flex;
        flex-direction: row;
        text-align: center;
        justify-content: space-between;
        left: 0px;
        top: 0px;
        backdrop-filter: blur(40px);
      }

      .user {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 50px;
        padding-bottom: 10px;
        padding-top: 10px;
        gap: 10px;
      }

      .back {
        width: 50px;
        cursor: pointer;
      }

      .contact-message {
        padding-left: 25px;
        font-size: 20px;
      }

      .message {
        color: black;
        box-sizing: border-box;
        padding: 0.5rem 1rem;
        margin: 1rem;
        background: #fff;
        opacity: 0.9;
        border-radius: 1.125rem 1.125rem 1.125rem 0;
        min-height: 2.25rem;
        width: fit-content;
        max-width: 66%;
      }

      img {
        border-radius: 30px;
        cursor: pointer;
        width: 50px;
      }

      .footer {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 40px;
        bottom: 50px;
        gap: 20px;
      }

      .content {
        max-height: 570px;
      }

      ::-webkit-scrollbar {
        width: 10px;
      }

      ::-webkit-scrollbar-track {
        border-radius: 10px;
        background-color: rgba(25, 147, 147, 0.1);
      }

      ::-webkit-scrollbar-thumb {
        border-radius: 10px;
        background-color: rgba(25, 147, 147, 0.2);
      }

      iron-icon{
        cursor: pointer;
        padding-top: 20px;
      }
    `;
  }

  static get properties() {
    return {
      contact: {
        type: Object,
      },
      page: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.page = "chatbox";
    (this.contact = {
      name: "",
      avatar: "",
      messages: [],
    }),
      (this.user = {
        name: "Yo",
        avatar: "https://randomuser.me/api/portraits/thumb/women/82.jpg",
        messages: [],
      });
  }

  onSendMessage() {
    const sendMessage = this.shadowRoot.querySelector("#sendMessage");
    if (sendMessage.value === "") return;

    const newMessage = {
      seen: false,
      text: sendMessage.value,
      owner: {
        name: "Yo",
        avatar: "https://randomuser.me/api/portraits/thumb/women/82.jpg",
      },
    };
    this.dispatchEvent(new CustomEvent("message-sent", { detail: newMessage }));
  }

  gotoChatlist(page) {
    this.dispatchEvent(
      new CustomEvent("goto-chatlist", {
      })
    );
  }

  render() {
    return html`
      <div class="container">
        <div class="header">
          <button class="back" @click="${this.gotoChatlist}">🔙</button>
          <div class="user">
            <img src="${this.contact.avatar}" alt="${this.contact.name}" />
            <h2>${this.contact.name}</h2>
          </div>
          <button class="back">➕</button>
        </div>
        <div class="message-container">
          <div class="content">
            ${this.contact.messages.map(
              (message) => html`
                <div class="message">
                  <p>${message.owner.name}</p>
                  <p class="contact-message">${message.text}</p>
                </div>
              `
            )}
          </div>
        </div>
        <div class="footer">
          <paper-input label="Escribir mensaje" id="sendMessage"></paper-input>
          <iron-icon icon="icons:send" @click="${this.onSendMessage}"></iron-icon>
        </div>
      </div>
    `;
  }
}
