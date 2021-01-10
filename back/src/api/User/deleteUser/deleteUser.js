import { isAuthenticated, prisma } from "../../../utils";

export default {
  Mutation: {
    deleteUser: async (_, args, { request }) => {
      isAuthenticated(request);
      const { email } = args;
      return prisma.user.delete({
        where: {
          email,
        },
      });
    },
  },
};
