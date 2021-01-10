import { prisma } from "../../utils";

export default {
  Message: {
    sender: (parent) =>
      prisma.message.findOne({ where: { id: parent.id } }).sender(),
    room: (parent) =>
      prisma.message.findOne({ where: { id: parent.id } }).room(),
  },
};
