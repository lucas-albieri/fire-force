import '@testing-library/jest-dom'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
    constructor () { }
    disconnect() { }
    observe() { }
    takeRecords() {
        return []
    }
    unobserve() { }
    // biome-ignore lint/suspicious/noExplicitAny: necessário para mock global
} as any
