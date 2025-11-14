'use client'

import type { Character } from "@/shared/types/characters"
import { DownloadIcon } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
    ninja: Character
}

export function ImageGallery({ ninja }: ImageGalleryProps) {

    const allImages = [
        ...(ninja.profile_image ? [{ id: 0, image_url: ninja.profile_image, image_type: 'profile' }] : []),
        ...(ninja.images || [])
    ]

    const [selectedImage, setSelectedImage] = useState(allImages[0]?.image_url || '')

    const handleDownload = async (imageUrl: string, imageName: string) => {
        try {
            const response = await fetch(imageUrl)
            const blob = await response.blob()
            const url = window.URL.createObjectURL(blob)
            const link = document.createElement('a')
            link.href = url
            link.download = `${ninja.name}-${imageName}.jpg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(url)
        } catch (error) {
            console.error('Erro ao baixar imagem:', error)
        }
    }

    if (allImages.length === 0) {
        return null
    }

    return (
        <section className="py-16 px-4 md:px-8 lg:px-16 border-t border-orange-400/10">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-8">
                    <div className="h-1 w-12 bg-linear-to-r from-orange-400 to-orange-500"></div>
                    <h2 className="text-2xl font-bold">Galeria de Imagens</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Image */}
                    <div className="lg:col-span-2">
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-card/10 border border-orange-400/20 shadow-xl group">
                            <Image
                                src={selectedImage}
                                alt={`${ninja.name} - Imagem principal`}
                                fill
                                className="object-contain"
                                quality={100}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 900px"
                                unoptimized
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />

                            {/* Download Button */}
                            <button
                                type="button"
                                onClick={() => handleDownload(selectedImage, 'imagem')}
                                className="absolute top-4 right-4 p-3 bg-orange-500/90 hover:bg-orange-500 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 shadow-lg hover:scale-110"
                                title="Baixar imagem"
                                aria-label="Baixar imagem"
                            >
                                <DownloadIcon className="h-5 w-5 text-white cursor-pointer" />
                            </button>
                        </div>
                    </div>

                    {/* Thumbnails Grid */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-4">
                            {allImages.length} {allImages.length === 1 ? 'Imagem' : 'Imagens'}
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                            {allImages.map((image, idx) => (
                                <button
                                    key={image.id || idx}
                                    type="button"
                                    onClick={() => setSelectedImage(image.image_url)}
                                    className={`cursor-pointer relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${selectedImage === image.image_url
                                        ? 'border-orange-400 shadow-lg shadow-orange-400/30'
                                        : 'border-orange-400/20 hover:border-orange-400/50'
                                        }`}
                                >
                                    <Image
                                        src={image.image_url}
                                        alt={`${ninja.name} - ${image.image_type || 'imagem'} ${idx + 1}`}
                                        fill
                                        className="object-cover object-top"
                                        quality={100}
                                        sizes="(max-width: 1024px) 50vw, 300px"
                                        unoptimized
                                    />
                                    {image.image_type === 'profile' && (
                                        <div className="absolute top-1 right-1 px-2 py-1 bg-orange-400/90 rounded text-xs font-semibold text-white">
                                            Perfil
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
