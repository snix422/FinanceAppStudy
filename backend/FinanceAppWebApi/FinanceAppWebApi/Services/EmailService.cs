using FinanceAppWebApi.Models;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace FinanceAppWebApi.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string body);
    }
    public class EmailService : IEmailService
    {
        private readonly EmailSettings _emailService;
        public EmailService(IOptions<EmailSettings> emailService)
        {
            _emailService = emailService.Value;
        }
        public async Task SendEmailAsync(string to, string body)
        {
            var fromAdress = new MailAddress(_emailService.FromAddress, _emailService.FromName);
            var toAddress = new MailAddress(to);
            var subjectEmail = "Rejestracja zakończona powodzeniem";
            //var bodyEmail = $"Konto zostało utworzone dla użytkownika {emailName}.\n" +
            //     $"Zaloguj się przy użyciu adresu email: {to}.";

   

            using var message = new MailMessage(fromAdress, toAddress)
            {
                Subject = subjectEmail,
                Body = body,
                IsBodyHtml = true
            };

            using var smtp = new SmtpClient(_emailService.SmtServer, _emailService.SmtPort)
            {
                Credentials = new NetworkCredential(_emailService.FromAddress, _emailService.AppPassword),
                EnableSsl = true
            };

            await smtp.SendMailAsync(message);
        }
    }
}
