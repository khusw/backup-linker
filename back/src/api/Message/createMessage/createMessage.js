import { prisma, isAuthenticated } from "../../../utils";
import { NEW_MESSAGE } from "../../../topics";

export default {
  Mutation: {
    createMessage: async (_, args, { request, pubsub }) => {
      isAuthenticated(request);
      const { user } = request;
      const { message, roomId } = args;

      let room = await prisma.room.findOne({
        where: {
          id: roomId,
        },
      });

      let messageObj = await prisma.message.create({
        data: {
          text: message,
          sender: {
            connect: {
              id: user.id,
            },
          },
          room: {
            connect: {
              id: room.id,
            },
          },
        },
      });

      if (room !== undefined || room !== null) {
        // 방이 존재하는 경우
        room = await prisma.room.update({
          where: {
            id: roomId,
          },
          data: {
            messages: {
              connect: {
                id: messageObj.id,
              },
            },
          },
        });
      } else {
        throw new Error("There is no room");
      }

      if (messageObj !== undefined) {
        pubsub.publish(NEW_MESSAGE, { subMessage: messageObj });
      }

      return messageObj;
    },
  },
};
