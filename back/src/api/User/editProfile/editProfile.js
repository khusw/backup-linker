import { isAuthenticated, prisma } from "../../../utils";

export default {
  Mutation: {
    editProfile: async (_, args, { request }) => {
      isAuthenticated(request);
      const { name, email, avatarUrl, bio, phoneNum } = args;
      const user = await prisma.user.findOne({
        where: {
          email,
        },
      });
      if (user) {
        const updateUser = await prisma.user.update({
          where: {
            email,
          },
          data: {
            name,
            bio,
            avatarUrl,
            phoneNum,
          },
        });
        return updateUser;
      } else {
        throw new Error("There is no such a user");
      }
    },
  },
};
