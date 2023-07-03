import nodemailer from 'nodemailer';
import dotenv from "dotenv"

dotenv.config()
// console.log(process.env.USER, process.env.PASS)

// Configure and export the transporter
export default nodemailer.createTransport({
    
  service: 'Gmail',
  auth: {
    user: process.env.MAIL_USER, //'atif.981@gmail.com',
    pass: process.env.MAIL_PASS, //'dfliccseztjgafdb'
  }
});