export const templates = {
  password_set_up: {
    subject: 'Welcome to the Vianaar App- Set Up Your Password Today!',
    body: `<p>Dear {{name}},</p>
        <p>Welcome to the Vianaar App! We’re excited to have you on board and look forward to helping you get the most out of our platform.</p>
        <p>To get started, please set up your password by following these simple steps:</p>
        <ol>
            <li>Click on this link: <a href="{{link}}" class="link">{{link}}</a></li>
            <li>Create a new password and confirm it</li>
        </ol>
        <p>If you encounter any issues or have any questions, please don’t hesitate to reach out to our support team ________</p>
        <p>Warm regards,<br />Team Vianaar</p>`,
  },

  forgot_password: {
    subject: 'Forgot password',
    body: `
    <p>Dear {{name}},</p>
    <p>Greetings,</p>
    <p>We noticed that you've encountered difficulty accessing your account on the Vianaar App. We're here to assist you in securely resetting your password so you can regain access to your account.</p>
    <p>To create a new password, please click on the following link:</p>
    <p><a href="{{link}}">CHANGE PASSWORD</a></p>
    <p>Thank you for your cooperation in this matter.</p>
    <p>Warm regards,<br />Team Vianaar</p>
  `,
  },

  change_password_confirmation: {
    subject: 'Change password confirmation',
    body: `
    <p>Dear {{name}},</p>
    <p>This email serves as a confirmation that your password for the Vianaar App has been successfully changed.</p>
    <p>If you did not make this change or have any concerns, please respond to this email immediately.</p>
    <p>Warm regards,<br />Team Vianaar</p>
  `,
  },

  first_time_login_password_change_confirmation: {
    subject: 'First time login password change confirmation',
    body: `
      <p>Dear {{name}},</p>
      <p>This is to inform you that your password has been successfully updated. You can now log in to the Vianaar App using your new credentials and continue to stay updated on your property details with ease.</p>
      <p>Should you encounter any issues or have any questions, please feel free to reach out to us by responding to this email.</p>
      <p>Warm regards,<br />Team Vianaar</p>
  `,
  },

  feedback_updates_email: {
    subject: 'Feedback updates email',
    body: `
    <p>Dear {{name}},</p>
    <p>We hope you're enjoying the Vianaar App and finding it useful. Your feedback is important to us, and we'd love to hear your thoughts on your experience so far and how we can improve.</p>
    <p>Please share your feedback by <a href="{{link}}">clicking here</a> or replying to this email with any comments or suggestions you may have. Your input helps us improve the app and enhance your experience.</p>
    <p>Thank you for choosing Vianaar.</p>
    <p>Warm regards,<br />Team Vianaar</p>
  `,
  },
  site_visit_request_updates_email: {
    subject: 'Site visit request updates email',
    body: `
    <p>Dear {{name}},</p>
    <p>We hope this message finds you well.</p>
    <p>We're delighted to confirm your upcoming site visit appointment for <em>Property Name</em> with Vianaar. Your chosen date and time are all set:</p>
    <p>Date: {{date}}</p>
    <p>Time: {{time}}</p>
    <p>In the meantime, if you have any questions or require further assistance, please feel free to reach out to your Customer Relationship Manager.</p>
    <p>We look forward to meeting you.</p>
    <p>Warm regards,<br />Team Vianaar</p>
  `,
  },
};
