import { githubApi } from "../../api/github.api";
import { sleep } from "../../helpers";
import { GithubLabel } from "../interfaces";

/**
 * Obtiene las etiquetas (labels) del repositorio de GitHub.
 *
 * Esta función realiza una petición HTTP a la API de GitHub para obtener todas las etiquetas disponibles.
 * Simula un retardo artificial de 1 segundo para propósitos de demostración.
 *
 * @async
 * @function getLabels
 * @returns {Promise<GithubLabel[]>} Una promesa que resuelve con un arreglo de objetos `GithubLabel`.
 *
 * @example
 * const labels = await getLabels();
 * console.log(labels);
 */

export const getLabels = async (): Promise<GithubLabel[]> => {
  await sleep(1000); // Simulate a delay for demonstration purposes
  const { data } = await githubApi.get<GithubLabel[]>("/labels");

  return data;
};
