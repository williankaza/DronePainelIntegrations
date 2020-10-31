export interface Drones{
    id: string,
    qtdMedicoes: number,
    lastMedicao: Array<Medicao>
}
  
export interface Medicao{
    temperatura: number,
    umidade: number,
    latitude: number,
    longitude: number,
    rastreamento: boolean,
    dataAtualizacao: string
}

export class Generics{
    static getDadosLastMedicao(medicoesDrone: any): Medicao{
        let ultimaMedicao = medicoesDrone.sort((a,b) => a.dataAtualizacao < b.dataAtualizacao ? 1:-1)
    
        if (ultimaMedicao != undefined){
            return {
                latitude: ultimaMedicao[0].latitude,
                longitude: ultimaMedicao[0].longitude,
                temperatura: ultimaMedicao[0].temperatura,
                umidade: ultimaMedicao[0].umidade,
                rastreamento: ultimaMedicao[0].rastreamento,
                dataAtualizacao: ultimaMedicao[0].dataAtualizacao
           }
        }
    }
}