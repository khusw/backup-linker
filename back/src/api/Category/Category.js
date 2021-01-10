import { prisma } from "../../utils";

export default {
  Category: {
    messages: (parent) =>
      prisma.category.findOne({ where: { id: parent.id } }).messages(),
  },
};
