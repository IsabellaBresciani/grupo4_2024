class EmailService {
    constructor(emailProvider) {
      this.emailProvider = emailProvider;
    }
  
    async sendEmail(to, subject, body) {
      try {
        await this.emailProvider.send({
          to,
          subject,
          body
        });
        console.log('Correo enviado exitosamente');
      } catch (error) {
        console.error('Error al enviar el correo:', error);
      }
    }
  }
  
  module.exports = EmailService;
  