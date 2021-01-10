import { NEW_CATEGORY } from "../../../topics";

export default {
  Subscription: {
    subCategory: {
      subscribe: async (_, __, { pubsub }) => {
        return pubsub.asyncIterator(NEW_CATEGORY);
      },
    },
  },
};
