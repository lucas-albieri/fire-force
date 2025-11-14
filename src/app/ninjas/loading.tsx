export default function Loading() {
    return <div
        className="flex min-h-screen w-full flex-col items-center justify-center py-32 sm:items-center"
    >
        <div className="relative text-5xl font-sans text-transparent bg-clip-text bg-linear-to-br from-orange-300 via-orange-500 to-red-800 transition-all duration-500 animate-pulse mb-4">
            火
        </div>
        <span className="text-orange-600 animate-pulse text-xl">Carregando ninjas...</span>

    </div>;
}