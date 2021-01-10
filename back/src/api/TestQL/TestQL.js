export default {
  Query: {
    TestQL: (_, args) => {
      return args.text;
    },
  },
};
