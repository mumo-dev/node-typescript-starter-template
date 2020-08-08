
import * as nodemailer from 'nodemailer';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
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
        // Open template file
        // const source = fs.readFileSync(path.join(__dirname, templateName+ '.hbs'), 'utf8');
        // // Create email generator
        // const template = Handlebars.compile(source);
        const options = {
            from: from,
            to: to,
            subject: subject,
            template: templateName,
            context: templateData
            // html: template(templateData)
        };

        this._transporter.sendMail(options, (error, info) => {
            if (error) {
                return console.log(`error: ${error}`);
            }
            console.log(`Email Sent ${info.response}`);
        });

    }
}