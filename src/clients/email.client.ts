import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

class EmailClient {
  private sesClient: SESClient;
  /**
   * The constructor initializes the SES client with the specified region.
   * Function to send email.
   */

  constructor() {
    this.sesClient = new SESClient({ region: process.env.SERVER_REGION ?? 'ap-south-1' });
  }

  /**
   * The createSendEmailInputData method constructs the input data required for sending an email.
   * Parameters:
   * - recipient
   * - emailText
   * - emailSubject
   * @ Returns:
   *
   */
  private async createSendEmailInputData(recipient, emailText, emailSubject) {
    return {
      Destination: {
        ToAddresses: [recipient],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: emailText,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: emailSubject,
        },
      },
      Source: process.env.SERVER_EMAIL_SENDER,
    };
  }

  /**
   *The sendEmail method sends an email using the SES client.
   * Parameters:
   * - recipient
   * - emailText
   * - emailSubject
   * @return
   */
  async sendEmail(recipient: string, emailText: string, emailSubject: string) {
    const command = new SendEmailCommand(await this.createSendEmailInputData(recipient, emailText, emailSubject));
    return await this.sesClient.send(command);
  }
}
export const emailClient = new EmailClient();
