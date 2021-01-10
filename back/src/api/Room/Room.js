import { prisma } from "../../utils";

export default {
  Room: {
    categories: (parent) =>
      prisma.room.findOne({ where: { id: parent.id } }).categories(),
    messages: (parent) =>
      prisma.room.findOne({ where: { id: parent.id } }).messages(),
    participants: (parent) =>
      prisma.room.findOne({ where: { id: parent.id } }).participants(),
  },
};
