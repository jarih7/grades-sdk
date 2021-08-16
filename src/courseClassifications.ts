import {GradesSDK} from "./gradesSDK";
import {Course} from "./course";
import {ClassificationDTO} from "./gradesTypes";
import {Classification, Student} from "./classification";
import { toArray } from "./helpers";

/**
 * CourseClassifications acts as a Classification manager for a given course
 */
export class CourseClassifications {
  private sdk: GradesSDK;
  private course: Course;

  constructor(sdk: GradesSDK, course: Course) {
    this.sdk = sdk;
    this.course = course;
  }

  /**
   * Fetches data from api based on the provided url and semester
   * @param semester: string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @param urlTail - desired Grades endpoint
   * @private
   */
  private async fetchClassificationData(semester: string, urlTail: string) {
    const decodedSemester = await this.sdk.getSemesterCode(semester);
    const url = this.sdk.api.urlForRequest('/public/courses/' + this.course.code + urlTail);
    return await this.sdk.api.get(url, {lang: this.sdk.lang, semester: decodedSemester});
  }

  /**
   * Get Classifications for a specified student
   * @param studentUsername (required): string
   * @param semester (optional): string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @returns Promise<Student>
   */
  async getStudentClassifications(studentUsername: string, semester: string = 'current'): Promise<Student> {
    const urlTail = '/student-classifications/' + studentUsername;
    const fetched = await this.fetchClassificationData(semester, urlTail);
    return Student.parseSingleStudent(fetched);
  }

  /**
   * Get Classifications of the students of a given group
   * @param groupCode (required): string; ex.: 'ALL', 'MY_LECTURES', 'MY_PARALLELS'
   * @param semester (optional): string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @returns Promise<Student[]>
   */
  async getStudentClassificationsForGroup(groupCode: string, semester: string = 'current'): Promise<Student[]> {
    const urlTail = '/group/' + groupCode + '/student-classifications';
    const fetched = await this.fetchClassificationData(semester, urlTail);
    let result: Student[] = [];
    fetched.forEach((studentData: any) => {
      result.push(Student.parseGroupStudent(studentData));
    });
    return result;
  }

  /**
   * Get student group's Classifications for a specified definition
   * @param groupCode (required): string; ex.: 'ALL', 'MY_LECTURES', 'MY_PARALLELS'
   * @param definitionIdentifier (required): string
   * @param semester (optional): string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @returns Promise<Student[]>
   */
  async getStudentClassificationsForGroupAndDefinition(groupCode: string, definitionIdentifier: string, semester: string = 'current'): Promise<Student[]> {
    const urlTail = '/group/' + groupCode + '/student-classifications/' + definitionIdentifier;
    const fetched = await this.fetchClassificationData(semester, urlTail);
    let result: Student[] = [];
    fetched.forEach((element: any) => {
      result.push(Student.parseGroupStudentForDefinition(element));
    });
    return result;
  }

  /**
   * Save student's Classification(s)
   * @param classifications
   * @param semester (optional): string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @param options: { notify: boolean }
   * @returns Promise<void>
   */
     async saveStudentClassifications(classifications: Classification | Classification[], semester: string = 'current', options: { notify: boolean } = {notify: true}) {
      const decodedSemester = await this.sdk.getSemesterCode(semester);
      const url = this.sdk.api.urlForRequest('/public/courses/' + this.course.code + '/student-classifications');
      classifications = toArray(classifications);
      const dataToSend = this.createClassificationsDTO(classifications);
      await this.sdk.api.put(url, dataToSend, {notify: options.notify, semester: decodedSemester});
    }

  //-------------------------------------------

  /**
   * Transforms provided Classifications data into a form for sending to api
   * @param classifications - provided classifications data
   * @private
   * @returns ClassificationDTO[] for sending to api
   */
  private createClassificationsDTO(classifications: Classification[]): ClassificationDTO[] {
    let data: ClassificationDTO[] = [];
    classifications.forEach((classification: Classification) => {
      data.push(classification.serialize());
    });
    return data;
  }
}