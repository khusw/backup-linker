import { prisma } from "../../../utils";

export default {
  Query: {
    getRooms: async () => {
      return prisma.room.findMany();
    },
  },
};
