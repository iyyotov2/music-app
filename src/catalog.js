import { html } from "../node_modules/lit-html/lit-html.js";
import { request, isLogged } from "./utils.js";

const catalogTemplate = (data) => html`
    <section id="catalogPage">
        <h1>All Albums</h1>

        ${data.length > 0
            ? html`
                ${data.map(e => html`
                    <div class="card-box">
                        <img src=${e.imgUrl}>
                        <div>
                            <div class="text-center">
                                <p class="name">Name: ${e.name}</p>
                                <p class="artist">Artist: ${e.artist}</p>
                                <p class="genre">Genre: ${e.genre}</p>
                                <p class="price">Price: ${e.price}</p>
                                <p class="date">Release Date: ${e.releaseDate}</p>
                            </div>
                            ${isLogged()
                                ? html`
                                    <div class="btn-group">
                                        <a href="/details/${e._id}" id="details">Details</a>
                                    </div>
                                `
                                : ''
                            }
                        </div>
                    </div>
                `)}
            `
            : html`
                <p>No Albums in Catalog!</p>
            `
        }

    </section>
`;

export async function catalogPage (ctx) {
    const data = await request('http://localhost:3030/data/albums?sortBy=_createdOn%20desc&distinct=name');
    ctx.render(catalogTemplate(data));
}