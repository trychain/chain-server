// env
import env from "./src/helpers/dotenv.helper";
env.init();

// database
import Database from "./src/helpers/mongoose.helper";
Database.connect();

// web application
import ExpressLibrary from "./src/helpers/express.helper";

ExpressLibrary.initStandardMiddlewares();
ExpressLibrary.initSecurityMiddlewares();
ExpressLibrary.initMiddlewares();

ExpressLibrary.initRoutes();

ExpressLibrary.initErrorHandler();

ExpressLibrary.startExpressApplication();
