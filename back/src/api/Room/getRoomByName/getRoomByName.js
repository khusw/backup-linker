import { prisma, isAuthenticated } from "../../../utils";

export default {
  Query: {
    getRoomByName: async (_, args, { request }) => {
      isAuthenticated(request);
      const { roomName } = args;
      return prisma.room.findOne({
        where: {
          name: roomName,
        },
      });
    },
  },
};
