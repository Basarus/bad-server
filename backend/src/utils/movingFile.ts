import { existsSync, rename } from 'fs'
import { resolve, join, basename } from 'path'

function movingFile(imagePath: string, from: string, to: string) {
    const fileName = basename(imagePath)
    const imagePathTemp = join(from, fileName)
    const imagePathPermanent = join(to, fileName)

    // Проверка на безопасность пути
    if (!imagePathTemp.startsWith(resolve(from))) {
        throw new Error('Неверный путь к временной папке')
    }
    if (!imagePathPermanent.startsWith(resolve(to))) {
        throw new Error('Неверный путь к постоянной папке')
    }

    if (!existsSync(imagePathTemp)) {
        throw new Error('Ошибка: файл не найден в временной папке')
    }

    rename(imagePathTemp, imagePathPermanent, (err) => {
        if (err) {
            throw new Error(
                'Ошибка при перемещении файла: '.concat(err.message)
            )
        }
    })
}

export default movingFile
