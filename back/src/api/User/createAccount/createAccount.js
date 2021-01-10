import { prisma, generateToken, changePhoneNumber } from "../../../utils";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const {
        username,
        password,
        password2,
        email,
        phoneNum,
        bio,
        avatarUrl,
      } = args;

      if (password !== password2) {
        throw new Error("two password aren't same each other");
      }

      const encryptPw = await bcrypt.hash(password, 10);
      // TODO: Find user's country code and change new phone number value
      const newPhoneNumber = await changePhoneNumber(phoneNum, "+82");
      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: encryptPw,
          phoneNum: newPhoneNumber,
          bio,
          avatarUrl,
        },
      });
      const token = generateToken(user.id);
      return { token, user };
    },
  },
};
