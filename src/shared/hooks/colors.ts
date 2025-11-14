import { NinjaRank } from "../enum/rank";

export function ninjaColorByRank(rank: NinjaRank): string {
    switch (rank) {
        case NinjaRank.Hokage:
            return 'from-yellow-400 to-yellow-600';
        case NinjaRank.Jinchuriki:
            return 'from-purple-400 to-purple-600';
        case NinjaRank.SanninLendario:
            return 'from-green-400 to-green-600';
        case NinjaRank.Nukenin:
            return 'from-red-400 to-red-600';
        case NinjaRank.Jonin:
            return 'from-blue-400 to-blue-600';
        case NinjaRank.Desconhecido:
            return 'from-gray-400 to-gray-600';
        case NinjaRank.Kazekage:
            return 'from-orange-400 to-orange-600';
        case NinjaRank.Raikage:
            return 'from-indigo-400 to-indigo-600';
        case NinjaRank.Tsuchikage:
            return 'from-amber-700 to-amber-900';
        case NinjaRank.Genin:
            return 'from-teal-400 to-teal-600';
        case NinjaRank.Mizukage:
            return 'from-cyan-400 to-cyan-600';
        case NinjaRank.Chunin:
            return 'from-pink-400 to-pink-600';
        default:
            return 'from-gray-400 to-gray-600';
    }
}