const dummy = () => 1

const totalLikes = blogs => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = blogs => {
  const mostLiked = blogs.reduce((max, blog) => {
    return max.likes > blog.likes
      ? max
      : blog
  })
  const { title, author, likes } = mostLiked
  return { title, author, likes }
}

const mostBlogs = blogs => {
  const myMap = new Map()
  blogs.forEach(blog => {
    const value = myMap.has(blog.author)
      ? myMap.get(blog.author)
      : 0
    myMap.set(blog.author, value + 1)
  })
  const result = [...myMap].reduce((max, row) => (max[1] > row[1] ? max : row))
  return { author: result[0], blogs: result[1] }
}

const mostLikes = blogs => {
  const myMap = new Map()
  blogs.forEach(blog => {
    const value = myMap.has(blog.author)
      ? myMap.get(blog.author)
      : 0
    myMap.set(blog.author, value + blog.likes)
  })
  const result = [...myMap].reduce((max, row) => (max[1] > row[1] ? max : row))
  return { author: result[0], likes: result[1] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
