import page from "./node_modules/page/page.mjs";

import { homePage } from "./src/home.js";
import { registerPage } from "./src/register.js";
import { loginPage } from "./src/login.js"
import { logoutPage } from "./src/logout.js";
import { catalogPage } from "./src/catalog.js";
import { createPage } from "./src/create.js";
import { detailsPage } from "./src/details.js";
import { editPage } from "./src/edit.js";
import { deletePage } from "./src/delete.js";
import { searchPage } from "./src/search.js";
import { renderContent, renderNav } from "./src/renderMiddleware.js";

page(renderNav);
page(renderContent);
page('/', homePage);
page('/index', homePage);
page('/register', registerPage);
page('/login', loginPage);
page('/logout', logoutPage);
page('/catalog', catalogPage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/delete/:id', deletePage);
page('/search', searchPage);

page.start();