import { prisma, generateSecret, sendEmail } from "../../../utils";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    requestEmailSecret: async (_, args) => {
      const { email } = args;
      const emailSecret = generateSecret();
      try {
        await sendEmail(email, emailSecret);
        await prisma.user.update({
          where: {
            email,
          },
          data: {
            emailSecret,
          },
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};
