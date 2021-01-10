import { prisma } from "../../../utils";

export default {
  Query: {
    searchUser: async (_, args) => {
      const { term } = args;
      try {
        return prisma.user.findMany({
          where: {
            OR: [
              {
                username: { contains: term },
              },
              {
                email: { contains: term },
              },
            ],
          },
        });
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
};
