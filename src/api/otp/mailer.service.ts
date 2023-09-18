// const otpModel = require('../../db/Model/otpModel');
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.MAIL_USERNAME,
		pass: process.env.MAIL_PASSWORD,
	},
});

export function generateOTP(size = 4) {
	const digits = "0123456789";
	let OTP = "";
	for (let i = 0; i < size; i++) {
		OTP += digits[Math.floor(Math.random() * 10)];
	}
	return OTP;
}

export async function sendMail(to: string, subject: string, message: string) {
	if (to.length == 0 || !message.length || !subject.length) {
		console.log(`to/subject/message is missing`, to, subject, message);
		return false;
	}
	const mailOptions = {
		from: process.env.mailUser,
		to: to,
		subject: subject,
		text: message,
	};

	try {
		const result = await transporter.sendMail(mailOptions);
		// console.log(result);
		return true;
	} catch (error) {
		console.log(`failed to send mail : `, (error as Error).message);
		return false;
	}
}

export async function sendOTP(to: string, otp: string): Promise<boolean> {
	const appName = process.env.APP_NAME;

	const subject = appName ? `${appName} - OTP` : "OTP";
	const _otp = otp;
	const message = `${_otp}`;
	try {
		const result = await sendMail(to, subject, message);
		if (result) {
			return true;
		}
	} catch (error) {
		console.log(`mail not sent`);
		console.log(error);
	}
	return false;
}
