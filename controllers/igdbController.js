import fetch from "node-fetch";
import { tokenUrl, urlParams } from "../utils/IgdbConfig.js";

export const igdbController = new (class {
  constructor() {}

  getAccessToken = async () => {
    try {
      const response = await fetch(tokenUrl, {
        method: "POST",
        body: new URLSearchParams(urlParams),
      });
      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      const result = await response.json();
      // console.log(result.access_token);
      return result.access_token;
    } catch (error) {
      console.error("Erreur lors de la récupération du token : ", error);
    }
  };
})