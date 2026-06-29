interface FormInputProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    error?: string;
}

export default function FormInput({
    label,
    name,
    type = 'text',
    placeholder,
    error,
}: FormInputProps) {
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                required
                name={name}
                placeholder={placeholder}
                id={name}
                className={`border h-10 rounded-xl focus:outline-none px-4 py-2 
                    ${error ? 'border-red-500' : 'focus:border-indigo-300'}`}
            />
            {error && <span className='text-red-500 text-sm'>{error}</span>}
        </div>
    );
}
