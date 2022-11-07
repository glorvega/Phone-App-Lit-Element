import { html, css, LitElement } from "lit";

export class LoginComponent extends LitElement {
  static get styles() {
    return css`

    .bg-container{
      position: fixed;
      left: 0;
      right: 0;
      display: block;
      background-image: url("https://flashbak.com/wp-content/uploads/2014/07/collage-copy-1024x494.jpg");
      height: 783px;
      -webkit-filter: blur(5px);
      -moz-filter: blur(5px);
      -o-filter: blur(5px);
      -ms-filter: blur(5px);
      filter: blur(2px);
      border-radius: 0px 0px 50px 50px;
       }
    
        #form {
          position: fixed;
          z-index: 9999;
          width: 400px;
          margin: 50px auto;
          text-align: center;
          position: relative;
        }

      #form fieldset {
        background: white;
        border: 0 none;
        border-radius: 20px;
        box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.4);
        padding: 20px 30px;
        box-sizing: border-box;
        width: 80%;
        margin: 0 10%;
      }

      #form input,
      #form textarea {
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 3px;
        margin-bottom: 10px;
        width: 100%;
        box-sizing: border-box;
        font-family: montserrat;
        color: #2c3e50;
        font-size: 20px;
      }

      button {
        width: 100px;
        background: #083D77;
        font-weight: bold;
        font-size: 15px;
        color: white;
        border: 0 none;
        border-radius: 1px;
        cursor: pointer;
        padding: 10px 5px;
        margin: 10px 5px;
      }

      #form .action-button:hover,
      #form .action-button:focus {
        box-shadow: 0 0 0 2px white, 0 0 0 3px #27ae60;
      }

      .fs-title {
        font-size: 22px;
        text-transform: uppercase;
        color: #2c3e50;
        margin-bottom: 30px;
      }

      .to-register {
        cursor: pointer;
        font-size: 20px;
      color: darkgray;
      }

      .to-register:hover {
        text-decoration: underline;
      }
    `;
  }

  static get properties() {
    return {
      title: { type: String },
      counter: { type: Number },
    };
  }

  constructor() {
    super();
    this.page = "";
  }

  _toRegister() {
    this.dispatchEvent(
      new CustomEvent("goto-register", {
        detail: this.page,
      })
    );
  }

  async onLogin(event) {
    event.preventDefault();

    const username = this.shadowRoot.querySelector("#username");
    const password = this.shadowRoot.querySelector("#password");

    this.dispatchEvent(
      new CustomEvent("user-login", {
        detail: {
          username: username.value,
          password: password.value,
        },
      })
    );
  }

  render() {
    return html`
      <div class="bg-container"></div>
        <form id="form">
          <fieldset>
            <h2 class="fs-title">Account login</h2>
            <input
              type="text"
              name="username"
              placeholder="Username"
              id="username"
              required
            />
            <input
              type="password"
              name="pass"
              placeholder="Password"
              id="password"
              required
            />
            <button @click="${this.onLogin}">Login</button>
            <p @click="${this._toRegister}" class="to-register">
              Create an account
            </p>
          </fieldset>
        </form>
      
    `;
  }
}
