import { Hono } from 'hono'
import { verify } from "hono/jwt"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { createPostInput, updatePostInput } from '@perplexedfor/medium' 
export const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string
    },
    Variables: {
        userId: string;
    }
}>()

blogRouter.use("/*", async (c,next)=>{
    const authHeader = c.req.header("authorization") || "";

    const user = await verify(authHeader, c.env.JWT_SECRET);
    if(user){
        c.set("userId", user.id)
        await next();
    }else{
        c.status(403);
        return c.json({
            message: "You are not logged in"
        })
    }
    
})

blogRouter.post('/blog', async (c) => {
    const userId = c.get('userId');

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({ error: "invalid input"});
    }
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })

    return c.json({
        id: post.id
    })
  })
blogRouter.put('/blog',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json();
    const userId = c.get('userId');
    const success = updatePostInput.safeParse(body);
    if(!success){
        c.status(400);
        return c.json({ error: "Invalid Input "});
    }
    const post = await prisma.post.update({
        where: {
            id: body.id,
            authorId: userId
        },
        data: {
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: post.id
    })
  })
blogRouter.get('/blog/:id', async (c) => {
    const id = c.req.param('id');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try {
        const post = await prisma.post.findUnique({
            where: {
                id
            }
        });
        return c.json(post);
    } catch(e){
        c.status(411)
    }
    return c.json({
        message: "Error while fetching the data"
    }) 
})

//can add pagination to the posts

blogRouter.get('/blog/bulk',async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const posts = await prisma.post.findMany();

	return c.json({
        posts
    });
  })