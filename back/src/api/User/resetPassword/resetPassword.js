import { prisma, isAuthenticated } from "../../../utils";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    resetPassword: async (_, args, { request }) => {
      isAuthenticated(request);
      const { emailSecret, email, passwordOne, passwordTwo } = args;
      const user = await prisma.user.findOne({
        where: {
          email,
        },
      });
      if (user.emailSecret !== emailSecret) {
        throw new Error(
          "not vaild secret value!, input another value or resend email"
        );
      } else {
        if (passwordOne !== passwordTwo) {
          // For check new password is right, the two things must be same.
          throw new Error("the two password don't match each other, try again");
        } else {
          const encyptPW = await bcrypt.hash(passwordOne, 10);
          await prisma.user.update({
            where: {
              email,
            },
            data: {
              emailSecret: "",
              password: encyptPW,
            },
          });
        }
        return user;
      }
    },
  },
};
