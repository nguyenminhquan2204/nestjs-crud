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


----------------------------------------------------------------
Design Database Simulation

Project Simulation {
  database_type: 'Postgresql'
}

Table refresh-tokens {
  userId Int
  tokenHash String
  expiresAt Date
  revokedAt Date | null
  tokenType Enum ['refresh_token', 'access_token', 'password_reset', 'email_verification']
}
Ref: tokens.userId > users.id [delete: cascade, update: no action]

Table users {
  id Int [pk, increment]
  email String [unique]
  passwordHash String
  name String
  phone String
  dateOfBirth Date
  status Enum ['pending', 'active', 'inactive']
  role Enum ['user', 'admin', 'researcher']

  createdBy Int
  createdAt DateTime [default 'now()']

  updatedBy Int
  updateAt DateTime [note: '@updatedAt']

  deletedBy Int
  deletedAt DateTime [note: '@deletedAt']
}

Table files {
  id Int [pk, increment]
  name String
  type String
  size String
  path String

  createdBy Int
  createdAt DateTime [default 'now()']

  updatedBy Int
  updateAt DateTime [note: '@updatedAt']

  deletedBy Int
  deletedAt DateTime [note: '@deletedAt']
}
Ref: files.id > models.id [delete: cascade, update: no action]
Ref: files.id > datasets.id [delete: cascade, update: no action]

Table models {
  id Int [pk, increment]
  fileId Int
  isExisting Enum ['internal', 'external']
  name String

  createdBy Int
  createdAt DateTime [default 'now()']

  updatedBy Int
  updateAt DateTime [note: '@updatedAt']

  deletedBy Int
  deletedAt DateTime [note: '@deletedAt']
}

Table datasets {
  id Int [pk, increment]
  fileId Int
  isExisting Enum ['internal', 'external']
  name String

  createdBy Int
  createdAt DateTime [default 'now()']

  updatedBy Int
  updateAt DateTime [note: '@updatedAt']

  deletedBy Int
  deletedAt DateTime [note: '@deletedAt']
}

Table trains {
  id Int [pk, increment]
  modelId Int
  datasetId Int
  fileParameterId Int
  fileResultId Int

  createdBy Int
  createdAt DateTime [default 'now()']

  deletedBy Int
  deletedAt DateTime [note: '@deletedAt']
}
Ref: trains.modelId = models.id [delete: cascade, update: no action]
Ref: trains.datasetId = datasets.id [delete: cascade, update: no action]


