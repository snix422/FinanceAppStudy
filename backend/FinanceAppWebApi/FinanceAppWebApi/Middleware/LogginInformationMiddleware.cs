
using FinanceAppWebApi.Exceptions;

namespace FinanceAppWebApi.Middleware
{
    public class LogginInformationMiddleware : IMiddleware
    {
        private readonly ILogger<LogginInformationMiddleware> _logger;
        public LogginInformationMiddleware(ILogger<LogginInformationMiddleware> logger) 
        {
            _logger = logger;
        }
        public async Task InvokeAsync(HttpContext context, RequestDelegate next)
        {
            _logger.LogInformation("Request: {Method} {Url}", context.Request.Method, context.Request.Path);
            try
            {
                await next(context);

                if (context.Response.StatusCode >= 200 && context.Response.StatusCode < 300)
                {
                    _logger.LogInformation("Success: {Method} {Url} - {StatusCode}",
                        context.Request.Method, context.Request.Path, context.Response.StatusCode);
                }
            }
            catch (NotFoundException notFoundException)
            {
                _logger.LogError(notFoundException, "Resource not found: {Message}", notFoundException.Message);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "An unexpected error occurred: {Message}", ex.Message);
            }
        }
    }
}
