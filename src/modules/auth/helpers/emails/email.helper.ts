import { User } from "../../models/users";
import { EmailService } from "../../../../common/email/emailService";

export class EmailSenderHelper {

    private _emailService: EmailService;
    constructor(emailService: EmailService) {
        this._emailService = emailService;
     }

    sendAccountActivationEmail(user: User): void {

        const from  = process.env.STMP_EMAIL_FROM as string;
        const to = user.email;
        const subject = 'Rental App Account Activation';
        const templateName = 'accountActivation';
        const templateData = {
            name: user.firstName +  ' ' + user.lastName,
            appUrl: process.env.APP_URL as string,
            accountActivationCode: user.accountActivationCode,
            layout: false
        };
        this._emailService.sendMail(from, to, subject,templateName, templateData);
    }
}