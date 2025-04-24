using DinkToPdf.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace FinanceAppWebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PdfController : ControllerBase
    {
        private readonly CustomPdfTools _customPdfTools;

        public PdfController(CustomPdfTools customPdfTools)
        {
            _customPdfTools = customPdfTools;
        }

        [HttpGet("generate")]
        public IActionResult GeneratePdf()
        {
            string html = @"
            <html>
            <head>
                <style>body { font-family: Arial; }</style>
            </head>
            <body>
                <h1>Raport budżetowy</h1>
                <p>Przychody: 5000 zł</p>
                <p>Wydatki: 3000 zł</p>
                <p>Bilans: 2000 zł</p>
            </body>
            </html>";

            byte[] pdf = _customPdfTools.ConvertHtmlToPdf(html);
            return File(pdf, "application/pdf", "budzet.pdf");
        }
    }
}
