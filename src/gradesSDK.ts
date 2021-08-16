import {ApiRequestor, GradesURL} from './apiRequestor';
import {Course} from './course';

/**
 * GradesSDK provides access to Grades API regarding a specified course
 */
export class GradesSDK {
  private _lang: string | null = null;
  private readonly apiRequestor: ApiRequestor;

  constructor(gradesEndpoint: GradesURL, clientId: string, clientSecret: string, lang: string | null = null) {
    this._lang = lang;
    this.apiRequestor = new ApiRequestor(clientId, clientSecret, gradesEndpoint);
  }

  get lang(): string | null {
    return this._lang;
  }

  set lang(value: string | null) {
    this._lang = value;
  }

  /**
   * Provides access to HTTP request methods
   */
  get api() {
    return this.apiRequestor;
  }

  /**
   * Provides a Course object for managing the course's data
   * @param courseCode
   * @returns Course
   */
  getCourse(courseCode: string) {
    return new Course(courseCode, this);
  }

  /**
   * Get semester code
   * @param semester (optional): string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @returns Promise<string>
   */
  async getSemesterCode(semester: string = 'current'): Promise<string> {
    const url = this.apiRequestor.urlForRequest('/public/semester-code');
    return await this.apiRequestor.get(url, {semester: semester});
  }
}

module.exports = {
  GradesSDK, GradesURL
}
