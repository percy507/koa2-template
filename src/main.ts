import "module-alias/register"; // module alias
import "reflect-metadata";
import { createConnection } from "typeorm";
import Koa from "koa";
import compose from "koa-compose";
import { Logger } from "tslog";
import middlewares from "@/middlewares";
import initScript from "@/scripts/init";

// awesome logger, overwrite console
new Logger({
  name: "console",
  dateTimePattern: "year-month-day hour:minute:second",
  displayFunctionName: false,
  overwriteConsole: true,
});

initScript();

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
// createConnection()
//   .then(async (_) => {
//     const port = 7777;
//     const app = new Koa<{}, ExtendContext>();

//     app.use(compose(middlewares));
//     app.listen(port);

//     console.info(`Server is running on: http://localhost:${port}`);
//   })
//   .catch((error) => console.error("TypeORM connection error: ", error));

const port = 7777;
const app = new Koa<{}, ExtendContext>();

app.use(compose(middlewares));
app.listen(port);

console.info(`Server is running on: http://localhost:${port}`);
