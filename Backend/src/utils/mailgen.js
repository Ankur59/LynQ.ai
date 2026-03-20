import mailgen from "mailgen";
import nodemailer from "nodemailer"
import { ApiError } from "./ApiError.js";

const sendEmail = async (options) => {
    const mailGenerator = new mailgen({
        theme: "default",
        product: {
            name: "LynQ",
            link: "https://google.com"
        }
    })

    const emailText = mailGenerator.generatePlaintext(options.mailgenContent)
    const emailHtml = mailGenerator.generate(options.mailgenContent)


    const transporter = nodemailer.createTransport({
        host: process.env.MAIL_TRAP_HOST,
        port: process.env.MAIL_TRAP_PORT,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASS
        }
    })
    const mail = {
        from: "LynQ <no-reply@lynQ.ai>",
        to: options.email,
        subject: options.subject,
        text: emailText,
        html: emailHtml
    }

    try {
        await transporter.sendMail(mail)
    }
    catch {
        throw new ApiError(500, "Unable to send Email")
    }

}

const verificatioMailContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to DevDuel! We are excited to have to onboard",
            action: {
                instructions:
                    "To verify the email click on the verify button below",
                button: {
                    color: "#ef4444",
                    text: "Verify your email",
                    link: verificationUrl
                }

            },
            outro: "Need help or have questions? Just reply to this email, we'd love to answere your queries."
        }
    }

}

const forgotPasswordMailContent = (username, passwordResetUrl) => {
    return {
        body: {
            name: username,
            intro: "We heard you forgot your password here is your reset link",
            action: {
                instructions:
                    "Click on this link to reset your password",
                button: {
                    color: "#ef4444",
                    text: "Reset Password",
                    link: passwordResetUrl
                }

            },
            outro: "Need help or have questions? Just reply to this email, we'd love to answere your queries."
        }
    }
}

export { verificatioMailContent, forgotPasswordMailContent, sendEmail }
