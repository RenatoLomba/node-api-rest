export default class PhotoDTO {
  constructor({
    id, originalname, filename, student_id, url,
  }) {
    this.id = id;
    this.originalname = originalname;
    this.filename = filename;
    this.student_id = student_id;
    this.url = url;
  }
}
