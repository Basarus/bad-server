import { v4 as uuidv4 } from 'uuid';

export const generateUniqueFileName = (originalName: string): string => {
    const ext = originalName.split('.').pop()
    const uniqueName = uuidv4()
    return `${uniqueName}.${ext}`
}
