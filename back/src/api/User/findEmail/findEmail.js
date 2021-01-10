import { prisma, isAuthenticated, changePhoneNumber } from "../../../utils";
import twilio from "twilio";

export default {
  Query: {
    findEmail: async (_, args) => {
      const { phoneNum } = args;
      const changeNum = await changePhoneNumber(phoneNum, "+82");
      const user = await prisma.user.findOne({
        where: {
          phoneNum: changeNum,
        },
      });
      if (user && isAuthenticated) {
        const accountSid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
        const client = new twilio(accountSid, authToken);
        client.messages
          .create({
            body: `Your Email is : ${user.email}`,
            to: `${changeNum}`,
            from: `${twilioPhone}`,
          })
          .then((message) => {
            console.log(message.sid);
          });
        return true;
      } else {
        throw new Error("You need to login first");
      }
    },
  },
};
