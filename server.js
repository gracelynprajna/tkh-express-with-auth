import express from "express";
import passport from "passport";
import setupJWTStrategy from "./auth/index.js";
import authRouter from "./routes/auth.js";
import todoRouter from "./routes/todo.js";

export default function createServer() {
  const app = express();

  app.use(express.json());

  setupJWTStrategy(passport);

  //Here is where you will add the authentication strategies
  // app.use()

  app.use("/auth", authRouter);

  // app.use("/todo", passport.authenticate("jwt", { session: false}), todoRouter);

  app.get("/protected", passport.authenticate("jwt", {session: false}), function (request, response) {
    console.log(request);

    response.status(200).json({
      success: true,
      message: "you're good!!"
    })
  })

  return app;
}
