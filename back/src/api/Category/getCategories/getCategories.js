import { prisma } from "../../../utils";

export default {
  Query: {
    getCategories: async (_, __) => {
      return prisma.category.findMany();
    },
  },
};
