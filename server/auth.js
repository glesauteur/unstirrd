const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const MongoStore = require("connect-mongo");

const { findOrCreateByGoogleId, findUserById } = require("./userService");

const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();
const {
  MONGO_URI,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET_KEY,
  GOOGLE_CALLBACK_URL,
  COOKIE_DOMAIN,
} = process.env;

// Google Authentication source: http://www.passportjs.org/packages/passport-google-oauth20/
// Creating the session cookie when a new user has been authenticated
passport.serializeUser(function (user, done) {
  done(null, user._id);
});

// Deserialize session into User
passport.deserializeUser(async function (userId, done) {
  const user = await findUserById(userId);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_SECRET_KEY,
      callbackURL: GOOGLE_CALLBACK_URL,
    },
    async function (accessToken, refreshToken, profile, cb) {
      const user = await findOrCreateByGoogleId(profile);
      return cb(null, user);
    }
  )
);

function setupAuthMiddlewares(app) {
  app.use(cookieParser());
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    session({
      name: "sid",
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: true,
      cookie: {
        path: "/",
        domain: COOKIE_DOMAIN,
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
        sameSite: "Strict",
        httpOnly: true,
      },
      store: MongoStore.create({ mongoUrl: MONGO_URI }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // GET /api/auth/google
  // Called by the client when signing in to Google.
  // This endpoint redirects to google for OAuth (through passport.authenticate)
  app.get(
    "/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  // GET /api/auth/google/callback
  // Callback URL setup in our Google OAuth Application.
  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/signin" }),
    function (req, res) {
      // Successful authentication, redirect home.
      res.redirect(COOKIE_DOMAIN);
    }
  );

  app.post("/api/auth/logout", function (req, res) {
    req.logout();
    res.send(200).send();
  });
}

module.exports = setupAuthMiddlewares;
