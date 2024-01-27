import fetch from "node-fetch";
import * as url from 'url';
import { clientId } from "../utils/IgdbConfig.js";
import { gameUrl } from "../utils/Urls.js";
import { gameHypesRequestBody, gameSeachRequestBody } from "../utils/RequestBody.js";
import { igdbController } from "./IgdbController.js";
import { responseUtil } from "../utils/ResponseUtil.js";

// Nombre de jeux par page
const gamesSize = 40;

// Numéro de la page actuelle
let currentPage = 2;

export const gameController = new (class {
  // get Data
  getInitialgame = async () => {
    try {
      const response = await fetch(gameUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": clientId,
          Authorization: `Bearer ${await igdbController.getAccessToken()}`,
        },
        body: `${gameHypesRequestBody}\nlimit ${gamesSize};\noffset 0;`,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  getGame = async () => {
    try {
      const response = await fetch(gameUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": clientId,
          Authorization: `Bearer ${await igdbController.getAccessToken()}`,
        },
        body: `${gameHypesRequestBody}\nlimit ${gamesSize};\noffset ${
          (currentPage - 1) * gamesSize
        };`,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      currentPage++;

      return data;
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  getGameSearch = async (searchTerm) => {
    try {
      const response = await fetch(gameUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": clientId,
          Authorization: `Bearer ${await igdbController.getAccessToken()}`,
        },
        body: `${gameSeachRequestBody}\nwhere name ~ "${searchTerm}"*;`,
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  // Handle Data
  handleInitialGames = async (req, res) => {
    try {
      const gameData = await this.getInitialgame();
      responseUtil.sendResponse(res, 200, gameData);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      responseUtil.sendResponse(res, 500, "Internal Server Error");
    }
  };

  handleGames = async (req, res) => {
    const urlParts = url.parse(req.url, true);
    const searchTerm = urlParts.query.term;

    try {
      let gameData;

      if (searchTerm) {
        gameData = await this.getGameSearch(searchTerm);
      } else {
        gameData = await this.getGame();
      }

      responseUtil.sendResponse(res, 200, gameData);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      responseUtil.sendResponse(res, 500, "Internal Server Error");
    }
  };
})();
