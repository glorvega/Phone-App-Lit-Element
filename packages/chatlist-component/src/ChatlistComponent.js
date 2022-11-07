import { html, css, LitElement } from 'lit';
import '@polymer/paper-input/paper-input';

export class ChatlistComponent extends LitElement {
  static get styles() {
    return css`
    
    .bg-container{
      background-image: url("https://wallpaperaccess.com/full/5181031.jpg");
      background-size: cover; 
      border-radius: 0px 0px 50px 50px;
      height: 784px;
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 20px;
      height: 784px;
      border-radius: 0px 0px 40px 40px;
      overflow: hidden scroll;
      backdrop-filter: blur(4px);
    }

    .content{
      display: flex;
      flex-direction: column;
      width: 60%;
      align-items: flex-start;
    }

    .avatar img {
        border-radius: 30px;
        width: 60px;
    }

    .contact {
      display: flex;
      width: 100%;
      padding-left: 30px;
      align-items: flex-start
      gap: 15px;
      cursor: pointer;
      
    }


    h2{
      font-size: 25px;
      font-family: monospace;
      padding-left: 20px;
    }

    p{
      font-size: 21px;
    }

    .notification{
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #111344;
      border-radius: 100px;
      min-width: 40px;
      min-height: 40px;
      font-family: tahoma;
      color: white;
      font-size: 18px;
    }

    ::-webkit-scrollbar {
      width: 10px;;
  }
   
  ::-webkit-scrollbar-track {
      border-radius: 10px;;
      background-color: rgba(25,147,147,0.1);
  }
   
  ::-webkit-scrollbar-thumb {
       border-radius: 10px;;
      background-color: rgba(25,147,147,0.2);
  }

  hr.solid {
    border: 1px solid rgb(50 71 92);
    width: 300px;
  }

    `;
  }

  static get properties() {
    return {
      contacts: {
        type: Array
      },
      contact: {
        type: Object
      },
      contactList: {
        type: Array
      },
      inputText: {
        type: String
      },
    };
  }

  constructor() {
    super();
    this.contacts = [];
    this.contact = {
      name: '',
      avatar: '',
      messages: []
    },
    this.contactList = [];
    this.inputText = '';
  }

  onContactSelect(contact) {
    this.dispatchEvent(new CustomEvent('contact-selected', {
      detail: contact,
      bubbles: true,
      composed: true
    }));
  }

  onFilter(event) {
    const inputText = event.currentTarget.value;
    this.inputText = inputText;
    this.contactList = this.contacts.filter(contact=> contact.name.toLowerCase().trim().includes(inputText.toLowerCase().trim()));
}

firstUpdated(_changedProperties) {
    super.firstUpdated(_changedProperties);
    this.contactList = [...this.contacts];
}


  render() {
    return html`
      <div class="bg-container">
        <div class="container">
        <paper-input type="text" label="Buscar" @input="${this.onFilter}"></paper-input>
        ${this.contactList.map(contact => html`
          <div class="contact" @click="${() => {
            this.onContactSelect(contact);
          }}">
            <div class="avatar">
              <img src="${contact.avatar}" alt="${contact.name}">
            </div>
            <div class="content">
              <h2>${contact.name}</h2>
              <p>${contact.lastMessage.text}</p>
            </div>
            <div class="detail">
              <p>${contact.lastMessage.time}</p>
              <p class="notification">${contact.messages.filter(message => !message.seen).length}</p>
            </div>
          </div>
          <hr class="solid">
        `)}
      </div>
      </div>
      

    `;
  }
}
