import { NEW_MESSAGE } from "../../../topics";

export default {
  Subscription: {
    subMessage: {
      subscribe: async (_, __, { pubsub }) => {
        return pubsub.asyncIterator(NEW_MESSAGE);
      },
    },
  },
};
