export interface ICreateProductProps {
  name: string;
  description: string;
  ean: string;
  price: number;
  local: "Evento" | "Loja";
  active: boolean;
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
  local: "Evento" | "Loja";
}

export interface ProductCreated {
  data: ProductEntity;
  pre_signed_url: string;
}
