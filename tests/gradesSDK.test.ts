import {
  CourseInfo,
  StudentGroup
} from "../src/GradesTypes";

import {GradesSDK} from '../src/gradesSDK';
import axios from "axios";
import {GradesURL} from "../src/apiRequestor";
import {Definition} from "../src/definition";
import {Classification, Student} from "../src/classification";
import {TypeTests} from "./typetests";
import {Mocker} from "./mocker";

require('dotenv').config();
jest.mock('axios');

//mind the exclamation marks!
const sdk: GradesSDK = new GradesSDK(GradesURL.Dev, process.env.ID!, process.env.SECRET!);

beforeEach(() => {
  jest.clearAllMocks();
});

test('Should get semester code', async () => {
  Mocker.mockAuthentication();
  Mocker.mockSemester('B201');
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockSemester('B211');

  const previous = await sdk.getSemesterCode('prev');
  const current = await sdk.getSemesterCode();
  const next = await sdk.getSemesterCode('next');

  Mocker.checkCallCounts({post: 3, get: 3});
  TypeTests.testSemesterCodes(previous!, current!, next!);
});

test('Should get course information', async () => {
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockCourseInformation();

  const courseInfo: CourseInfo = await sdk.getCourse('PI-ARB').getCourseInfo();

  Mocker.checkCallCounts({post: 2, get: 2});
  TypeTests.testCourseInfo(courseInfo);
});

test('Should get definition for homework1', async () => {
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockSingleDefinitionCS();
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockSingleDefinitionEN();

  sdk.lang = 'en';
  const enDefinition = await sdk.getCourse('PI-ARB').definitions.getDefinition('homework1');
  sdk.lang = 'cs';
  const csDefinition = await sdk.getCourse('PI-ARB').definitions.getDefinition('homework1');
  sdk.lang = 'en';

  Mocker.checkCallCounts({post: 4, get: 4});
  TypeTests.testDefinition(enDefinition, 'en');
  TypeTests.testDefinition(csDefinition, 'cs');
});

test('Should get definition hierarchy', async () => {
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockDefinitionHierarchy();

  const definitionHierarchy = await sdk.getCourse('PI-ARB').definitions.getDefinitionHierarchy();

  Mocker.checkCallCounts({post: 2, get: 2});
  TypeTests.testDefinitionHierarchy(definitionHierarchy);
});

test('Should get all definitions', async () => {
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockDefinitionList();

  const definitions = await sdk.getCourse('PI-ARB').definitions.getDefinitionList();

  Mocker.checkCallCounts({post: 2, get: 2});
  expect(definitions).toBeDefined();
  expect(Array.isArray(definitions)).toBe(true);

  definitions!.forEach((definition: Definition) => {
    TypeTests.testDefinition(definition, 'all');
  });
});

test('Should create definition', async () => {
  const testDefinition: Definition = new Definition({
    identifier: 'test_definition',
    parentIdentifier: '',
    namesForLocales: {en: 'Test definition', cs: 'Testovací definice'},
    courseCode: 'PI-ARB',
    semesterCode: 'B202',
    expression: null,
    classificationType: "QUIZ",
    evaluationType: "MANUAL",
    minimumValue: 0,
    minimumRequiredValue: 7,
    maximumValue: 10,
    valueType: "NUMBER",
    hidden: false
  });

  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockDefinitionCreated(testDefinition);

  await sdk.getCourse('PI-ARB').definitions.createDefinitions(testDefinition, 'B202');
  Mocker.checkCallCounts({post: 3, get: 1});
});

test('Should update definition', async () => {
  const testDefinition: Definition = new Definition({
    identifier: 'test_definition',
    parentIdentifier: '',
    namesForLocales: {en: 'Updated test definition', cs: 'Aktualizovaná testovací definice'},
    courseCode: 'PI-ARB',
    semesterCode: 'B202',
    expression: null,
    classificationType: "QUIZ",
    evaluationType: "MANUAL",
    minimumValue: 0,
    minimumRequiredValue: 7,
    maximumValue: 10,
    valueType: "NUMBER",
    hidden: false
  });

  Mocker.mockAuthentication();
  Mocker.mockDefinitionUpdated(testDefinition);

  await sdk.getCourse('PI-ARB').definitions.updateDefinitions(testDefinition);
  Mocker.checkCallCounts({post: 1, put: 1});
});

test('Should delete definition', async () => {
  const course = 'PI-ARB';
  const definition = 'test_definition';

  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockDefinitionDeleted(course, definition);

  await sdk.getCourse(course).definitions.deleteDefinitions(definition, 'B202', {preserveChildren: false});
  Mocker.checkCallCounts({post: 2, get: 1, delete: 1});
});

test('Should get student groups', async () => {
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockStudentGroups();

  const groups = await sdk.getCourse('PI-ARB').getStudentGroups();

  Mocker.checkCallCounts({post: 2, get: 2});
  expect(groups).toBeDefined();
  expect(Array.isArray(groups)).toBe(true);

  groups!.forEach((group: StudentGroup) => {
    TypeTests.testGroup(group);
  });
});

test('Should get group\'s students with their classifications', async () => {
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockGroupClassifications();

  const students = await sdk.getCourse('PI-ARB').classifications.getStudentClassificationsForGroup('TEST');

  Mocker.checkCallCounts({post: 2, get: 2});
  expect(students).toBeDefined();
  expect(Array.isArray(students)).toBe(true);

  students!.forEach((student: Student) => {
    TypeTests.testStudent(student);
  });
});

test('Should get group\'s students with their classifications for a specific definition', async () => {
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockGroupClassificationsForDefinition();

  const students = await sdk.getCourse('PI-ARB').classifications.getStudentClassificationsForGroupAndDefinition('TEST', 'homework_total');

  Mocker.checkCallCounts({post: 2, get: 2});
  expect(students).toBeDefined();
  expect(Array.isArray(students)).toBe(true);

  students!.forEach((student: Student) => {
    TypeTests.testStudent(student);
  });
});

test('Should get student\'s classifications', async () => {
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockSingleStudentClassifications();

  const student = await sdk.getCourse('PI-ARB').classifications.getStudentClassifications('teststudent1');

  Mocker.checkCallCounts({post: 2, get: 2});
  expect(student).toBeDefined();
  TypeTests.testStudent(student);
});

test('Should save multiple student classifications', async () => {
  const testClassifications = [
    new Classification({
      definitionIdentifier: "homework2",
      studentUsername: 'teststudent3',
      value: 5,
      note: 'testnote',
      timestamp: null
    }),
    new Classification({
      definitionIdentifier: "homework3",
      studentUsername: 'teststudent3',
      value: 9,
      note: 'great job!',
      timestamp: null
    }),
    new Classification({
      definitionIdentifier: "homework4",
      studentUsername: 'teststudent3',
      value: 7,
      note: null,
      timestamp: null
    })
  ];

  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockSaveStudentClassifications(testClassifications);

  await sdk.getCourse('PI-ARB').classifications.saveStudentClassifications(testClassifications, 'B202', {notify: true});
  Mocker.checkCallCounts({post: 2, get: 1, put: 1});
});

test('Should save single student classification', async () => {
  const testClassification = new Classification({
    definitionIdentifier: "homework2",
    studentUsername: 'teststudent3',
    value: 5,
    note: 'testnote',
    timestamp: null
  });

  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockSaveStudentClassifications(testClassification);

  await sdk.getCourse('PI-ARB').classifications.saveStudentClassifications(testClassification, 'B202', {notify: true});
  Mocker.checkCallCounts({post: 2, get: 1, put: 1});
});

test('Should throw an authentication error', async () => {
  Mocker.mockAuthenticationFail();
  await expect(sdk.getSemesterCode()).rejects.toEqual(new Error('Error 401: Unauthorized'));
  Mocker.checkCallCounts({post: 1});
});

test('Should throw an error for trying to get a semester code from incorrent argument', async () => {
  const semesterSlug = 'nextt';

  Mocker.mockAuthentication();
  Mocker.mockSemesterFail(semesterSlug)

  await expect(sdk.getSemesterCode(semesterSlug)).rejects.toEqual(new Error('Error 400: Bad Request'));
  Mocker.checkCallCounts({post: 1, get: 1});
});

test('Should throw an error for deleting a non-existent definition', async () => {
  const definition = 'hwrk';
  const course = 'PI-ARB'
  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockDefinitionDeletedFail(course, definition);

  await expect(sdk.getCourse(course).definitions.deleteDefinitions('hwrk')).rejects.toEqual(new Error('Error 400: Bad Request'));
  Mocker.checkCallCounts({post: 2, get: 1, delete: 1});
});

test('Should throw an error for saving an evaluation to a non-existent student', async () => {
  const testClassification = new Classification({
    definitionIdentifier: "homework1",
    studentUsername: 'teststudent1',
    value: 5,
    note: 'testnote',
    timestamp: null
  });

  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockSaveStudentClassificationsFail(testClassification);

  await expect(sdk.getCourse('PI-ARB').classifications.saveStudentClassifications(testClassification, 'B202', {notify: true})).rejects.toEqual(new Error('Error 400: Bad Request'));
  Mocker.checkCallCounts({post: 2, get: 1, put: 1});
});

test('Should throw an error for creating a definition for non-existent course', async () => {
  const testDefinition: Definition = new Definition({
    identifier: 'test_definition',
    parentIdentifier: '',
    namesForLocales: {en: 'Test definition', cs: 'Testovací definice'},
    courseCode: 'WH-AT!',
    semesterCode: 'B202',
    expression: null,
    classificationType: "QUIZ",
    evaluationType: "MANUAL",
    minimumValue: 0,
    minimumRequiredValue: 7,
    maximumValue: 10,
    valueType: "NUMBER",
    hidden: false
  });

  Mocker.mockAuthentication();
  Mocker.mockSemester('B202');
  Mocker.mockAuthentication();
  Mocker.mockDefinitionCreatedFail(testDefinition);

  await expect(sdk.getCourse('PI-ARB').definitions.createDefinitions(testDefinition, 'B202')).rejects.toEqual(new Error('Error 400: Bad Request'));
  Mocker.checkCallCounts({post: 3, get: 1});
});

