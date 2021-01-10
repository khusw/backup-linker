import { prisma } from "../../utils";

export default {
  User: {
    rooms: (parent) =>
      prisma.user.findOne({ where: { id: parent.id } }).rooms(),
    messages: (parent) =>
      prisma.user.findOne({ where: { id: parent.id } }).messages(),
    sender: (parent) =>
      prisma.user.findOne({ where: { id: parent.id } }).sender(),
    receiver: (parent) =>
      prisma.user.findOne({ where: { id: parent.id } }).receiver(),
  },
};
