import authRouter from "./auth.routes.js";
import itemsRouter from "./items.routes.js";
import ordersRouter from "./orders.routes.js";
import tablesRouter from "./tables.routes.js";
import restaurantsRouter from "./restaurants.routes.js";
import paymentRouter from "./payment.routes.js";

export function mountRouters(app) {

    app.use(authRouter);

    app.use(itemsRouter);

    app.use(ordersRouter);

    app.use(tablesRouter);

    app.use(restaurantsRouter);

    app.use(paymentRouter);

}