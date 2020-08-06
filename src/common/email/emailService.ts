
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
const hbs = require("nodemailer-express-handlebars");

export class EmailService {

    private _transporter: nodemailer.Transporter;

    constructor() {

        const smtpOptions = new SMTPTransport({
            host: process.env.SMTP_HOST as string,
            port: parseInt(process.env.SMTP_PORT as string),
            auth: {
                user: process.env.SMTP_USER as string,
                pass: process.env.SMTP_PASSWORD as string
            }
        });
        this._transporter = nodemailer.createTransport(smtpOptions)

        const viewTemplateOptions = {
            viewEngine: {
                layoutsDir: __dirname + "/views/layout",
                partialsDir: __dirname + "/views/partials",
                extname: ".hbs"
            },
            extName: ".hbs",
            viewPath: "views"
        };

        this._transporter.use('compile', hbs(viewTemplateOptions));
    }

    sendMail(from: string, to: string, subject: string, templateName: string, templateData?: any) {
        const options = {
            from: from,
            to: to,
            subject: subject,
            template: templateName,
            context: templateData
        };

        this._transporter.sendMail(options, (error, info) => {
            if (error) {
                return console.log(`error: ${error}`);
            }
            console.log(`Email Sent ${info.response}`);
        });

    }
}