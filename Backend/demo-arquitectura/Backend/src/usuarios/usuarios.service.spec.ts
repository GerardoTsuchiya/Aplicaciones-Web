import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

describe('UsuariosService', () => {
  let service: UsuariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService],
    }).compile();
    service = module.get<UsuariosService>(UsuariosService);
  });

  it('findAll retorna objeto con propiedad data', () => {
    const result = service.findAll();
    expect(result).toHaveProperty('data');
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('findOne retorna usuario existente', () => {
    const result = service.findOne(1);
    expect(result.data.id).toBe(1);
  });

  it('findOne lanza NotFoundException si el id no existe', () => {
    expect(() => service.findOne(9999)).toThrow(NotFoundException);
  });

  it('create agrega un usuario y lo retorna', () => {
    const antes = service.findAll().data.length;
    service.create({ nombre: 'Test', apellido: 'User' });
    expect(service.findAll().data.length).toBe(antes + 1);
  });

  it('update modifica campos parcialmente', () => {
    service.update(1, { nombre: 'Nuevo' });
    const result = service.findOne(1);
    expect(result.data.nombre).toBe('Nuevo');
  });

  it('replace reemplaza todos los campos', () => {
    service.replace(1, { nombre: 'Completo', apellido: 'Reemplazado' });
    const result = service.findOne(1);
    expect(result.data.nombre).toBe('Completo');
    expect(result.data.apellido).toBe('Reemplazado');
  });

  it('remove elimina el usuario', () => {
    const antes = service.findAll().data.length;
    service.remove(1);
    expect(service.findAll().data.length).toBe(antes - 1);
  });
});
