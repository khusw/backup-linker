import { prisma, isAuthenticated } from "../../../utils";

export default {
  Mutation: {
    createRoom: async (_, args, { request }) => {
      isAuthenticated(request);
      const { name } = args;
      const { user } = request;
      let newRoom;
      if (name !== undefined) {
        newRoom = await prisma.room.create({
          data: {
            name,
            participants: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      }
      return newRoom;
    },
  },
};
