namespace FinanceAppWebApi.Models
{
    public class EmailSettings
    {
        public string FromAddress { get; set; } = string.Empty;
        public string FromName { get; set; } = string.Empty;
        public string SmtServer { get; set; } = "smtp.gmail.com";
        public int SmtPort { get; set; } = 587;
        public string AppPassword { get; set; } = string.Empty;
    }
}
