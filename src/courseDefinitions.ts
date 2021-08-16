import {Course} from "./course";
import {Definition, DefinitionWithChildren} from "./definition";
import {GradesSDK} from "./gradesSDK";
import {DefinitionDTO} from "./gradesTypes";
import { toArray } from "./helpers";

/**
 * CourseDefinitions acts as a Definition manager for a given course
 */
export class CourseDefinitions {
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
  private async fetchDefinitionData(semester: string, urlTail: string) {
    const decodedSemester = await this.sdk.getSemesterCode(semester);
    const url = this.sdk.api.urlForRequest('/public/courses/' + this.course.code + urlTail);
    return await this.sdk.api.get(url, {lang: this.sdk.lang, semester: decodedSemester});
  }

  /**
   * Get Definition by its identifier
   * @param definitionIdentifier (required): string
   * @param semester: string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @returns Promise<Definition>
   */
  async getDefinition(definitionIdentifier: string, semester: string = 'current'): Promise<Definition> {
    const urlTail = '/definitions/' + definitionIdentifier;
    const fetched = await this.fetchDefinitionData(semester, urlTail);
    return Definition.parse(fetched);
  }

  /**
   * Get Definition hierarchy of the course
   * @param semester: string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @returns Promise<DefinitionWithChildren[]>
   */
  async getDefinitionHierarchy(semester: string = 'current'): Promise<DefinitionWithChildren[]> {
    const urlTail = '/definition-hierarchy';
    const fetched = await this.fetchDefinitionData(semester, urlTail);
    
    let hierarchy: DefinitionWithChildren[] = [];

    fetched.forEach((definitionData: any) => {
      hierarchy.push(DefinitionWithChildren.parseFromRequest(definitionData));
    });

    return hierarchy;
  }

  /**
   * Get course's Definitions
   * @param semester: string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @returns Promise<Definition[]>
   */
  async getDefinitionList(semester: string = 'current'): Promise<Definition[]> {
    const urlTail = '/definitions';
    const fetched = await this.fetchDefinitionData(semester, urlTail);
    
    let list: Definition[] = [];

    fetched.forEach((definitionData: any) => {
      list.push(Definition.parse(definitionData));
    });

    return list;
  }

  /**
   * Create new Definition(s)
   * @param definitions
   * @param semester (optional): string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @returns Promise<void>
   */
  async createDefinitions(definitions: Definition | Definition[], semester: string = 'current') {
    const decodedSemester = await this.sdk.getSemesterCode(semester);
    const url = this.sdk.api.urlForRequest('/public/courses/' + this.course.code + '/definition-hierarchy');
    definitions = toArray(definitions);
    const dataToSend = this.createDefinitionsDTO(definitions);
    await this.sdk.api.post(url, dataToSend, { semester: decodedSemester });
  }

  /**
   * Update course's Definition(s)
   * Ignores children of the provided Definitions
   * @param definitions
   * @returns Promise<void>
   */
  async updateDefinitions(definitions: Definition | Definition[]) {
    const url = this.sdk.api.urlForRequest('/public/courses/' + this.course.code + '/definitions');
    definitions = toArray(definitions);
    const dataToSend = this.updateDefinitionsDTO(definitions);
    await this.sdk.api.put(url, dataToSend);
  }


  /**
   * Delete a Definition by its identifier
   * @param definitions
   * @param semester (optional): string; ex.: 'B201', 'current', 'prev', 'next'; default: 'current'
   * @param options
   * @returns Promise<void>
   */
  async deleteDefinitions(definitions: Definition | Definition[] | string | string[], semester: string = 'current', options: { preserveChildren: boolean } = { preserveChildren: false }) {
    const decodedSemester = await this.sdk.getSemesterCode(semester);
    definitions = toArray(definitions);

    for(let definition of definitions) {
      let identifier = this.extractIdentifier(definition);
      const url = this.sdk.api.urlForRequest('/public/courses/' + this.course.code + '/definitions/' + identifier);
      await this.sdk.api.delete(url, {'preserve-children': options.preserveChildren, semester: decodedSemester});
    }
  }
  
  //--------------------------------------------------

  /**
   * Extracts identifier from provided Definition
   * @param definition
   * @private
   * @returns string
   */
  private extractIdentifier(definition: string | Definition) {
    if (typeof definition === 'string') {
      return definition;
    } else {
      return definition.identifier;
    }
  }

  /**
   * Transforms provided Definitions into a form for sending to api to create new definitions
   * @param definitions
   * @private
   * @returns { [p: string]: DefinitionDTO[] }
   */
  private createDefinitionsDTO(definitions: Definition[]): { [p: string]: DefinitionDTO[] } {
    let data: { [index: string]: DefinitionDTO[] } = {};
    definitions.forEach((definition: Definition) => {
      if (definition.parentIdentifier in data) {
        data[definition.parentIdentifier].push(definition.serialize())
      } else {
        data[definition.parentIdentifier] = [
          definition.serialize()
        ];
      }
    });
    return data;
  }

  /**
   * Transforms provided Definitions into a form for sending to api to update the definitions
   * @param definitions
   * @private
   * { [index: string]: DefinitionDTO }
   */
  private updateDefinitionsDTO(definitions: Definition[]): { [p: string]: DefinitionDTO } {
    let data: { [index: string]: DefinitionDTO } = {};
    definitions.forEach((definition: Definition) => {
      data[definition.identifier] = definition.serialize()
    });
    return data;
  }

}