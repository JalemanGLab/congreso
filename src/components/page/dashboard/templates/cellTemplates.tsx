// Nuevo archivo para los templates JSX
import React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

// Nuevo archivo para tipos
export interface DTOPayment {
  documentNumber: number;
  name: string;
  distributor: string;
  date: string;
  status: string;
}

const formatDate = (dateString: string) => {
  return format(new Date(dateString), "d 'de' MMMM, yyyy", { locale: es });
};

export const DocumentNumberCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {row.documentNumber}
  </div>
);

export const NameCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {row.name}
  </div>
);

export const DistributorCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {row.distributor}
  </div>
);

export const DateCell = (row: DTOPayment): React.ReactNode => (
  <div className="font-medium text-[14px] text-neutral-600">
    {formatDate(row.date)}
  </div>
);

export const StatusCell = (row: DTOPayment): React.ReactNode => (
  <span
    className={`px-2 py-1 rounded-full text-sm ${
      row.status === "registrado"
        ? "bg-neutral-200 text-neutral-700"
        : row.status === "ingreso"
        ? "bg-green-100 text-green-800"
        : "bg-yellow-100 text-yellow-800"
    }`}
  >
    {row.status}
  </span>
);

