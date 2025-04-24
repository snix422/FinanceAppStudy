using DinkToPdf;
using DinkToPdf.Contracts;
using System.Runtime.InteropServices;

namespace FinanceAppWebApi
{
    public class CustomPdfTools
    {
        private readonly IConverter _converter;

        public CustomPdfTools(IConverter converter)
        {
            _converter = converter;
        }

        public string GetToolPath()
        {
            var basePath = AppContext.BaseDirectory;
            return RuntimeInformation.IsOSPlatform(OSPlatform.Windows)
                ? Path.Combine(basePath, "Wkhtmltopdf", "bin", "wkhtmltopdf.exe")
                : "wkhtmltopdf";  // dla Linuxa
        }

        public byte[] ConvertHtmlToPdf(string htmlContent)
        {
            var doc = new HtmlToPdfDocument()
            {
                GlobalSettings = new GlobalSettings
                {
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Portrait
                },
                Objects = {
                new ObjectSettings
                {
                    HtmlContent = htmlContent
                }
            }
            };

            return _converter.Convert(doc);
        }
    }
}
