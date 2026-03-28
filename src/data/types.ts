export interface Property {
  id: string;
  name: string;
  nameAr: string;
  type: "hotel" | "chalet";
  location: string;
  locationAr: string;
  city: string;
  cityAr: string;
  description: string;
  descriptionAr: string;
  price: number;
  rating: number;
  reviewCount: number;
  images: string[];
  amenities: string[];
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  area: number;
  featured: boolean;
  createdAt: string;
}

export interface Booking {
  id: string;
  reference: string;
  propertyId: string;
  propertyName: string;
  guestName: string;
  email: string;
  phone: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  subtotal: number;
  tax: number;
  total: number;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  nameAr: string;
  location: string;
  locationAr: string;
  avatar: string;
  text: string;
  textAr: string;
  rating: number;
}

export interface Review {
  id: string;
  propertyId: string;
  name: string;
  nameAr: string;
  avatar: string;
  rating: number;
  text: string;
  textAr: string;
  date: string;
}
