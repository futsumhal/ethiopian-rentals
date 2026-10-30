import { useQuery } from "@tanstack/react-query";
import propertyService from "../services/propertyService";

const usePropertyDetail = (id: number) =>
  useQuery({
    queryKey: ["property", id],
    queryFn: () => propertyService.getById(id),
    enabled: Number.isFinite(id),
  });

export default usePropertyDetail;