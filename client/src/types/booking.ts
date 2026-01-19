export interface Booking {
  _id: string;
  tour: {
    _id: string;
    name: string;
    imageCover?: string;
    duration?: number;
    startLocation?: {
      description?: string;
      address?: string;
    };
  };
  user: {
    _id: string;
    name: string;
    email: string;
  };
  price: number;
  createdAt: string;
  paid: boolean;
}
