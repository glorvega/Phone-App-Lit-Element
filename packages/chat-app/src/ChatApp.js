import { LitElement, html, css } from "lit";

import "@minsait/chatbox-component";
import "@minsait/chatlist-component";

export class ChatApp extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      contacts: {
        type: Array,
      },
      contactSelected: {
        type: Object,
      },
      date: {
        type: String,
      },
      page: {
        type: String,
      },
    };
  }

  constructor() {
    super();
    this.contacts = [
      {
        name: "Kayla",
        avatar: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/female_woman_avatar_portrait_1-512.png",
        lastMessage: {
          text: "Yo también tengo entradas.",
          time: `${new Date().getHours()}:${
            new Date().getMinutes() < 10 ? "0" : ""
          }${new Date().getMinutes()}`,
        },
        messages: [
          {
            seen: false,
            text: "¡Hola!",
            owner: {
              name: "Kayla",
            },
          },
          {
            seen: false,
            text: "Me ha dicho tu hermano que vas al festival.",
            owner: {
              name: "Kayla",
            },
          },
          {
            seen: false,
            text: "Yo también tengo entradas.",
            owner: {
              name: "Kayla",
            },
          },
        ],
      },
      {
        name: "Verónica",
        avatar: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_avatar_child_kid-512.png",
        lastMessage: {
          text: "¿Has visto el videoclip nuevo de los Artic Monkeys?",
          time: `${new Date().getHours()}:${
            new Date().getMinutes() < 10 ? "0" : ""
          }${new Date().getMinutes()}`,
        },
        messages: [
          {
            seen: false,
            text: "¿Has visto el videoclip nuevo de los Artic Monkeys?",
            owner: {
              name: "Verónica",
            },
          },
        ],
      },
      {
        name: "Alicia",
        avatar: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/marilyn_monroe_artist_avatar-512.png",
        lastMessage: {
          text: "¡Creo que te vi ayer!",
          time: `${new Date().getHours()}:${
            new Date().getMinutes() < 10 ? "0" : ""
          }${new Date().getMinutes()}`,
        },
        messages: [
          {
            seen: false,
            text: "Holaaa",
            owner: {
              name: "Alicia",
            },
          },
          {
            seen: false,
            text: "¡Creo que te vi ayer!",
            owner: {
              name: "Alicia",
            },
          },
        ],
      },
      {
        name: "Alex",
        avatar: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/boy_male_avatar_portrait-512.png",
        lastMessage: {
          text: "¿Vamos a ver una peli esta noche?",
          time: `${new Date().getHours()}:${
            new Date().getMinutes() < 10 ? "0" : ""
          }${new Date().getMinutes()}`,
        },
        messages: [
          {
            seen: false,
            text: "He terminado de trabajar.",
            owner: {
              name: "Alex",
            },
          },
          {
            seen: false,
            text: "¿Vamos a ver una peli esta noche?",
            owner: {
              name: "Alex",
            },
          },
        ],
      },
      {
        name: "Bárbara",
        avatar: "https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/girl_female_woman_avatar-512.png",
        lastMessage: {
          text: "¿Nos vemos esta noche?",
          time: `${new Date().getHours()}:${
            new Date().getMinutes() < 10 ? "0" : ""
          }${new Date().getMinutes()}`,
        },
        messages: [
          {
            seen: false,
            text: "¿Qué tal?",
            owner: {
              name: "Bárbara",
            },
          },
          {
            seen: false,
            text: "¿Nos vemos esta noche?",
            owner: {
              name: "Bárbara",
            },
          },
        ],
      },
    ];
    this.user = {
      name: "Yo",
      avatar: "https://randomuser.me/api/portraits/thumb/women/82.jpg",
    };
    this.contactSelected = {};
    this.date = new Date();
    this.page = "chatlist";
  }

  gotoPage(page) {
    this.page = page;
  }

  onContactSelected({ detail: contact }) {
    this.contactSelected = contact;
  }

  onMessageReceived({ detail: newMessage }) {
    this.contactSelected.messages.push(newMessage);
    this.contactSelected = { ...this.contactSelected };
  }

  

  render() {
    return html`

      <div class="screen">
      </div>
      ${this.page === "chatlist"? 
                html`<chatlist-component
                .contacts="${this.contacts}"
                @contact-selected="${this.onContactSelected}"
                @click="${() => {this.gotoPage("chatbox")}}"></chatlist-component>` 
                : html`<chatbox-component
                .contact="${this.contactSelected}"
                .user="${this.user}"
                @message-sent="${this.onMessageReceived}"
                @goto-chatlist="${() => {this.gotoPage("chatlist")}}"
                ></chatbox-component>`}
    </div>
  </div>
    `;
  }
}
