import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Tipos para los procedimientos clínicos y marcas en español
export type ClinicalProcedure =
  | "Odontología General"
  | "Restauraciones indirectas"
  | "Restauraciones directas"
  | "Diseño de sonrisa"
  | "Ortodoncia tradicional"
  | "Ortodoncia con autoligado"
  | "Ortodoncia con Alineadores"
  | "Odontopediatra"
  | "Estudiante"
  | "Otro";

export type ProductBrand =
  | "Ivoclar"
  | "Ultradent"
  | "Bisco"
  | "Ormco"
  | "Forestadent"
  | "Invisalign"
  | "Clear Correct"
  | "Otro";

export interface Distributor {
  id: string;
  name: string;
  is_active: boolean;
}

export interface Registration {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  document_id: string;
  phone: string;
  city: string;
  distributor_id: string;
  clinical_procedure: ClinicalProcedure;
  other_clinical_procedure?: string;
  brand: ProductBrand;
  other_brand?: string;
  weekly_cases: number;
  contact_authorized: boolean;
  code: string;
  status?: string;
}

export const registrationService = {
  // Crear un nuevo registro
  async create(data: Omit<Registration, "id" | "status" | "code">) {
    try {
      // Verificar que el distribuidor existe
      const { data: distributor, error: distributorError } = await supabase
        .from("distributors")
        .select("id")
        .eq("id", data.distributor_id)
        .single();

      if (distributorError || !distributor) {
        throw new Error("Distribuidor no válido");
      }

      const { data: registration, error } = await supabase
        .from("registrations")
        .insert([
          {
            ...data,
            status: "registrado",
            code: `EVENT${Date.now()}`, // Debemos ponernos de acuerdo  para generar un codigo unico
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return registration;
    } catch (error) {
      throw error instanceof Error ? error.message : "Error al crear registro";
    }
  },

  // Obtener todos los registros con información del distribuidor
  async getAll() {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select(
          `
          *,
          distributor:distributors(name)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      throw error instanceof Error
        ? error.message
        : "Error al obtener registros";
    }
  },

  // Obtener un registro por ID
  async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select(
          `
          *,
          distributor:distributors(name)
        `
        )
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error instanceof Error
        ? error.message
        : "Error al obtener registro";
    }
  },

  // Verificar si ya existe un documento
  async checkDocumentExists(document_id: string) {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("id")
        .eq("document_id", document_id)
        .single();

      if (error && error.code !== "PGRST116") return false;
      return !!data;
    } catch (error) {
      throw error instanceof Error
        ? error.message
        : "Error al verificar documento";
    }
  },

  // Actualizar estado de asistencia
  async updateAttendance(id: string, status: string) {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      throw error instanceof Error
        ? error.message
        : "Error al actualizar la asistencia";
    }
  },
};
