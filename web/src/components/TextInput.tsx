import { InputHTMLAttributes } from 'react'

interface TextInputInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function TextInput({ className, ...props }: TextInputInputProps) {
    return (
        <input 
            className={`px-4 py-3 rounded w-full h-full bg-gray-700 flex-1 outline-none text-gray-100 text-sm placeholder:text-gray-400 transition-all focus:ring-2 ring-blue-500 ${className}`}
            {...props}
        />
    )
}