export interface ICreateProductProps {
  name: string;
  description: string;
  ean: string;
  price: number;
  local: "Evento" | "Loja";
}

export interface ProductEntity {
  id: number;
  name: string;
  description: string;
  ean: string;
  image_url?: string;
  price: number;
  created_at: string;
  active: boolean;
  local: "event" | "store";
}

export interface ProductCreated {
  data: ProductEntity;
  pre_signed_url: string;
}
