import { prisma } from "../../../utils";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    login: async (_, args) => {
      const { email, password } = args;
      const user = await prisma.user.findOne({
        where: {
          email,
        },
      });
      let vaild;
      if (user) {
        vaild = await bcrypt.compare(password, user.password);
      }
      if (!user || !vaild) {
        throw new Error("Not vaild email or password");
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
      return { token, user };
    },
  },
};
