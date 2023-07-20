import path from "path";
import fs from "fs";
import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";
import App from "../src/App";

const PORT = process.env.PORT || 3000;
const app = express();

// Définit une route pour la racine du serveur (http://localhost:PORT/)
app.get("/", (req, res) => {
  // Lit le contenu du fichier "index.html" dans le dossier "public" en utilisant l'encodage "utf8" (utilisé comme un modèle de réponse)
  fs.readFile(path.resolve("./public/index.html"), "utf8", (err, data) => {
    if (err) {
      return res.status(500).send("An error occurred");
    }

    // Remplace la balise "<div id="root"></div>" dans le contenu du fichier "index.html" par le rendu du composant "App" au format permet l'interactivité. 
    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  });
});

app.use(
  // Utilise le middleware "express.static" pour servir les fichiers statiques depuis le dossier "dist" (par exemple, des fichiers JavaScript, CSS, etc.), avec une mise en cache de 30 jours (ici le fichier bundle.js généré)
  express.static(path.resolve(__dirname, "..", "dist"), { maxAge: "30d" })
);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
