import mongoose from "mongoose";

export interface IOtp {
    otp: string;
    email: string;
}

const otpSchema = new mongoose.Schema<IOtp>(
    {
        otp: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const otpModel = mongoose.model<IOtp>("otp", otpSchema);

export async function getOtpByEmail(email: string) {
    const dbOtp = await otpModel.findOne({ email: email }).exec();
    return dbOtp;
}

export async function setOtp(email: string, otp: string) {
    const dbOtp = await otpModel.findOneAndUpdate(
        { email: email },
        { email: email, otp: otp },
        { upsert: true },
    );
    return dbOtp;
}

export async function deleteOtp(email: string) {
    const result = await otpModel.deleteMany({ email: email });
    return true;
}
