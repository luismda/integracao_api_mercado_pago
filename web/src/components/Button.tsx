import { ButtonHTMLAttributes, ReactNode } from 'react'

import { Loading } from './Loading'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    isLoading?: boolean;
}

export function Button({ children, isLoading = false, className, ...props }: ButtonProps) {
    return (
        <button 
            className={`px-4 py-3 flex justify-center items-center bg-blue-500 text-white rounded font-semibold text-sm w-full transition-colors ${isLoading ? 'cursor-not-allowed opacity-70' : 'hover:bg-blue-400 focus:ring-2'} outline-none ring-blue-600 ${className}`}
            disabled={isLoading}
            {...props}
        >
            {isLoading ? <Loading /> : children}
        </button>
    )
}