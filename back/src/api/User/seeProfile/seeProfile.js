import { prisma, isAuthenticated } from "../../../utils";

export default {
  Query: {
    seeProfile: async (_, args, { request }) => {
      isAuthenticated(request);
      const { email } = args;
      return prisma.user.findOne({
        where: {
          email,
        },
      });
    },
  },
};
