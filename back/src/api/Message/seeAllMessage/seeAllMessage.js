import { prisma } from "../../../utils";

export default {
  Query: {
    seeAllMessage: async (_, args) => {
      const { roomId } = args;
      let room, messageList;
      try {
        room = await prisma.room.findOne({
          where: {
            id: roomId,
          },
        });

        if (room !== undefined) {
          messageList = await prisma.message.findMany({
            where: {
              roomId: roomId,
            },
          });
        }
      } catch (e) {
        console.log(e);
      }
      return messageList;
    },
  },
};
