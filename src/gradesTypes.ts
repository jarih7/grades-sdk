/**
 * Represents a name of a Classification in a specified language
 */
export interface ClassificationTextDTO {
  identifier: string,
  name: string
}

/**
 * Object interface for Definitions
 */
export interface DefinitionInterface {
  identifier: string;
  parentIdentifier: string;
  namesForLocales: { cs: string, en: string };
  courseCode: string;
  classificationType: 'HOMEWORK' | 'TUTORIAL_TASK' | 'ACTIVITY' | 'SEMESTRAL_TEST' | 'ASSESSMENT' | 'EXAM_TEST' | 'PRE_EXAM_TEST' | 'ORAL_EXAM' | 'POINTS_TOTAL' | 'FINAL_SCORE' | 'OTHER' | 'OTHER_SEMESTER' | 'OTHER_EXAMS' | 'TUTORIAL_ABSENCE' | 'QUIZ' | 'CORRECTION_TEST' | 'BONUS_POINTS' | 'LECTURE_TASK' | 'CONTEST_HOMEWORK' | 'SEMESTRAL_WORK' | 'CODE_REVIEW' | 'TUTORIAL_ATTENDANCE';
  evaluationType: 'MANUAL' | 'EXPRESSION';
  minimumValue: number;
  maximumValue: number;
  minimumRequiredValue: number;
  expression: string | null;
  valueType: 'NUMBER' | 'STRING' | 'BOOLEAN';
  hidden: boolean;
  semesterCode: 'current' | 'prev' | 'next' | string;
}

/**
 * Object interface for DefinitionWithChildren
 */
export interface DefinitionWithChildrenInterface extends DefinitionInterface {
  children: DefinitionInterface[];
}

/**
 * Data transfer object for Definition
 */
export interface DefinitionDTO {
  classificationTextDtos: [
    ClassificationTextDTO,
    ClassificationTextDTO
  ],
  classificationType: 'HOMEWORK' | 'TUTORIAL_TASK' | 'ACTIVITY' | 'SEMESTRAL_TEST' | 'ASSESSMENT' | 'EXAM_TEST' | 'PRE_EXAM_TEST' | 'ORAL_EXAM' | 'POINTS_TOTAL' | 'FINAL_SCORE' | 'OTHER' | 'OTHER_SEMESTER' | 'OTHER_EXAMS' | 'TUTORIAL_ABSENCE' | 'QUIZ' | 'CORRECTION_TEST' | 'BONUS_POINTS' | 'LECTURE_TASK' | 'CONTEST_HOMEWORK' | 'SEMESTRAL_WORK' | 'CODE_REVIEW' | 'TUTORIAL_ATTENDANCE',
  courseCode: string,
  evaluationType: 'MANUAL' | 'EXPRESSION',
  expression: string | null,
  hidden: boolean,
  identifier: string,
  parentIdentifier: string,
  maximumValue: number,
  minimumRequiredValue: number,
  minimumValue: number,
  semesterCode: string,
  valueType: 'NUMBER' | 'STRING' | 'BOOLEAN'
}

/**
 * Data transfer object for Classification
 */
export interface ClassificationDTO {
  classificationIdentifier: string,
  studentUsername: string,
  value: number | string | boolean,
  note: string | null,
  timestamp: string | null
}

/**
 * StudentGroup represents a group of students of a course
 */
export interface StudentGroup {
  studentGroupId: string,
  description: string,
  name: string,
  type: string
}

/**
 * Object interface for Classification
 */
export interface ClassificationInterface {
  studentUsername: string;
  definitionIdentifier: string;
  value: number | string | boolean;
  note: string | null;
  timestamp: string | null;
}

/**
 * Object interface for Student
 */
export interface StudentInterface {
  username: string,
  personalNumber: string | null,
  email: string,
  firstName: string,
  lastName: string,
  classifications: {[definition: string]: ClassificationInterface} | null
}

/**
 * CourseInfo contains main information about the course: course name, course code, way of completion, number of credits, types of classes
 */
 export interface CourseInfo {
  classesType: string[],
  completion: 'CLFD_CREDIT' | 'CREDIT' | 'CREDIT_EXAM' | 'DEFENCE' | 'EXAM' | 'NOTHING' | 'UNDEFINED',
  courseCode: string,
  courseName: string,
  credits: number
}