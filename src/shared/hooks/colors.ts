import { NinjaRank } from "../enum/rank";

export function ninjaColorByRank(rank: NinjaRank): string {
    switch (rank) {
        case NinjaRank.Hokage:
            return 'yellow-500';
        case NinjaRank.Jinchuriki:
            return 'purple-500';
        case NinjaRank.SanninLendario:
            return 'green-500';
        case NinjaRank.Nukenin:
            return 'red-500';
        case NinjaRank.Jonin:
            return 'blue-500';
        case NinjaRank.Desconhecido:
            return 'gray-500';
        case NinjaRank.Kazekage:
            return 'orange-500';
        case NinjaRank.Raikage:
            return 'indigo-500';
        case NinjaRank.Tsuchikage:
            return 'brown-500';
        case NinjaRank.Genin:
            return 'teal-500';
        case NinjaRank.Mizukage:
            return 'cyan-500';
        case NinjaRank.Chunin:
            return 'pink-500';
        default:
            return 'white';
    }
}