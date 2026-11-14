export type PaymentPreference = {
  id: number;
  paymentMethodId: number;
  isActive: boolean;
  paymentMethod: {
    id: number;
    name: string;
    slug: string;
    requiresCard: boolean;
  };
};
