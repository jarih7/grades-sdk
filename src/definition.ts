import {
  ClassificationTextDTO, DefinitionInterface, DefinitionWithChildrenInterface
} from "./gradesTypes";

/**
 * Definition represents a single Definition from course's definition hierarchy
 */
export class Definition implements DefinitionInterface {
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
  semesterCode: string;

  constructor(data: DefinitionInterface) {
    this.classificationType = data.classificationType;
    this.courseCode = data.courseCode;
    this.evaluationType = data.evaluationType;
    this.expression = data.expression;
    this.hidden = data.hidden;
    this.identifier = data.identifier;
    this.maximumValue = data.maximumValue;
    this.minimumRequiredValue = data.minimumRequiredValue;
    this.minimumValue = data.minimumValue;
    this.namesForLocales = data.namesForLocales;
    this.parentIdentifier = data.parentIdentifier;
    this.semesterCode = data.semesterCode;
    this.valueType = data.valueType;
  }

  /**
   * Parses a Definition to interface from response data
   * @param data
   * @protected
   * @returns DefinitionInterface
   */
  protected static parseToInterface(data: any) {
    let namesForLocales: { cs: string, en: string } = {
      cs: "",
      en: ""
    };

    //get locales
    data.classificationTextDtos.forEach((locale: { identifier: string, name: string }) => {
      if (locale.identifier == 'cs') {
        namesForLocales.cs = locale.name;
      } else if (locale.identifier == 'en') {
        namesForLocales.en = locale.name;
      }
    });

    let parentIdentifier = (data.parentIdentifier !== null) ? data.parentIdentifier : '';

    return {
      classificationType: data.classificationType,
      courseCode: data.courseCode,
      evaluationType: data.evaluationType,
      expression: data.expression,
      hidden: data.hidden,
      identifier: data.identifier,
      maximumValue: data.maximumValue,
      minimumRequiredValue: data.minimumRequiredValue,
      minimumValue: data.minimumValue,
      namesForLocales: namesForLocales,
      parentIdentifier: parentIdentifier,
      semesterCode: data.semesterCode,
      valueType: data.valueType
    } as DefinitionInterface;
  }

  /**
   * Parses data into a Definition object from response data
   * @param data
   * @returns Definition
   */
  static parse(data: any) {
    const parsed = Definition.parseToInterface(data);
    return new Definition(parsed);
  }

  /**
   * Transforms a Definition into a form for sending to api
   */
  serialize() {
    return {
      classificationTextDtos: [
        {
          identifier: "cs",
          name: this.namesForLocales.cs
        },
        {
          identifier: "en",
          name: this.namesForLocales.en
        }
      ] as [ClassificationTextDTO, ClassificationTextDTO],
      classificationType: this.classificationType,
      courseCode: this.courseCode,
      evaluationType: this.evaluationType,
      expression: this.expression,
      hidden: this.hidden,
      identifier: this.identifier,
      maximumValue: this.maximumValue,
      minimumRequiredValue: this.minimumRequiredValue,
      minimumValue: this.minimumValue,
      parentIdentifier: this.parentIdentifier,
      semesterCode: this.semesterCode,
      valueType: this.valueType
    };
  }
}

/**
 * Represents a Definition with a children attribute
 */
export class DefinitionWithChildren extends Definition implements DefinitionWithChildrenInterface {
  children: Definition[] = [];

  constructor(data: DefinitionWithChildrenInterface) {
    super(data);
    data.children.forEach((childData: DefinitionInterface) => {
      this.children.push(new Definition(childData))
    });
  }

  /**
   * Adds a child to the Definition
   * @param def
   */
  addChild(def: Definition) {
    def.parentIdentifier = this.identifier;
    this.children.push(def);
  }

  /**
   * Parses data into DefinitionWithChildren interface
   * @param data
   * @protected
   * @returns DefinitionWithChildrenInterface
   */
  protected static parseToInterface(data: any) {
    let children: DefinitionInterface[] = [];
    
    data.children.forEach((childrenData: any) => {
      children.push(super.parseToInterface(childrenData));
    });

    let parent = super.parseToInterface(data) as DefinitionWithChildrenInterface;
    parent.children = children;

    return parent;
  }

  /**
   * Parses response data into a DefinitionWithChildren object
   * @param data
   * @returns DefinitionWithChildren
   */
  static parseFromRequest(data: any) {
    const parsed = DefinitionWithChildren.parseToInterface(data);
    return new DefinitionWithChildren(parsed);
  }
}


