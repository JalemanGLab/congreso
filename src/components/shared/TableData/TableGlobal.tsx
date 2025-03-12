import React, { useState } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { IoIosSearch, IoMdClose } from "react-icons/io";

interface Column {
  header: string;
  accessor: string;
  cell?: (row: any) => React.ReactNode;
}

interface TableGlobalProps {
  columns: Column[];
  data: any[];
  itemsPerPage?: number;
  activateOptions?: {
    options?: (row: any) => void;
    setOptions?: (type: string, row: any) => void;
  };

  filters?: {
    name?: boolean;
    status?: boolean;
    date?: boolean;
    cedula?: boolean;
    all?: boolean;
  };
  actions?: {
    edit?: (row: any) => void;
    delete?: (row: any) => void;
    view?: (row: any) => void;
    custom?: (row: any) => React.ReactNode;
    message?: (row: any) => void;
    download?: (row: any) => void;
    pay?: (row: any) => void;

  };

  isLoading?: boolean;
  emptyMessage?: string;
}

const TableGlobal = ({
  columns,
  data,
  itemsPerPage = 4,
  actions,
  filters,
  emptyMessage = 'No hay datos disponibles',
}: TableGlobalProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filterValue, setFilterValue] = useState('');

  // Filtrar los datos antes de paginar
  const filteredData = React.useMemo(() => {
    let results = [...data];

    if (filterValue) {
      const searchTerm = filterValue.toLowerCase();
      results = results.filter(item =>
        item.documentNumber?.toString().toLowerCase().includes(searchTerm) ||
        item.status?.toLowerCase().includes(searchTerm) ||
        item.date?.toString().toLowerCase().includes(searchTerm) ||
        item.distributor?.toLowerCase().includes(searchTerm)
      );
    }

    return results;
  }, [filterValue, data]);

  // Calcular la paginación con los datos filtrados
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handleFilterChange = (value: string) => {
    setFilterValue(value);
    setCurrentPage(1); // Resetear a la primera página cuando se filtra
  };
  

  return (
    <div className="w-full flex flex-col gap-4 bg-white rounded-lg">
      {/* Filtros y Búsqueda */}
        {filters?.all && (

        <div className="w-full h-11 flex flex-row gap-6">
            <div className="relative w-[400px] h-11">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">                       
                <IoIosSearch className="h-6 w-6 text-neutral-400" aria-hidden="true" />
              </div>
              <input
                type="text"
                placeholder="Buscar por documento, estado, fecha o distribuidor"
                className="w-full max-w-[400px] h-11 border px-10 rounded-[4px] border-gray-300 outline-none "
                value={filterValue}
                onChange={(e) => handleFilterChange(e.target.value)}
              />
            </div>
              <button onClick={() => handleFilterChange('')} className="w-[100px] min-w-[100px] h-11 bg-neutral-800 text-neutral-50   rounded-[4px] flex flex-row gap-2 items-center justify-center cursor-pointer hover:bg-neutral-900 transition-all duration-300">
                Limpiar
                <IoMdClose className="text-xl" />
              </button>
          </div>
        )}
      
      <div className="  w-full rounded-lg shadow-sm border  border-gray-200">
        
        {/* Tabla */}
        <div className="w-full overflow-x-auto rounded-t-lg">
          <table className="min-w-full divide-y divide-gray-200">
            {/* Encabezados */}
            <thead className="w-full bg-neutral-100">
              <tr>
                {columns.map((column, idx) => (
                  <th
                    key={idx}
                    className="min-w-[200px] px-6 py-3 text-left text-[14px] font-medium text-neutral-700 uppercase tracking-wider"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            {/* Cuerpo */}
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.length > 0 ? (
                currentData.map((row, rowIdx) => (
                  <tr key={rowIdx} className="hover:bg-gray-50">
                    {columns.map((column, colIdx) => (
                      <td key={colIdx} className="px-6 py-4 whitespace-nowrap text-[14px] text-neutral-600">
                        {column.cell ? column.cell(row) : row[column.accessor as keyof any]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length + (actions ? 1 : 0)}
                    className="px-6 py-4 text-center text-[14px] text-neutral-600"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginador */}
      {data.length > 0 && (
        <div className="w-full flex flex-col  sm:flex-row sm:justify-between items-center gap-2 rounded-b-lg px-4 py-3 border border-gray-200 bg-white border-t sm:px-6">
          <div className="flex items-center text-sm select-none text-gray-700">
            Mostrando{' '}
            <span className="font-medium mx-1">
              {startIndex + 1}
            </span>
            a
            <span className="font-medium mx-1">
              {Math.min(endIndex, filteredData.length)}
            </span>
            de
            <span className="font-medium mx-1">{filteredData.length}</span>
            resultados
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border cursor-pointer border-gray-300'
              }`}
            >
              <BiChevronLeft className="text-xl" />
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`px-3 py-1 rounded-md select-none cursor-pointer ${
                      currentPage === pageNumber
                        ? 'bg-neutral-800 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border  border-gray-300'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border cursor-pointer border-gray-300'
              }`}
            >
              <BiChevronRight className="text-xl" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableGlobal;
