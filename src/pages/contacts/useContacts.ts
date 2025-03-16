import { useForm } from "react-hook-form";
import { DTOContacts } from "@/types/pages/contacts";

const useContacts = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<DTOContacts>();
    const onSubmit = (data: DTOContacts) => {
        console.log(data);
    }

    return { register, handleSubmit, errors, onSubmit };
}

export default useContacts;
