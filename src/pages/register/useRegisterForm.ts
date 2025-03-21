import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const useRegisterForm = () => {
    const [step, setStep] = useState(1);
    const [selectedPayment, setSelectedPayment] = useState<'card' | 'pse' | null>(null);
    
    const distributorsOptions = [
        { value: 'dental_83', label: 'Dental 83' },
        { value: 'dental_nader', label: 'Dental Nader' },
        { value: 'dentales_market', label: 'Dentales Market' },
        { value: 'casa_dental', label: 'Casa Dental' },
        { value: 'orbidental', label: 'Orbidental' },
        { value: 'bracket', label: 'Bracket' },
        { value: 'adental', label: 'Adental' }
    ];

    const proceduresOptions = [
        { value: 'odontologia_general', label: 'Odontología General' },
        { value: 'restauraciones_indirectas', label: 'Restauraciones indirectas' },
        { value: 'restauraciones_directas', label: 'Restauraciones directas' },
        { value: 'diseno_sonrisa', label: 'Diseño de sonrisa' },
        { value: 'ortodoncia_tradicional', label: 'Ortodoncia tradicional' },
        { value: 'ortodoncia_autoligado', label: 'Ortodoncia con autoligado' },
        { value: 'ortodoncia_alineadores', label: 'Ortodoncia con Alineadores' },
        { value: 'odontopediatra', label: 'Odontopediatra' },
        { value: 'estudiante', label: 'Estudiante' },
        { value: 'otro', label: 'Otro' }
    ];

    const brandOptions = [
        { value: 'ivoclar', label: 'Ivoclar' },
        { value: 'ultradent', label: 'Ultradent' },
        { value: 'bisco', label: 'Bisco' },
        { value: 'ormco', label: 'Ormco' },
        { value: 'forestadent', label: 'Forestadent' },
        { value: 'invisalign', label: 'Invisalign' },
        { value: 'clear_correct', label: 'Clear Correct' },
        { value: 'otro', label: 'Otro ¿Cuál?' }
    ];

    const banksOptions = [
        { value: 'bancolombia', label: 'Bancolombia' },
        { value: 'banco_bogota', label: 'Banco de Bogotá' },
        { value: 'davivienda', label: 'Davivienda' },
        { value: 'bbva', label: 'BBVA' },
        { value: 'banco_occidente', label: 'Banco de Occidente' },
        { value: 'banco_popular', label: 'Banco Popular' },
        { value: 'banco_agrario', label: 'Banco Agrario' },
        { value: 'banco_avvillas', label: 'Banco AV Villas' }
    ];

    const documentTypeOptions = [
        { value: 'cc', label: 'Cédula de Ciudadanía' },
        { value: 'ce', label: 'Cédula de Extranjería' },
        { value: 'passport', label: 'Pasaporte' },
        { value: 'nit', label: 'NIT' },
        { value: 'ti', label: 'Tarjeta de Identidad' }
    ];

    // Formulario principal para info personal y profesional
    const { 
        register, 
        handleSubmit, 
        control, 
        formState: { errors }, 
        trigger,
        watch
    } = useForm({
        mode: "onChange"
    });

    // Formulario separado para pagos
    const { 
        register: registerPayment, 
        handleSubmit: handleSubmitPayment,
        control: controlPayment,
        formState: { errors: paymentErrors }, 
        trigger: triggerPayment 
    } = useForm({
        mode: "onChange"
    });

    const handleStep1Submit = async (data: any) => {
        console.log(data);
        const isValid = await trigger(['first_name', 'last_name', 'email', 'id', 'phone', 'city']);
        if (!isValid) {
            toast.error('Por favor complete todos los campos requeridos');
            return;
        }
        setStep(2);
        toast.success('Información personal guardada correctamente');
    };

    const handleStep2Submit = async (data: any) => {
      console.log(data);
        if (!data.distributor || !data.main_procedure || !data.brand || !data.cases_per_week) {
            toast.error('Por favor complete todos los campos requeridos');
            return;
        }
        setStep(3);
        toast.success('Información profesional guardada correctamente');
    };

    const handleStep3Submit = async (data: any) => {
        console.log(data);
        if (selectedPayment === 'card') {
            const isValid = await triggerPayment(['card_name', 'card_number', 'expiry_date', 'cvc']);
            if (!isValid) {
                toast.error('Por favor complete todos los campos de la tarjeta');
                return;
            }
        } else if (selectedPayment === 'pse') {
            const isValid = await triggerPayment(['bank', 'document_type']);
            if (!isValid) {
                toast.error('Por favor complete todos los campos de PSE');
                return;
            }
        }
        toast.success('Registro completado correctamente');
    };

    return {
        step,
        setStep,
        selectedPayment,
        setSelectedPayment,
        register,
        registerPayment,
        control,
        controlPayment,
        errors,
        paymentErrors,
        handleStep1Submit,
        handleStep2Submit,
        handleStep3Submit,
        handleSubmit,
        handleSubmitPayment,
        distributorsOptions,
        proceduresOptions,
        brandOptions,
        banksOptions,
        documentTypeOptions,
        watch
    };
};

export default useRegisterForm;
