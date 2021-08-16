import {GradesSDK} from "./gradesSDK";
import {CourseDefinitions} from "./courseDefinitions";
import {CourseInfo, StudentGroup} from "./GradesTypes";
import {CourseClassifications} from "./courseClassifications";

/**
 * Represents a course with it's Definitions and Classifications
 */
export class Course {
  private readonly sdk: GradesSDK;
  private readonly courseCode: string;

  constructor(courseCode: string, gradesSDK: GradesSDK) {
    this.sdk = gradesSDK;
    this.courseCode = courseCode;
  }

  /**
   * @returns CourseDefinitions
   */
  get definitions() {
    return new CourseDefinitions(this.sdk, this);
  }

  /**
   * @returns CourseClassifications
   */
  get classifications() {
    return new CourseClassifications(this.sdk, this);
  }

  /**
   * @returns course code
   */
  get code() {
    return this.courseCode;
  }

  /**
   * Get course information (full name, classes types, credit count, completion)
   * @param semester (optional): string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @returns Promise<CourseInfo>
   */
  async getCourseInfo(semester: string = 'current'): Promise<CourseInfo> {
    const decodedSemester = await this.sdk.getSemesterCode(semester);
    const url = this.sdk.api.urlForRequest('/public/courses/' + this.courseCode + '/information')
    return await this.sdk.api.get(url, {lang: this.sdk.lang, semester: decodedSemester});
  }

  /**
   * Get student groups
   * @param semester (optional): string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @param teacherUsername (optional): string;
   * @returns Promise<StudentGroup[]> (all groups returned when no teacherUsername is provided)
   */
  async getStudentGroups(semester: string = 'current', teacherUsername: string | null = null): Promise<StudentGroup[]> {
    const decodedSemester = await this.sdk.getSemesterCode(semester);
    const url = this.sdk.api.urlForRequest('/public/course/' + this.courseCode + '/student-groups');
    return await this.sdk.api.get(url, {
      lang: this.sdk.lang,
      semester: decodedSemester,
      teacherUsername: teacherUsername
    });
  }

}