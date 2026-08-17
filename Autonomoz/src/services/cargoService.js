const cargoRepository = require('../repositories/cargoRepository');

class CargoService {
    async getAll() {
        return await cargoRepository.findAll();
    }

    async getById(id) {
        const cargo = await cargoRepository.findById(id);
        if (!cargo) throw new Error('Cargo não encontrado.');
        return cargo;
    }

    async create(cargoData) {
        if (!cargoData.nome_cargo) {
            throw new Error('O nome do cargo é obrigatório.');
        }
        const newId = await cargoRepository.save(cargoData);
        return { id_cargo: newId, ...cargoData };
    }

    async update(id, cargoData) {
        const cargo = await cargoRepository.findById(id);
        if (!cargo) throw new Error('Cargo não encontrado.');
        await cargoRepository.update(id, cargoData);
        return true;
    }

    async delete(id) {
        const cargo = await cargoRepository.findById(id);
        if (!cargo) throw new Error('Cargo não encontrado.');
        return await cargoRepository.delete(id);
    }
}

module.exports = new CargoService();