const CarroService = require('../services/CarroService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = {error:'', result:[]};

        let carros = await CarroService.buscarTodos();

        for(let i in carros){
            json.result.push({
                codigo: carros[i].codigo,
                descricao: carros[i].modelo
            });
        }

        res.json(json);
    },
    buscarUm: async (req, res) => {
        let json = {error:'', result:[]};

        let codigo = req.params.codigo; 
        let carro = await CarroService.buscarUm(codigo);

        if(!carro){
            return res.send('carro não encontrado')
        }

            json.result = carro;

            res.json(json);
    },

    inserir: async (req, res) => {
        let json = {error:'', result:[]};

        const { modelo, placa } = req.body;
       
        if(modelo && placa){
            const CarroCodigo = await CarroService.inserir(modelo, placa);
            json.result = {
                codigo: CarroCodigo,
                modelo,
                placa
            }
        }else{
            json.error = 'Campos não enviados'

        } 
        res.json(json);
    },
    alterar: async (req, res) => {
        let json = {error:'', result:[]};

        const { modelo, placa } = req.body;
        let codigo = req.params.codigo; 
        let carro = await CarroService.buscarUm(codigo);

        if(codigo && modelo && placa){
            await CarroService.alterar(codigo, modelo, placa);
            json.result = {
                codigo,
                modelo,
                placa
            }
        }else{
            json.error = 'Campos não enviados'

        } 
        res.json(json);
    },
    excluir: async(req, res) => {
        let json = {error:'', result:[]};
        let codigo = req.params.codigo; 

        await CarroService.excluir(codigo);

        res.json(json)
    }
};