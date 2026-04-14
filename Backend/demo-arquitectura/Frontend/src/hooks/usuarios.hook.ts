import { keepPreviousData, useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface Usuario {
    id: number;
    nombre: string;
    apellido: string;
}

export interface UsuariosResponse {
    data: Usuario[];
}

const URL = 'http://localhost:3000/';

export const useUsuarios = () => {
    return useQuery<UsuariosResponse, Error>({
        queryKey: ['getUsuarios'],
        queryFn: async () => {
            try {
                const response = await fetch(`${URL}usuarios`);
                if (!response.ok) {
                    throw new Error('Error al listar usuarios');
                }
                const data = await response.json();
                console.log('Usuarios obtenidos:', data);
                return data;
            }catch (error) {
                console.error('Error al listar usuarios:', error);
                throw error;
            }
        },
        placeholderData: keepPreviousData
    });
}

export const useAgregarUsuario = () => {
    const newQueryClient = useQueryClient();
    return useMutation({
        mutationKey: ['mutateUsuarios'],
        mutationFn: async (usuario: Usuario) => {
            const response = await fetch(`${URL}usuarios`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(usuario)
            });
            if (!response.ok) {
                throw new Error('Error al crear usuario');
            }
            return response.json();
        },
        onSuccess: () => {
            //Aqui volvemos a llamar la consulta para actualizar la lista.
            newQueryClient.invalidateQueries({ queryKey: ['getUsuarios'] });
        }
    });
}
