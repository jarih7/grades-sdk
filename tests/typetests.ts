import {Classification, Student} from "../src/classification";
import {Definition, DefinitionWithChildren} from "../src/definition";
import {CourseInfo, StudentGroup} from "../src/GradesTypes";


export class TypeTests {
  static testSemesterCodes(previous: string, current: string, next: string) {
    expect(previous).toBe('B201');
    expect(current).toBe('B202');
    expect(next).toBe('B211');
  }

  static testCourseInfo(courseInfo: CourseInfo) {
    expect(courseInfo).toBeDefined();
    expect(courseInfo).toHaveProperty('classesType');
    expect(courseInfo).toHaveProperty('completion');
    expect(courseInfo).toHaveProperty('courseCode');
    expect(courseInfo).toHaveProperty('courseName');
    expect(courseInfo).toHaveProperty('credits');
    expect(Array.isArray(courseInfo!.classesType)).toBe(true);
    expect(typeof courseInfo!.completion === 'string').toBe(true);
    expect(typeof courseInfo!.courseCode === 'string').toBe(true);
    expect(typeof courseInfo!.courseName === 'string').toBe(true);
    expect(typeof courseInfo!.credits === 'number').toBe(true);
  }

  static testDefinitionHierarchy(definitionHierarchy: DefinitionWithChildren[]) {
    expect(definitionHierarchy).toBeDefined();
    expect(Array.isArray(definitionHierarchy)).toBe(true);

    definitionHierarchy.forEach((definition: DefinitionWithChildren) => {
      TypeTests.testDefinition(definition, 'all');
    });
  }

  static testDefinition(definition: Definition, lang: 'cs' | 'en' | 'all') {
    expect(definition).toBeDefined();
    expect(definition).toHaveProperty('identifier');
    expect(typeof definition.identifier === 'string').toBe(true);
    expect(definition).toHaveProperty('parentIdentifier');
    expect(typeof definition.parentIdentifier === 'string').toBe(true);
    expect(definition).toHaveProperty('namesForLocales');

    if (lang == 'cs' || lang == 'all') {
      expect(definition.namesForLocales).toHaveProperty('cs');
      expect(typeof definition.namesForLocales.cs === 'string').toBe(true);
    }

    if (lang == 'en' || lang == 'all') {
      expect(definition.namesForLocales).toHaveProperty('en');
      expect(typeof definition.namesForLocales.en === 'string').toBe(true);
    }

    expect(definition).toHaveProperty('courseCode');
    expect(typeof definition.courseCode === 'string').toBe(true);
    expect(definition).toHaveProperty('classificationType');
    expect(typeof definition.classificationType === 'string').toBe(true);
    expect(definition).toHaveProperty('evaluationType');
    expect(typeof definition.evaluationType === 'string').toBe(true);
    expect(definition).toHaveProperty('minimumValue');
    expect(typeof definition.minimumValue === 'number' || definition.minimumValue === null).toBe(true);
    expect(definition).toHaveProperty('maximumValue');
    expect(typeof definition.maximumValue === 'number' || definition.maximumValue === null).toBe(true);
    expect(definition).toHaveProperty('minimumRequiredValue');
    expect(typeof definition.minimumRequiredValue === 'number' || definition.minimumRequiredValue === null).toBe(true);
    expect(definition).toHaveProperty('expression');
    expect(typeof definition.expression === 'string' || definition.expression === null).toBe(true);
    expect(definition).toHaveProperty('valueType');
    expect(typeof definition.valueType === 'string').toBe(true);
    expect(definition).toHaveProperty('hidden');
    expect(typeof definition.hidden === 'boolean').toBe(true);
    expect(definition).toHaveProperty('semesterCode');
    expect(typeof definition.semesterCode === 'string').toBe(true);
  }

  static testDefinitionCreateDTO(definitions: Definition[], dtos: { [parentIdentifier: string]: any }) {
    let DTOmap: { [name: string]: any; } = TypeTests.extractDTOMapFromCreateData(dtos);
    TypeTests.testDefinitionDTO(definitions, DTOmap);
  }

  static testDefinitionUpdateDTO(definitions: Definition[], dtos: { [parentIdentifier: string]: any }) {
    let DTOmap: { [name: string]: any } = dtos;
    TypeTests.testDefinitionDTO(definitions, DTOmap);
  }

  private static extractDTOMapFromCreateData(dtos: { [parentIdentifier: string]: any; }) {
    let DTOmap: { [name: string]: any; } = {};

    Object.keys(dtos).forEach((parentIdentifier: string) => {
      dtos[parentIdentifier].forEach((dto: any) => {
        expect(dto).toHaveProperty('identifier');
        expect(DTOmap).not.toHaveProperty(dto.identifier);
        DTOmap[dto.identifier] = dto;
      });
    });
    return DTOmap;
  }

  private static testDefinitionDTO(definitions: Definition[], DTOmap: { [name: string]: any; }) {
    definitions.forEach((definition: Definition) => {
      TypeTests.testDefinition(definition, 'all');
      const dto = DTOmap[definition.identifier];

      expect(dto).toBeDefined();
      expect(dto).toHaveProperty('classificationTextDtos');
      expect(Array.isArray(dto.classificationTextDtos)).toBe(true);
      expect(dto.classificationTextDtos.length).toBe(2);
      //TODO languages
      expect(definition.classificationType).toStrictEqual(dto.classificationType);
      expect(definition.courseCode).toStrictEqual(dto.courseCode);
      expect(definition.evaluationType).toStrictEqual(dto.evaluationType);
      expect(definition.expression).toStrictEqual(dto.expression);
      expect(definition.hidden).toStrictEqual(dto.hidden);
      expect(definition.identifier).toStrictEqual(dto.identifier);
      expect(definition.maximumValue).toStrictEqual(dto.maximumValue);
      expect(definition.minimumRequiredValue).toStrictEqual(dto.minimumRequiredValue);
      expect(definition.minimumValue).toStrictEqual(dto.minimumValue);
      expect(definition.parentIdentifier).toStrictEqual(dto.parentIdentifier);
      expect(definition.semesterCode).toStrictEqual(dto.semesterCode);
      expect(definition.valueType).toStrictEqual(dto.valueType);
    });
  }

  static testGroup(group: StudentGroup) {
    expect(group).toHaveProperty('studentGroupId');
    expect(typeof group.studentGroupId === 'string').toBe(true);
    expect(group).toHaveProperty('name');
    expect(typeof group.name === 'string').toBe(true);
    expect(group).toHaveProperty('description');
    expect(typeof group.description === 'string').toBe(true);
    expect(group).toHaveProperty('type');
    expect(typeof group.type === 'string').toBe(true);
  }

  static testStudent(student: Student) {
    expect(student).toHaveProperty('username');
    expect(typeof student.username === 'string').toBe(true);
    expect(student).toHaveProperty('personalNumber');
    expect(typeof student.personalNumber === 'string' || student.personalNumber === null).toBe(true);
    expect(student).toHaveProperty('email');
    expect(typeof student.email === 'string').toBe(true);
    expect(student).toHaveProperty('firstName');
    expect(typeof student.firstName === 'string').toBe(true);
    expect(student).toHaveProperty('lastName');
    expect(typeof student.lastName === 'string').toBe(true);
    expect(student).toHaveProperty('classifications');
  }

  static testUrlDefinitionDelete(course: string, definition: string, url: string) {
    expect(url).toStrictEqual(`https://rozvoj.fit.cvut.cz/evolution-dev/classification-dev/api/v1/public/courses/${course}/definitions/${definition}`)
  }

  static testClassificationDTO(classifications: Classification | Classification[], data: any) {
    if (!Array.isArray(classifications))
      classifications = [classifications];

    for (let i = 0; i < classifications.length; ++i) {
      expect(classifications[i].studentUsername).toStrictEqual(data[i].studentUsername);
      expect(classifications[i].definitionIdentifier).toStrictEqual(data[i].classificationIdentifier);
      expect(classifications[i].value).toStrictEqual(data[i].value);
      expect(classifications[i].note).toStrictEqual(data[i].note);
      expect(classifications[i].timestamp).toStrictEqual(data[i].timestamp);
    }
    ;
  }
}