import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const create = async (req,res) => {
    try {
        console.log(req.userd)
        const post = await prisma.post.create({
            data: {
                title: req.body.title,
                text: req.body.title,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                userId: req.userId
            }
        })

        res.json(post)
    } catch(e) {
        console.log(e)
        res.status(500).json({
          message: 'Не удалось создать статью'
        })
    }
}

export const getAll = async (req,res) => {
    try {
        const posts = await prisma.post.findMany({
            include: {
                user: true
            }
        })
        res.json(posts)
    } catch(e){
        console.log(e)
        res.status(500).json({
          message: 'Не удалось получить статьи'
        })
    }
}
export const getOne = async (req,res) => {
    try {
        const postId = req.params.id
        const getPost = await prisma.post.update({
            where: {
            id: Number(postId)
            },
            data: {
                viewsCount: {increment: 1}
            }
        })

        if(!getPost){
            return res.status(400).json({
                message: 'Данной статьи нет'
            })
        }
        // const addPost = await prisma.post.update({
        //     data: {
        //         viewsCount: getPost.viewsCount + 1
        //     }
        // })
        res.json({
            getPost,
            // addPost
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
          message: 'Не удалось получить статью'
        })
    }
}

export const remove = async (req,res) => {
    try {
        const postId = req.params.id
        const getPost = await prisma.post.delete({
            where: {
            id: Number(postId)
            },
        })

        if(!getPost){
            return res.status(400).json({
                message: 'Данной статьи нет'
            })
        }

        res.json({
            success: 'Статья удалена'
        })
    } catch(e){
        console.log(e)
        res.status(500).json({
          message: 'Не удалось получить статью'
        })
    }
}

export const update = async (req,res) => {
    try {
        const postId = req.params.id
        const updatePosts = await prisma.post.update({
            where: {
                id: Number(postId)
            },
            data: {
                title: req.body.title,
                text: req.body.title,
                imageUrl: req.body.imageUrl,
                tags: req.body.tags,
                userId: req.userId
            }
        })
        res.json({
            success: true
        })
    } catch(e) {
        console.log(e)
        res.status(500).json({
          message: 'Не удалось обновить статью'
        })
    }
}