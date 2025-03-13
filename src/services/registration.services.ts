import { createClient } from "@supabase/supabase-js";
import { toast } from "sonner";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export interface Registration {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  document_id: string;
  phone: string;
  city: string;
  redemption_place:
    | "Dental 83"
    | "Dental Nader"
    | "Dentales Market"
    | "Casa Dental"
    | "Orbidental"
    | "Bracket"
    | "Adental";
  clinical_procedure:
    | "General Dentistry"
    | "Indirect Restorations"
    | "Direct Restorations"
    | "Smile Design"
    | "Traditional Orthodontics"
    | "Self-ligating Orthodontics"
    | "Clear Aligners"
    | "Pediatric Dentistry"
    | "Student"
    | "Other";
  other_clinical_procedure?: string;
  brand:
    | "Ivoclar"
    | "Ultradent"
    | "Bisco"
    | "Ormco"
    | "Forestadent"
    | "Invisalign"
    | "Clear Correct"
    | "Other";
  other_brand?: string;
  weekly_cases: number;
  contact_authorized: boolean;
  code: string;
  status?: string;
}

export const registrationService = {
  // Crear un nuevo registro
  async create(data: Omit<Registration, "id" | "status">) {
    try {
      const { data: registration, error } = await supabase
        .from("registrations")
        .insert([
          {
            ...data,
            status: "registrado",
            code: `EVENT${Date.now()}`, // Debemos ponernos de acuerdo a como vamos a generar los codigos
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return registration;
    } catch (error) {
      toast.error(error as string);
      throw error;
    }
  },

  // Obtener todos los registros
  async getAll() {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      toast.error(error as string);
      throw error;
    }
  },

  // Obtener un registro por ID
  async getById(id: string) {
    try {
      const { data, error } = await supabase
        .from("registrations")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      toast.error(error as string);
      throw error;
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
      toast.error(error as string);
      throw error;
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
      toast.error(error as string);
      throw error;
    }
  },
};
