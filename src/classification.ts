import {ClassificationInterface, StudentInterface} from "./gradesTypes";
export type ClassificationMap = { [definition: string]: Classification; };

/**
 * Classification represents an evaluation of a Definition, ex.: student A received 5 pts from homework No. 1
 */
export class Classification implements ClassificationInterface {
  studentUsername: string;
  definitionIdentifier: string;
  value: number | string | boolean;
  note: string | null;
  timestamp: string | null;

  constructor(data: ClassificationInterface) {
    this.definitionIdentifier = data.definitionIdentifier;
    this.value = data.value;
    this.note = data.note;
    this.timestamp = data.timestamp;
    this.studentUsername = data.studentUsername;
  }

  /**
   * Transforms the Classification into an object ready to be sent to Grades api
   */
  serialize() {
    return {
      studentUsername: this.studentUsername, 
      classificationIdentifier: this.definitionIdentifier,
      value: this.value,
      note: this.note,
      timestamp: this.timestamp
    };
  }

  /**
   * Parses Classifications of a single student into a ClassificationMap object
   * @param data
   * @returns ClassificationMap
   */
  static parseSingleStudentClassifications(data: any) {
    let classifications: ClassificationMap = {};
    data.studentClassificationFullDtos.forEach((task: any) => {
      const parsed = Classification.parseSingleStudentToInterface(task, data.username);
      classifications[parsed.definitionIdentifier] = new Classification(parsed);
    });
    return classifications;
  }

  /**
   * Parses group Classifications into a classificationMap object
   * @param data
   * @returns ClassificationMap
   */
  static parseGroupClassifications(data: any) {
    let classifications: ClassificationMap = {};
    Object.keys(data.classificationMap).forEach((definitionIdentifier: any) => {
      const parsed = Classification.parseGroupToInterface(data, definitionIdentifier);
      classifications[parsed.definitionIdentifier] = new Classification(parsed);
    });
    return classifications;
  }

  /**
   * Parses group Classifications referring to a single definition into a ClassificationMap object
   * @param data
   * @returns ClassificationMap
   */
  static parseGroupAndDefinitionClassifications(data: any) {
    let classifications: ClassificationMap = {};
    const parsed = Classification.parseGroupAndDefinitionToInterface(data);
    classifications[data.classificationIdentifier] = new Classification(parsed);
    return classifications;
  }

  /**
   * Parses student Classification data into interface for sending to api
   * @param data - classification data
   * @param username - student username
   * @private
   * @returns ClassificationInterface
   */
  private static parseSingleStudentToInterface(data: any, username: string): ClassificationInterface {
    return {
      studentUsername: username,
      definitionIdentifier: data.identifier,
      value: data.value,
      note: data.note,
      timestamp: data.lastUpdated
    };
  }

  /**
   * Parses group Classifications data into interface for sending to api
   * @param data - classification data
   * @param definitionIdentifier
   * @private
   * @returns ClassificationInterface
   */
  private static parseGroupToInterface(data: any, definitionIdentifier: string): ClassificationInterface {
    return {
      studentUsername: data.username,
      definitionIdentifier: definitionIdentifier,
      value: data.classificationMap[definitionIdentifier].value,
      note: data.classificationMap[definitionIdentifier].note,
      timestamp: data.classificationMap[definitionIdentifier].timestamp
    };
  }

  /**
   * Parses group Classifications data (for a single definition) into interface for sending to api
   * @param data - classification data
   * @private
   * @returns ClassificationInterface
   */
  private static parseGroupAndDefinitionToInterface(data: any): ClassificationInterface {
    return {
      studentUsername: data.studentUsername,
      definitionIdentifier: data.classificationIdentifier,
      value: data.value,
      note: data.note,
      timestamp: data.timestamp
    };
  }
}

/**
 * Student represents a student with their Classifications belonging to a given course
 */
export class Student implements StudentInterface {
  username: string;
  personalNumber: string | null;
  email: string;
  firstName: string;
  lastName: string;
  classifications: {[definition: string]: Classification};

  constructor(data: StudentInterface) {
    this.username = data.username;
    this.personalNumber = data.personalNumber;
    this.email = data.email;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.classifications = {};

    const classifications = data.classifications;
    if (classifications !== null) {
      Object.keys(classifications).forEach((definition: string) => {
          this.classifications[definition] = new Classification(classifications[definition]);
      });
    } 
  }

  /**
   * Parses a single student with Classifications from response data
   * @param data
   * @returns Student
   */
  static parseSingleStudent(data: any) {
    let classifications = Classification.parseSingleStudentClassifications(data);
    let student = Student.parseToInterface(data);
    student.classifications = classifications;
    return new Student(student);
  }

  /**
   * Parses student group with Classifications from response data
   * @param data
   * @returns Student
   */
  static parseGroupStudent(data: any) {
    let classifications = Classification.parseGroupClassifications(data);
    let student = Student.parseToInterface(data);
    student.classifications = classifications;
    return new Student(student);
  }

  /**
   * Parses student group with Classifications regarding a single definition from response data
   * @param data
   * @returns Student
   */
  static parseGroupStudentForDefinition(data: any) {
    let classifications = Classification.parseGroupAndDefinitionClassifications(data);
    let student = Student.parseGroupAndDefinitionToInterface(data);
    student.classifications = classifications;
    return new Student(student);
  }

  /**
   * Parses a student into interface from response data
   * @param data
   * @private
   * @returns StudentInterface
   */
  private static parseToInterface(data: any): StudentInterface {
    return {
      username: data.username,
      personalNumber: data.personalNumber,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      classifications: {}
    };
  }

  /**
   * Parses group Classifications (regarding a single definition) into interface from response data
   * @param data
   * @private
   * @returns StudentInterface
   */
  private static parseGroupAndDefinitionToInterface(data: any): StudentInterface {
    const parsed = Student.parseToInterface(data);
    parsed.username = data.studentUsername;
    return parsed;
  }
}