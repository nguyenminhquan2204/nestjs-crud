Project CRUD {
  database_type: 'SQLite'
}

Table User {
  id Int [pk, increment]
  email String [unique]
  name String
  password String
  createAt DateTime [default 'now()]
  updateAt DateTime [note: '@updatedAt']
}

Table Post {
  id Int [pk, increment]
  title String
  content String
  authorId Int
  createAt DateTime [default 'now()']
  updateAt DateTime [note: '@updateAt']
}
Ref: Post.authorId > User.id [delete: cascade, update: no action] // Khi delete user thi delete post cua user

Table RefreshToken {
  token String [unique]
  userId Int  
  expiresAt DateTime
  createAt DateTime [default 'now()']
}
Ref: RefreshToken.userId > User.id [delete: cascade, update: no action] // User delete is token user delete
