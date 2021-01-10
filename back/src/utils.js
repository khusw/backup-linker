import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from "@prisma/client";
import { nouns, adjectives } from "./words";
import jwt from "jsonwebtoken";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const prisma = new PrismaClient();

export const getUserId = (context) => {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    return userId;
  }
  throw new Error("There is no vaild user");
};

export const isAuthenticated = (request) => {
  if (!request.user) {
    throw new Error("You need to login First");
  }
  return;
};

export const changePhoneNumber = (phoneNum, locationNum) => {
  var leftStr = locationNum;
  var rightStr = phoneNum.slice(1, phoneNum.length);
  var newStr = leftStr + rightStr;
  return newStr;
};

export const generateSecret = () => {
  const randomNumber = Math.floor(Math.random() * adjectives.length);
  return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);

export const createEMessage = (userEmail, emailSecret) => {
  const emailMessage = {
    to: `${userEmail}`,
    from: "KhuChat@KhuChat.com",
    subject: "Email from KhuChat",
    html: `We send email for reset your password, enter this key : <b>${emailSecret}</b>`,
  };
  return emailMessage;
};

export const sendEmail = (userEmail, emailSecret) => {
  sgMail.send(createEMessage(userEmail, emailSecret)).then(
    () => {},
    (error) => {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
