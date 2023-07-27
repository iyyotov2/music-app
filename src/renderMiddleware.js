import { render } from "../node_modules/lit-html/lit-html.js";
import { nav } from "./navigation.js";

const header = document.querySelector('header');
const root = document.querySelector('#main-content');
const ctxRender = (templateRsult) => render(templateRsult, root);

export function renderNav (ctx, next) {
    render(nav(), header);

    next();
}

export function renderContent (ctx, next) {
    ctx.render = ctxRender;

    next();
}