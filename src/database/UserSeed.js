class UserSeed {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password_hash = password;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
module.exports = UserSeed;
