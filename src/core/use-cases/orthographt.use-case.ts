export const orthographyUseCase = async( prompt: string ) => {
    try {
        
    const resp = await fetch(`${ import.meta.env.VITE_GPT_API }/orthography-check`)

    } catch (error) {
        return {
            ok: false,
            useScore: 0,
            errors: [],
            message: 'No se puedo realizar la conexión'
        }
    }
}