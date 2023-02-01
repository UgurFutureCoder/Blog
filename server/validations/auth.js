import { body } from "express-validator";

export const loginValidation = [
        body('email', 'Неверный формат почты').isEmail(),
// похож ли это на емайл
    body('password', 'Минимальное количество символов 5').isLength({min: 5}),
]

export const registerValidation = [
        // это простая валидация даже как на реакте допустим
        body('email', 'Неверный формат почты').isEmail(),
// похож ли это на емайл
    body('password', 'Минимальное количество символов 5').isLength({min: 5}),
// больше ли длина 5 строк
body('fullName', 'Укажите Имя').isLength({min: 5}),
body('avatarUrl', 'Неверная ссылка на аватарку').optional().isURL()
        // опциональный тоесть ссылки и может и не быть но если будет являеться ли она ссылкой
]

export const postCreateValidation = [
        body('title', 'Введите заголовок статьи').isLength({min: 3}).isString(),
        body('text', 'Введите текст статьи').isLength({min: 10}).isString(),
        body('tags', 'Неверный формат тегов (укажите массив)').optional().isString(),
        body('imageUrl', 'Неверная ссылка на изображение').optional().isString(),
]


