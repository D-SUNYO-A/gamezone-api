// Cors middleware

export const corsMiddleware = new class {
  // Pour gérer les en-têtes CORS
  handleCorsHeaders = (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Expose-Headers", "Content-Type, Authorization");
  };

  // Répondre aux pré-vérifications CORS avec succès et incluez les en-têtes CORS
  resWriteHead = (req, res) => {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Expose-Headers": "Content-Type, Authorization",
    });
    res.end();
  }
}
