import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
///GET ALL POSTS
export const getPosts = async (req, res) => {
  const query = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000,
        },
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to get Posts" });
  }
};

//SINGLE POST

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post bulunamadı" });
    }

    const token = req.cookies?.token;

    if (token) {
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });

        return res.status(200).json({ ...post, isSaved: !!saved });
      } catch (err) {
        console.error("JWT doğrulama hatası:", err);
        return res.status(401).json({ message: "Yetkisiz" });
      }
    } else {
      return res.status(200).json({ ...post, isSaved: false });
    }
  } catch (err) {
    console.error("Veritabanı hatası:", err);
    return res.status(500).json({ message: "Sunucu Hatası" });
  }
};

//CREATE NEW POST

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;
  try {
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,
        userId: tokenUserId,
        postDetail: {
          create: body.postDetail,
        },
      },
    });
    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to CREATE Post" });
  }
};

//UPDATE POST

export const updatePost = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to UPDATE Post" });
  }
};

///DELETE POST

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not Authentorized!" });
    }

    await prisma.post.delete({
      where: {
        id,
      },
    });
    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to DELETE Post" });
  }
};
