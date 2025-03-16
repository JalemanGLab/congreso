import { BsSend } from "react-icons/bs";
import InputField from "@/components/shared/InputField/InputField";
import { IoMail } from "react-icons/io5";
import { IoArrowForward } from "react-icons/io5";
import useContacts from "./useContacts";

const PageContacts = () => {
    const { 
        register, 
        handleSubmit, 
        errors, 
        onSubmit 
    } = useContacts();
    return (
        <div className="w-full flex flex-col gap-5">
            <div className="flex flex-col gap-4">
                <div className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
                    <BsSend className="text-neutral-900 " />
                    Formulario de Contacto
                </div>
                <div className="text-neutral-500 px-[38px]">
                    Envíanos tus mensajes y te responderemos pronto
                </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full md:px-10  flex flex-col gap-4">
                <div className="w-full flex flex-col sm:flex-row gap-4">
                    <InputField 
                        name="email"
                        inputType="email"
                        placeholder="Correo electrónico"
                        label="Correo electrónico"
                        childrenIcon={<IoMail className="text-2xl"/>}
                        register={register}
                        errors={errors}
                        rules={{ required: true }}
                    />
                    <InputField 
                        name="subject"
                        inputType="text"
                        placeholder="Asunto"
                        label="Asunto"
                        childrenIcon={<IoMail className="text-2xl"/>}
                        register={register}
                        errors={errors}
                        rules={{ required: true }}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-500 font-normal">Mensaje</label>
                    <textarea 
                        {...register("message")}
                        placeholder="Mensaje"
                        className="w-full h-24 min-h-[150px] max-h-[150px] p-2 border border-gray-300 rounded-md resize-none outline-none"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="bg-primary text-white w-full h-12 sm:w-32 rounded-sm flex items-center justify-center gap-2 cursor-pointer hover:opacity-80 transition-all duration-300">
                        Enviar 
                        <IoArrowForward className="text-white" />
                    </button>
                </div>
            </form>
        </div>
    )
}

export default PageContacts