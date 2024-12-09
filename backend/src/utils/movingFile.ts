import { existsSync, rename } from 'fs'
import { resolve, join, basename, normalize } from 'path'

function movingFile(imagePath: string, from: string, to: string) {
    const fileName = basename(imagePath)
    const imagePathTemp = join(from, fileName)
    const imagePathPermanent = join(to, fileName)

    const normalizedPathTemp = normalize(imagePathTemp)
    const normalizedPathPermanent = normalize(imagePathPermanent)

    // Проверка на безопасность пути
    if (!normalizedPathTemp.startsWith(resolve(from))) {
        throw new Error('Неверный путь к временной папке')
    }
    if (!normalizedPathPermanent.startsWith(resolve(to))) {
        throw new Error('Неверный путь к постоянной папке')
    }

    if (!existsSync(normalizedPathTemp)) {
        throw new Error('Ошибка: файл не найден в временной папке')
    }

    // Перемещение файла
    rename(normalizedPathTemp, normalizedPathPermanent, (err) => {
        if (err) {
            throw new Error(
                'Ошибка при перемещении файла: '.concat(err.message)
            )
        }
    })
}

export default movingFile
