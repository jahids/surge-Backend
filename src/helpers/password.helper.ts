import * as bcrypt from "bcrypt";

export async function encryptPassword(password: string) {
    const saltRound = Number(process.env.PASSWORD_SALT_ROUND) ?? 10;
    const encrypted = await bcrypt.hash(password, saltRound);
    return encrypted;
}

export async function checkPassword(
    password: string,
    encryptedPassword: string,
) {
    return await bcrypt.compare(password, encryptedPassword);
}
