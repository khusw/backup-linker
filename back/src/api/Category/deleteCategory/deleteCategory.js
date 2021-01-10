import { prisma } from "../../../utils";

export default {
  Mutation: {
    deleteCategory: async (_, args) => {
      const { name } = args;
      return prisma.category.delete({
        where: {
          name,
        },
      });
    },
  },
};
