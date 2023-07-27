import { html } from "../node_modules/lit-html/lit-html.js";
import { request } from "./utils.js";

const loginTemplate = () => html`
    <section id="loginPage">
        <form>
            <fieldset>
                <legend>Login</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <button type="submit" class="login">Login</button>

                <p class="field">
                    <span>If you don't have profile click <a href="/register">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export function loginPage (ctx) {
    ctx.render(loginTemplate());

    const form = document.querySelector('form');

    form.addEventListener('submit', login);

    async function login (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        const data = await request('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        });

        localStorage.setItem('user', JSON.stringify(data));
        ctx.page.redirect('/');
    };
}