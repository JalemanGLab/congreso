import useRegisterForm from './useRegisterForm';
import { FaUser, FaPhoneAlt, FaCity, FaClipboardList } from "react-icons/fa";
import { HiIdentification } from "react-icons/hi2";

const RegisterForm = () => {
   const { register, handleSubmit, errors, onSubmit } = useRegisterForm();

   return (
      <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
         {/* Contenedor principal con imagen de fondo */}
         <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Encabezado con imagen */}
            <div className="relative h-40 bg-black flex items-center justify-center text-white text-2xl font-bold">
               <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/path-to-header-image.jpg)' }}></div>
               <div className="relative z-10">Formulario de Registro</div>
            </div>
            
            {/* Contenido del formulario */}
            <div className="p-8">
               {/* Sección de pasos */}
               <div className="flex justify-center mb-6">
                  <div className="flex items-center gap-4">
                     <div className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full">
                        <FaUser />
                     </div>
                     <span className="font-medium">Datos Personales</span>
                  </div>
                  <div className="w-20 h-[1px] bg-gray-300 mx-4"></div>
                  <div className="flex items-center gap-4 text-gray-500">
                     <div className="flex items-center justify-center w-10 h-10 bg-gray-300 rounded-full">
                        <FaClipboardList />
                     </div>
                     <span>Método de Pago</span>
                  </div>
               </div>

               <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Información Personal */}
                  <div className="mb-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-2">Información Personal</h2>
                     <p className="text-sm text-gray-500 mb-4">Por favor complete sus datos personales</p>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm text-gray-600">Nombre</label>
                           <input type="text" placeholder="Ingrese su nombre" {...register("name")} className="w-full h-10 border px-3 rounded" />
                        </div>
                        <div>
                           <label className="block text-sm text-gray-600">Apellido</label>
                           <input type="text" placeholder="Ingrese su apellido" {...register("lastname")} className="w-full h-10 border px-3 rounded" />
                        </div>
                        <div>
                           <label className="block text-sm text-gray-600">Cédula</label>
                           <input type="text" placeholder="Número de cédula" {...register("id")} className="w-full h-10 border px-3 rounded" />
                        </div>
                        <div>
                           <label className="block text-sm text-gray-600">Número de Celular</label>
                           <input type="text" placeholder="Número de celular" {...register("phone")} className="w-full h-10 border px-3 rounded" />
                        </div>
                        <div>
                           <label className="block text-sm text-gray-600">Ciudad</label>
                           <input type="text" placeholder="Ciudad" {...register("city")} className="w-full h-10 border px-3 rounded" />
                        </div>
                     </div>
                  </div>

                  {/* Información Profesional */}
                  <div className="mb-6">
                     <h2 className="text-xl font-semibold text-gray-900 mb-2">Información Profesional</h2>
                     <p className="text-sm text-gray-500 mb-4">Cuéntanos sobre su práctica profesional</p>
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                           <label className="block text-sm text-gray-600">¿Dónde quieres redimir el bono?</label>
                           <select className="w-full h-10 border px-3 rounded" {...register("location")}>
                              <option>Seleccione una ubicación</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-sm text-gray-600">¿Cuál es el principal procedimiento clínico?</label>
                           <select className="w-full h-10 border px-3 rounded" {...register("procedure")}>
                              <option>Seleccione un procedimiento</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-sm text-gray-600">¿Marca que más usa en su consulta?</label>
                           <select className="w-full h-10 border px-3 rounded" {...register("brand")}>
                              <option>Seleccione una marca</option>
                           </select>
                        </div>
                        <div>
                           <label className="block text-sm text-gray-600">Casos por semana</label>
                           <input type="number" min="1" className="w-full h-10 border px-3 rounded" {...register("casesPerWeek")} />
                        </div>
                     </div>
                  </div>

                  <button type="submit" className="w-full bg-black text-white py-2 rounded-md">Continuar a Opciones de Pago</button>
               </form>
            </div>
         </div>
      </div>
   );
}

export default RegisterForm;
