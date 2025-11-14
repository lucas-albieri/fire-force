'use client'

import type { Character } from "@/shared/types/characters"
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
                        <div className="relative aspect-video rounded-xl overflow-hidden bg-card/10 border border-orange-400/20 shadow-xl">
                            <Image
                                src={selectedImage}
                                alt={`${ninja.name} - Imagem principal`}
                                fill
                                className="object-contain"
                                quality={100}
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Thumbnails Grid */}
                    <div className="space-y-3">
                        <h3 className="text-sm font-semibold text-orange-400 uppercase tracking-wider mb-4">
                            {allImages.length} {allImages.length === 1 ? 'Imagem' : 'Imagens'}
                        </h3>
                        <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                            {allImages.map((image, idx) => (
                                <button
                                    key={image.id || idx}
                                    type="button"
                                    onClick={() => setSelectedImage(image.image_url)}
                                    className={`relative aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${selectedImage === image.image_url
                                            ? 'border-orange-400 shadow-lg shadow-orange-400/30'
                                            : 'border-orange-400/20 hover:border-orange-400/50'
                                        }`}
                                >
                                    <Image
                                        src={image.image_url}
                                        alt={`${ninja.name} - ${image.image_type || 'imagem'} ${idx + 1}`}
                                        fill
                                        className="object-cover"
                                        quality={80}
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

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(251, 146, 60, 0.1);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(251, 146, 60, 0.5);
                    border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(251, 146, 60, 0.7);
                }
            `}</style>
        </section>
    )
}
