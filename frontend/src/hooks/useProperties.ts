
import { useQuery } from '@tanstack/react-query';
import propertyService from '../services/propertyService';

const useProperties = () =>
  useQuery({
    queryKey: ['properties'],
    queryFn: propertyService.getAll,
  });

export default useProperties;
