import passport from "passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { prisma } from "./utils";

const JWTOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyUser = async (payload, done) => {
  try {
    const user = await prisma.user.findOne({
      where: {
        id: payload.id,
      },
    });
    if (user !== null) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(null, false);
  }
};

export const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

passport.use(new Strategy(JWTOptions, verifyUser));
passport.initialize();
