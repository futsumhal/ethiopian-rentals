
import axios from 'axios';

export interface Property {
  id: number;
  title: string;
  description: string;
  property_type: 'house' | 'apartment' | 'room';
  price: string;
  neighborhood: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  furnished: boolean;
  advertiser_name: string;
  phone_number: string;
  image_url: string;
  is_available: boolean;
  created_at: string;
}

const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
});

class PropertyService {
  getAll() {
    return apiClient
      .get<Property[]>('properties/')
      .then((response) => response.data);
  }

  getById(id: number) {
    return apiClient
      .get<Property>(`properties/${id}/`)
      .then((response) => response.data);
  }
}

export default new PropertyService();
