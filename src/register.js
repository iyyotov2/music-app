import { html } from "../node_modules/lit-html/lit-html.js";
import { request, regValidation } from "./utils.js";

const registerTemplate = () => html`
    <section id="registerPage">
        <form>
            <fieldset>
                <legend>Register</legend>

                <label for="email" class="vhide">Email</label>
                <input id="email" class="email" name="email" type="text" placeholder="Email">

                <label for="password" class="vhide">Password</label>
                <input id="password" class="password" name="password" type="password" placeholder="Password">

                <label for="conf-pass" class="vhide">Confirm Password:</label>
                <input id="conf-pass" class="conf-pass" name="conf-pass" type="password" placeholder="Confirm Password">

                <button type="submit" class="register">Register</button>

                <p class="field">
                    <span>If you already have profile click <a href="/login">here</a></span>
                </p>
            </fieldset>
        </form>
    </section>
`;

export function registerPage (ctx) {
    ctx.render(registerTemplate());

    const form = document.querySelector('form');

    form.addEventListener('submit', register);

    async function register (e) {
        e.preventDefault();

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');
        const confPass = formData.get('conf-pass');

        if (regValidation(email, password, confPass)) {
            const data = await request('http://localhost:3030/users/register', {
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
        }
    };
}