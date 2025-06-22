const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient();

async function main() {
  // Ensure at least one user exists
  let user = await prisma.user.findFirst();
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: 'Seed User',
        email: 'seeduser@example.com',
        password: 'password',
      },
    });
  }

  // Create 20 blogs
  for (let i = 1; i <= 20; i++) {
    await prisma.blog.create({
      data: {
        title: `Sample Blog Post ${i}`,
        slug: `sample-blog-post-${i}`,
        content: `This is the content for blog post number ${i}.`,
        summary: `Summary for blog post ${i}.`,
        image: `https://picsum.photos/seed/blog${i}/400/200`,
        isFeatured: i % 3 === 0,
        published: i % 2 === 0,
        authorId: user.id,
        tags: [`tag${i}`, `tag${(i % 5) + 1}`],
      },
    });
  }
}

main()
  .then(() => {
    console.log('Seed complete');
    return prisma.$disconnect();
  })
  .catch((e) => {
    console.error(e);
    return prisma.$disconnect();
  });