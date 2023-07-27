import { html } from "../node_modules/lit-html/lit-html.js";
import { request, isOwner } from "./utils.js";

const detailsTemplate = (data) => html`
    <section id="detailsPage">
        <div class="wrapper">
            <div class="albumCover">
                <img src=${data.imgUrl}>
            </div>
            <div class="albumInfo">
                <div class="albumText">

                    <h1>Name: ${data.name}</h1>
                    <h3>Artist: ${data.artist}</h3>
                    <h4>Genre: ${data.genre}</h4>
                    <h4>Price: ${data.price}</h4>
                    <h4>Date: ${data.releaseDate}</h4>
                    <p>Description: ${data.description}</p>
                </div>

                ${isOwner(data._ownerId)
                    ? html`
                        <div class="actionBtn">
                            <a href="/edit/${data._id}" class="edit">Edit</a>
                            <a href="/delete/${data._id}" class="remove">Delete</a>
                        </div>
                    `
                    : ''
                }
            </div>
        </div>
    </section>
`;

export async function detailsPage (ctx) {
    const data = await request(`http://localhost:3030/data/albums/${ctx.params.id}`);
    ctx.render(detailsTemplate(data));
}