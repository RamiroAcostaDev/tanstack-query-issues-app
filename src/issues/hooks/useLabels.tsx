import { useQuery } from "@tanstack/react-query";
import { getLabels } from "../actions";

/**
 * Custom hook para realizar peticiones de labels de GitHub usando React Query.
 *
 * - Utiliza `useQuery` para obtener las etiquetas desde la API de GitHub.
 * - Usa una clave de consulta `["labels"]` para el almacenamiento en caché.
 * - El tiempo de caducidad (`staleTime`) está configurado en 1 hora.
 * - Permite configurar datos ficticios (`placeholderData`) o datos iniciales (`initialData`) para mejorar la experiencia de usuario.
 *
 * @returns {Object} Un objeto con la propiedad `labelsQuery`, que contiene el estado y los datos de la consulta.
 *
 * @example
 * const { labelsQuery } = useLabels();
 * if (labelsQuery.isLoading) return <span>Cargando...</span>;
 * if (labelsQuery.error) return <span>Error al cargar etiquetas</span>;
 * return <ul>{labelsQuery.data.map(label => <li key={label.id}>{label.name}</li>)}</ul>;
 */

export const useLabels = () => {
  const labelsQuery = useQuery({
    queryKey: ["labels"],
    queryFn: getLabels,
    staleTime: 1000 * 60 * 60, // 1 hour

    //PlaceholderData permite que la consulta se muestre inmediatamente con datos ficticios mientras se cargan los datos reales.
    // placeholderData: [
    //   {
    //     id: 71502270,
    //     node_id: "MDU6TGFiZWw3MTUwMjI3MA==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Build%20Infrastructure",
    //     name: "Component: Build Infrastructure",
    //     color: "f9d0c4",
    //     default: false,
    //   } satisfies GithubLabel,
    //   {
    //     id: 1109407645,
    //     node_id: "MDU6TGFiZWwxMTA5NDA3NjQ1",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Suspense",
    //     name: "Component: Suspense",
    //     color: "8ffcd6",
    //     default: false,
    //   } satisfies GithubLabel,
    // ],

    // initialData permite que la consulta se muestre inmediatamente con datos iniciales. Siempre que haya un staleTime, la data persistirá en caché y no se volverá a solicitar hasta que expire el tiempo de caducidad. Luego realizará una nueva solicitud para obtener los datos actualizados.
    // initialData: [
    //   {
    //     id: 71502270,
    //     node_id: "MDU6TGFiZWw3MTUwMjI3MA==",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Build%20Infrastructure",
    //     name: "Component: Build Infrastructure",
    //     color: "f9d0c4",
    //     default: false,
    //   } satisfies GithubLabel,
    //   {
    //     id: 1109407645,
    //     node_id: "MDU6TGFiZWwxMTA5NDA3NjQ1",
    //     url: "https://api.github.com/repos/facebook/react/labels/Component:%20Suspense",
    //     name: "Component: Suspense",
    //     color: "8ffcd6",
    //     default: false,
    //   } satisfies GithubLabel,
    // ],
  });
  return { labelsQuery };
};
