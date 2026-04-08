import { keepPreviousData, useQuery } from '@tanstack/react-query';

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
}

export interface UsuariosResponse {
    data: Usuario[];
}

export const useUsuarios = () => {
    return useQuery<UsuariosResponse, Error>({
        queryKey: ['getUsuarios'],
        queryFn: async () => {
            try {
                const response = await fetch('http://localhost:3000/usuarios');
                if (!response.ok) {
                    throw new Error('Error al listar usuarios');
                }
                const data = await response.json();
                return data;
            }catch (error) {
                console.error('Error al listar usuarios:', error);
                throw error;
            }
        },
        placeholderData: keepPreviousData
    });
}
