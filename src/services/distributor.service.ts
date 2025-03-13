// src/services/distributor.service.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface Distributor {
  id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export const distributorService = {
  // Obtener todos los distribuidores
  async getAll() {
    try {
      const { data, error } = await supabase
        .from("distributors")
        .select("*")
        .order("name");

      if (error) throw error;
      return data;
    } catch (error) {
      throw error instanceof Error
        ? error.message
        : "Error al obtener distribuidores";
    }
  },


};
