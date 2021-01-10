import { prisma, isAuthenticated } from "../../../utils";
import { NEW_CATEGORY } from "../../../topics";

export default {
  Mutation: {
    addCategory: async (_, args, { request, pubsub }) => {
      isAuthenticated(request);
      const { name } = args;
      const newCategory = await prisma.category.create({
        data: {
          name,
        },
      });
      if (newCategory !== undefined) {
        pubsub.publish(NEW_CATEGORY, { subCategory: newCategory });
      }
      return newCategory;
    },
  },
};
