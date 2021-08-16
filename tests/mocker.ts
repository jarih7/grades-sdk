import axios from "axios";
import {Classification} from "../src/classification";
import {Definition} from "../src/definition";
import {TypeTests} from "./typetests";

const mockedAxios = axios as jest.Mocked<typeof axios>;

export class Mocker {
  static mockAuthentication() {
    mockedAxios.post.mockResolvedValueOnce({
      data: {
        "access_token": "3f801c23-2442-4ffe-aece-9bfc778c1ca2",
        "token_type": "bearer",
        "expires_in": 3600,
        "scope": "urn:zuul:oauth:sample.read"
      }
    });
  }

  static mockAuthenticationFail() {
    mockedAxios.post.mockImplementationOnce(async () => {
      throw {
        response: {
          status: 401,
          statusText: 'Unauthorized'
        }
      };
    });
  }

  static mockSemester(code: string) {
    mockedAxios.get.mockResolvedValueOnce({data: code});
  }

  static mockSemesterFail(slug: string) {
    mockedAxios.get.mockImplementationOnce(async (url, config) => {
      expect(config!.params.semester).toStrictEqual(slug);
      throw {
        response: {
          status: 400,
          statusText: 'Bad Request'
        }
      };
    });
  }

  static mockCourseInformation() {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        "courseCode": "PI-ARB",
        "courseName": "Arbology",
        "completion": "EXAM",
        "credits": 4,
        "classesType": [
          "LECTURE"
        ]
      }
    });
  }

  static mockSingleDefinitionCS() {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        "id": 10295,
        "identifier": "homework1",
        "parentId": 10294,
        "parentIdentifier": "homework_total",
        "courseCode": "PI-ARB",
        "semesterCode": "B202",
        "evaluationType": "MANUAL",
        "classificationType": "HOMEWORK",
        "valueType": "NUMBER",
        "classificationTextDtos": [
          {
            "identifier": "cs",
            "name": "DU1"
          }
        ],
        "skillDtos": [],
        "hidden": false,
        "index": 0,
        "minimumValue": 0,
        "minimumRequiredValue": 0,
        "maximumValue": 10,
        "expression": null,
        "aggregatedIdentifier": null,
        "aggregationFunction": null,
        "aggregationScope": null
      }
    });
  }

  static mockSingleDefinitionEN() {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        "id": 10295,
        "identifier": "homework1",
        "parentId": 10294,
        "parentIdentifier": "homework_total",
        "courseCode": "PI-ARB",
        "semesterCode": "B202",
        "evaluationType": "MANUAL",
        "classificationType": "HOMEWORK",
        "valueType": "NUMBER",
        "classificationTextDtos": [
          {
            "identifier": "en",
            "name": "HW1"
          }
        ],
        "skillDtos": [],
        "hidden": false,
        "index": 0,
        "minimumValue": 0,
        "minimumRequiredValue": 0,
        "maximumValue": 10,
        "expression": null,
        "aggregatedIdentifier": null,
        "aggregationFunction": null,
        "aggregationScope": null
      }
    });
  }


  private static generateDefinitionHierarchy() {
    return [{
      "id": 10294,
      "identifier": "homework_total",
      "parentId": null,
      "parentIdentifier": null,
      "courseCode": "PI-ARB",
      "semesterCode": "B202",
      "evaluationType": "EXPRESSION",
      "classificationType": "HOMEWORK",
      "valueType": "NUMBER",
      "classificationTextDtos": [
        {
          "identifier": "cs",
          "name": "Domácí úkoly celkem"
        },
        {
          "identifier": "en",
          "name": "Homeworks total"
        }
      ],
      "skillDtos": [],
      "hidden": false,
      "index": 0,
      "minimumValue": 0,
      "minimumRequiredValue": 20,
      "maximumValue": 40,
      "expression": "SUM(`homework\\d+`)",
      "aggregatedIdentifier": null,
      "aggregationFunction": null,
      "aggregationScope": null,
      "children": [
        {
          "id": 10295,
          "identifier": "homework1",
          "parentId": 10294,
          "parentIdentifier": "homework_total",
          "courseCode": "PI-ARB",
          "semesterCode": "B202",
          "evaluationType": "MANUAL",
          "classificationType": "HOMEWORK",
          "valueType": "NUMBER",
          "classificationTextDtos": [
            {
              "identifier": "cs",
              "name": "Domácí úkol 1"
            },
            {
              "identifier": "en",
              "name": "Homework 1"
            }
          ],
          "skillDtos": [],
          "hidden": false,
          "index": 0,
          "minimumValue": 0,
          "minimumRequiredValue": 0,
          "maximumValue": 10,
          "expression": null,
          "aggregatedIdentifier": null,
          "aggregationFunction": null,
          "aggregationScope": null,
          "children": []
        },
        {
          "id": 10296,
          "identifier": "homework2",
          "parentId": 10294,
          "parentIdentifier": "homework_total",
          "courseCode": "PI-ARB",
          "semesterCode": "B202",
          "evaluationType": "MANUAL",
          "classificationType": "HOMEWORK",
          "valueType": "NUMBER",
          "classificationTextDtos": [
            {
              "identifier": "cs",
              "name": "Domácí úkol 2"
            },
            {
              "identifier": "en",
              "name": "Homework 2"
            }
          ],
          "skillDtos": [],
          "hidden": false,
          "index": 1,
          "minimumValue": 0,
          "minimumRequiredValue": 0,
          "maximumValue": 10,
          "expression": null,
          "aggregatedIdentifier": null,
          "aggregationFunction": null,
          "aggregationScope": null,
          "children": []
        },
        {
          "id": 10297,
          "identifier": "homework3",
          "parentId": 10294,
          "parentIdentifier": "homework_total",
          "courseCode": "PI-ARB",
          "semesterCode": "B202",
          "evaluationType": "MANUAL",
          "classificationType": "HOMEWORK",
          "valueType": "NUMBER",
          "classificationTextDtos": [
            {
              "identifier": "cs",
              "name": "Domácí úkol 3"
            },
            {
              "identifier": "en",
              "name": "Homework 3"
            }
          ],
          "skillDtos": [],
          "hidden": false,
          "index": 2,
          "minimumValue": 0,
          "minimumRequiredValue": 0,
          "maximumValue": 10,
          "expression": null,
          "aggregatedIdentifier": null,
          "aggregationFunction": null,
          "aggregationScope": null,
          "children": []
        },
        {
          "id": 10298,
          "identifier": "homework4",
          "parentId": 10294,
          "parentIdentifier": "homework_total",
          "courseCode": "PI-ARB",
          "semesterCode": "B202",
          "evaluationType": "MANUAL",
          "classificationType": "HOMEWORK",
          "valueType": "NUMBER",
          "classificationTextDtos": [
            {
              "identifier": "cs",
              "name": "Domácí úkol 4"
            },
            {
              "identifier": "en",
              "name": "Homework 4"
            }
          ],
          "skillDtos": [],
          "hidden": false,
          "index": 3,
          "minimumValue": 0,
          "minimumRequiredValue": 0,
          "maximumValue": 10,
          "expression": null,
          "aggregatedIdentifier": null,
          "aggregationFunction": null,
          "aggregationScope": null,
          "children": []
        }
      ]
    },
      {
        "id": 10301,
        "identifier": "semestral_test1",
        "parentId": null,
        "parentIdentifier": null,
        "courseCode": "PI-ARB",
        "semesterCode": "B202",
        "evaluationType": "MANUAL",
        "classificationType": "SEMESTRAL_TEST",
        "valueType": "NUMBER",
        "classificationTextDtos": [
          {
            "identifier": "cs",
            "name": "Semestrální test 1"
          },
          {
            "identifier": "en",
            "name": "Semestral test 1"
          }
        ],
        "skillDtos": [],
        "hidden": false,
        "index": 1,
        "minimumValue": 0,
        "minimumRequiredValue": 10,
        "maximumValue": 30,
        "expression": null,
        "aggregatedIdentifier": null,
        "aggregationFunction": null,
        "aggregationScope": null,
        "children": []
      },
      {
        "id": 10302,
        "identifier": "semestral_test2",
        "parentId": null,
        "parentIdentifier": null,
        "courseCode": "PI-ARB",
        "semesterCode": "B202",
        "evaluationType": "MANUAL",
        "classificationType": "SEMESTRAL_TEST",
        "valueType": "NUMBER",
        "classificationTextDtos": [
          {
            "identifier": "cs",
            "name": "Semestrální test 2"
          },
          {
            "identifier": "en",
            "name": "Semestral test 2"
          }
        ],
        "skillDtos": [],
        "hidden": false,
        "index": 2,
        "minimumValue": 0,
        "minimumRequiredValue": 10,
        "maximumValue": 30,
        "expression": null,
        "aggregatedIdentifier": null,
        "aggregationFunction": null,
        "aggregationScope": null,
        "children": []
      },
      {
        "id": 10299,
        "identifier": "points_total",
        "parentId": null,
        "parentIdentifier": null,
        "courseCode": "PI-ARB",
        "semesterCode": "B202",
        "evaluationType": "EXPRESSION",
        "classificationType": "POINTS_TOTAL",
        "valueType": "NUMBER",
        "classificationTextDtos": [
          {
            "identifier": "cs",
            "name": "Body celkem"
          },
          {
            "identifier": "en",
            "name": "Points total"
          }
        ],
        "skillDtos": [],
        "hidden": false,
        "index": 3,
        "minimumValue": 0,
        "minimumRequiredValue": 50,
        "maximumValue": 100,
        "expression": "number points = SUM(`homework\\d+`, `semestral_test\\d+`); points",
        "aggregatedIdentifier": null,
        "aggregationFunction": null,
        "aggregationScope": null,
        "children": []
      },
      {
        "id": 10300,
        "identifier": "mark",
        "parentId": null,
        "parentIdentifier": null,
        "courseCode": "PI-ARB",
        "semesterCode": "B202",
        "evaluationType": "EXPRESSION",
        "classificationType": "FINAL_SCORE",
        "valueType": "STRING",
        "classificationTextDtos": [
          {
            "identifier": "cs",
            "name": "Známka"
          },
          {
            "identifier": "en",
            "name": "Mark"
          }
        ],
        "skillDtos": [],
        "hidden": false,
        "index": 4,
        "minimumValue": null,
        "minimumRequiredValue": null,
        "maximumValue": null,
        "expression": "number minimum = 50, points = SUM(`homework\\d+`, `semestral_test\\d+`);boolean conditionsMet = points_total >= minimum;string passMark = MARK(points);auto failMark = 'F';conditionsMet ? passMark : failMark",
        "aggregatedIdentifier": null,
        "aggregationFunction": null,
        "aggregationScope": null,
        "children": []
      }];
  }


  static mockDefinitionHierarchy() {
    mockedAxios.get.mockResolvedValueOnce({
      data: Mocker.generateDefinitionHierarchy()
    });
  }

  static mockDefinitionList() {
    let data = Mocker.generateDefinitionHierarchy();
    let flattened: any[] = [];
    data.forEach((definition: any) => {
      definition.children.forEach((childDefinition: any) => {
        flattened.push(childDefinition);
      });
      delete definition.children;
      flattened.push(definition);
    });

    mockedAxios.get.mockResolvedValueOnce({
      data: flattened
    });
  }

  static mockStudentGroups() {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          "studentGroupId": "ALL",
          "name": "{ALL_STUDENTS}",
          "description": "{ALL_STUDENTS}",
          "type": "ALL"
        },
        {
          "studentGroupId": "TEST",
          "name": "{TEST_STUDENTS}",
          "description": "{TEST_STUDENTS}",
          "type": "TEST"
        }
      ]
    });
  }

  static mockGroupClassifications() {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          "userId": null,
          "username": "teststudent4",
          "firstName": "Tom Marviola",
          "lastName": "Riddle",
          "fullName": null,
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "grade": 3,
          "classificationMap": {
            "homework1": {
              "id": null,
              "timestamp": 1619215245779,
              "value": 7,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework3": {
              "id": null,
              "timestamp": 1619215245803,
              "value": 7,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework2": {
              "id": null,
              "timestamp": 1617020922086,
              "value": 7,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework4": {
              "id": null,
              "timestamp": 1619215327215,
              "value": 7,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "points_total": {
              "id": null,
              "timestamp": 1619215327287,
              "value": 72,
              "note": null,
              "authorUsername": "system"
            },
            "semestral_test2": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 14,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "semestral_test1": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 30,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework_total": {
              "id": null,
              "timestamp": 1619215327287,
              "value": 28,
              "note": null,
              "authorUsername": "system"
            },
            "mark": {
              "id": null,
              "timestamp": 1616143072610,
              "value": "C",
              "note": null,
              "authorUsername": "system"
            }
          },
          "parallelCodes": {
            "LECTURE": "TEST_PARALLEL",
            "TUTORIAL": "TEST_PARALLEL",
            "LABORATORY": "TEST_PARALLEL"
          },
          "parallelNumbers": {
            "LECTURE": null,
            "TUTORIAL": null,
            "LABORATORY": null
          }
        },
        {
          "userId": null,
          "username": "teststudent3",
          "firstName": "Pavel",
          "lastName": "Levap",
          "fullName": null,
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "grade": 2,
          "classificationMap": {
            "homework1": {
              "id": null,
              "timestamp": 1619267433986,
              "value": 8,
              "note": "note to the homework No. 1: ...",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework3": {
              "id": null,
              "timestamp": 1619215245803,
              "value": 9,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework2": {
              "id": null,
              "timestamp": 1619215245792,
              "value": 5,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework4": {
              "id": null,
              "timestamp": 1619215245815,
              "value": 7,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "points_total": {
              "id": null,
              "timestamp": 1618050143486,
              "value": 49,
              "note": null,
              "authorUsername": "system"
            },
            "semestral_test2": {
              "id": null,
              "timestamp": 1619215245824,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "semestral_test1": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 20,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework_total": {
              "id": null,
              "timestamp": 1618050143486,
              "value": 29,
              "note": null,
              "authorUsername": "system"
            },
            "mark": {
              "id": null,
              "timestamp": 1616062595919,
              "value": "F",
              "note": null,
              "authorUsername": "system"
            }
          },
          "parallelCodes": {
            "LECTURE": "TEST_PARALLEL",
            "TUTORIAL": "TEST_PARALLEL",
            "LABORATORY": "TEST_PARALLEL"
          },
          "parallelNumbers": {
            "LECTURE": null,
            "TUTORIAL": null,
            "LABORATORY": null
          }
        },
        {
          "userId": null,
          "username": "teststudent2",
          "firstName": "Chuck",
          "lastName": "Norris",
          "fullName": null,
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "grade": 1,
          "classificationMap": {
            "homework1": {
              "id": null,
              "timestamp": 1619213250225,
              "value": 9,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework3": {
              "id": null,
              "timestamp": 1619215245803,
              "value": 10,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework2": {
              "id": null,
              "timestamp": 1617020922083,
              "value": 10,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework4": {
              "id": null,
              "timestamp": 1619215245815,
              "value": 10,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "points_total": {
              "id": null,
              "timestamp": 1619213250286,
              "value": 94,
              "note": null,
              "authorUsername": "system"
            },
            "semestral_test2": {
              "id": null,
              "timestamp": 1619215245825,
              "value": 25,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "semestral_test1": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 30,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework_total": {
              "id": null,
              "timestamp": 1619213250286,
              "value": 39,
              "note": null,
              "authorUsername": "system"
            },
            "mark": {
              "id": null,
              "timestamp": 1616152150027,
              "value": "A",
              "note": null,
              "authorUsername": "system"
            }
          },
          "parallelCodes": {
            "LECTURE": "TEST_PARALLEL",
            "TUTORIAL": "TEST_PARALLEL",
            "LABORATORY": "TEST_PARALLEL"
          },
          "parallelNumbers": {
            "LECTURE": null,
            "TUTORIAL": null,
            "LABORATORY": null
          }
        },
        {
          "userId": null,
          "username": "teststudent1",
          "firstName": "Joe",
          "lastName": "Reacher",
          "fullName": null,
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "grade": 5,
          "classificationMap": {
            "homework1": {
              "id": null,
              "timestamp": 1619215327215,
              "value": 10,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework3": {
              "id": null,
              "timestamp": 1619215245803,
              "value": 10,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework2": {
              "id": null,
              "timestamp": 1617020922083,
              "value": 6,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework4": {
              "id": null,
              "timestamp": 1619215245815,
              "value": 8,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "points_total": {
              "id": null,
              "timestamp": 1619215327287,
              "value": 86,
              "note": null,
              "authorUsername": "system"
            },
            "semestral_test2": {
              "id": null,
              "timestamp": 1619215245825,
              "value": 30,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "semestral_test1": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 22,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework_total": {
              "id": null,
              "timestamp": 1619215327287,
              "value": 34,
              "note": null,
              "authorUsername": "system"
            },
            "mark": {
              "id": null,
              "timestamp": 1616062647621,
              "value": "B",
              "note": null,
              "authorUsername": "system"
            }
          },
          "parallelCodes": {
            "LECTURE": "TEST_PARALLEL",
            "TUTORIAL": "TEST_PARALLEL",
            "LABORATORY": "TEST_PARALLEL"
          },
          "parallelNumbers": {
            "LECTURE": null,
            "TUTORIAL": null,
            "LABORATORY": null
          }
        },
        {
          "userId": null,
          "username": "teststudent8",
          "firstName": "John",
          "lastName": "Shepherd",
          "fullName": null,
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "grade": 2,
          "classificationMap": {
            "homework1": {
              "id": null,
              "timestamp": 1619215245781,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework3": {
              "id": null,
              "timestamp": 1619215245804,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework2": {
              "id": null,
              "timestamp": 1619215245793,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework4": {
              "id": null,
              "timestamp": 1619215245816,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "points_total": {
              "id": null,
              "timestamp": 1617010012030,
              "value": 23,
              "note": null,
              "authorUsername": "system"
            },
            "semestral_test2": {
              "id": null,
              "timestamp": 1619215245826,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "semestral_test1": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 23,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework_total": {
              "id": null,
              "timestamp": 1615985617296,
              "value": 0,
              "note": null,
              "authorUsername": "system"
            },
            "mark": {
              "id": null,
              "timestamp": 1616062595923,
              "value": "F",
              "note": null,
              "authorUsername": "system"
            }
          },
          "parallelCodes": {
            "LECTURE": "TEST_PARALLEL",
            "TUTORIAL": "TEST_PARALLEL",
            "LABORATORY": "TEST_PARALLEL"
          },
          "parallelNumbers": {
            "LECTURE": null,
            "TUTORIAL": null,
            "LABORATORY": null
          }
        },
        {
          "userId": null,
          "username": "teststudent7",
          "firstName": "Landgrave",
          "lastName": "Vials",
          "fullName": null,
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "grade": 1,
          "classificationMap": {
            "homework1": {
              "id": null,
              "timestamp": 1619215245785,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework3": {
              "id": null,
              "timestamp": 1619215245806,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework2": {
              "id": null,
              "timestamp": 1619215245795,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework4": {
              "id": null,
              "timestamp": 1619215245819,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "points_total": {
              "id": null,
              "timestamp": 1617010012030,
              "value": 22,
              "note": null,
              "authorUsername": "system"
            },
            "semestral_test2": {
              "id": null,
              "timestamp": 1619215245827,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "semestral_test1": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 22,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework_total": {
              "id": null,
              "timestamp": 1615985617297,
              "value": 0,
              "note": null,
              "authorUsername": "system"
            },
            "mark": {
              "id": null,
              "timestamp": 1616062595924,
              "value": "F",
              "note": null,
              "authorUsername": "system"
            }
          },
          "parallelCodes": {
            "LECTURE": "TEST_PARALLEL",
            "TUTORIAL": "TEST_PARALLEL",
            "LABORATORY": "TEST_PARALLEL"
          },
          "parallelNumbers": {
            "LECTURE": null,
            "TUTORIAL": null,
            "LABORATORY": null
          }
        },
        {
          "userId": null,
          "username": "teststudent6",
          "firstName": "Matyáš",
          "lastName": "Ivo",
          "fullName": null,
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "grade": 5,
          "classificationMap": {
            "homework1": {
              "id": null,
              "timestamp": 1619215245787,
              "value": 4,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework3": {
              "id": null,
              "timestamp": 1619215245809,
              "value": 6,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework2": {
              "id": null,
              "timestamp": 1619215245796,
              "value": 7,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework4": {
              "id": null,
              "timestamp": 1619215245820,
              "value": 8,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "points_total": {
              "id": null,
              "timestamp": 1616062466290,
              "value": 70,
              "note": null,
              "authorUsername": "system"
            },
            "semestral_test2": {
              "id": null,
              "timestamp": 1619215245827,
              "value": 21,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "semestral_test1": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 24,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework_total": {
              "id": null,
              "timestamp": 1615985617298,
              "value": 25,
              "note": null,
              "authorUsername": "system"
            },
            "mark": {
              "id": null,
              "timestamp": 1616062595927,
              "value": "C",
              "note": null,
              "authorUsername": "system"
            }
          },
          "parallelCodes": {
            "LECTURE": "TEST_PARALLEL",
            "TUTORIAL": "TEST_PARALLEL",
            "LABORATORY": "TEST_PARALLEL"
          },
          "parallelNumbers": {
            "LECTURE": null,
            "TUTORIAL": null,
            "LABORATORY": null
          }
        },
        {
          "userId": null,
          "username": "teststudent5",
          "firstName": "Father",
          "lastName": "Scans Ant",
          "fullName": null,
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "grade": 4,
          "classificationMap": {
            "homework1": {
              "id": null,
              "timestamp": 1619215245788,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework3": {
              "id": null,
              "timestamp": 1619215245810,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework2": {
              "id": null,
              "timestamp": 1619215245797,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework4": {
              "id": null,
              "timestamp": 1619215245821,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "points_total": {
              "id": null,
              "timestamp": 1617200001776,
              "value": 28,
              "note": null,
              "authorUsername": "system"
            },
            "semestral_test2": {
              "id": null,
              "timestamp": 1619215245828,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "semestral_test1": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 28,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework_total": {
              "id": null,
              "timestamp": 1615985617299,
              "value": 0,
              "note": null,
              "authorUsername": "system"
            },
            "mark": {
              "id": null,
              "timestamp": 1617200001776,
              "value": "F",
              "note": null,
              "authorUsername": "system"
            }
          },
          "parallelCodes": {
            "LECTURE": "TEST_PARALLEL",
            "TUTORIAL": "TEST_PARALLEL",
            "LABORATORY": "TEST_PARALLEL"
          },
          "parallelNumbers": {
            "LECTURE": null,
            "TUTORIAL": null,
            "LABORATORY": null
          }
        },
        {
          "userId": null,
          "username": "teststudent9",
          "firstName": "Marcel",
          "lastName": "Scholtz",
          "fullName": null,
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "grade": 3,
          "classificationMap": {
            "homework1": {
              "id": null,
              "timestamp": 1619215245790,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework3": {
              "id": null,
              "timestamp": 1619215245813,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework2": {
              "id": null,
              "timestamp": 1619215245802,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework4": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "points_total": {
              "id": null,
              "timestamp": 1617010012030,
              "value": 19,
              "note": null,
              "authorUsername": "system"
            },
            "semestral_test2": {
              "id": null,
              "timestamp": 1619215245829,
              "value": 0,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "semestral_test1": {
              "id": null,
              "timestamp": 1619215245823,
              "value": 19,
              "note": "",
              "authorUsername": "d67bcf4a-e065-4f6d-8521-bc1666ca3ac6"
            },
            "homework_total": {
              "id": null,
              "timestamp": 1615985617300,
              "value": 0,
              "note": null,
              "authorUsername": "system"
            },
            "mark": {
              "id": null,
              "timestamp": 1616062595929,
              "value": "F",
              "note": null,
              "authorUsername": "system"
            }
          },
          "parallelCodes": {
            "LECTURE": "TEST_PARALLEL",
            "TUTORIAL": "TEST_PARALLEL",
            "LABORATORY": "TEST_PARALLEL"
          },
          "parallelNumbers": {
            "LECTURE": null,
            "TUTORIAL": null,
            "LABORATORY": null
          }
        }
      ]
    });
  }

  static mockGroupClassificationsForDefinition() {
    mockedAxios.get.mockResolvedValueOnce({
      data: [
        {
          "id": 566256,
          "timestamp": null,
          "value": 28,
          "note": null,
          "authorUsername": null,
          "studentUsername": "teststudent4",
          "classificationIdentifier": "homework_total",
          "firstName": "Tom Marvolo",
          "lastName": "Riddle",
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "parallelCodes": {}
        },
        {
          "id": 566257,
          "timestamp": null,
          "value": 29,
          "note": null,
          "authorUsername": null,
          "studentUsername": "teststudent3",
          "classificationIdentifier": "homework_total",
          "firstName": "Pavel",
          "lastName": "Levap",
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "parallelCodes": {}
        },
        {
          "id": 566258,
          "timestamp": null,
          "value": 39,
          "note": null,
          "authorUsername": null,
          "studentUsername": "teststudent2",
          "classificationIdentifier": "homework_total",
          "firstName": "Chuck",
          "lastName": "Norris",
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "parallelCodes": {}
        },
        {
          "id": 566259,
          "timestamp": null,
          "value": 34,
          "note": null,
          "authorUsername": null,
          "studentUsername": "teststudent1",
          "classificationIdentifier": "homework_total",
          "firstName": "Joe",
          "lastName": "Reacher",
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "parallelCodes": {}
        },
        {
          "id": 566260,
          "timestamp": null,
          "value": 0,
          "note": null,
          "authorUsername": null,
          "studentUsername": "teststudent8",
          "classificationIdentifier": "homework_total",
          "firstName": "John",
          "lastName": "Shepherd",
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "parallelCodes": {}
        },
        {
          "id": 566261,
          "timestamp": null,
          "value": 0,
          "note": null,
          "authorUsername": null,
          "studentUsername": "teststudent7",
          "classificationIdentifier": "homework_total",
          "firstName": "Landgrave",
          "lastName": "Vials",
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "parallelCodes": {}
        },
        {
          "id": 566262,
          "timestamp": null,
          "value": 25,
          "note": null,
          "authorUsername": null,
          "studentUsername": "teststudent6",
          "classificationIdentifier": "homework_total",
          "firstName": "Matyáš",
          "lastName": "Ivo",
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "parallelCodes": {}
        },
        {
          "id": 566263,
          "timestamp": null,
          "value": 0,
          "note": null,
          "authorUsername": null,
          "studentUsername": "teststudent5",
          "classificationIdentifier": "homework_total",
          "firstName": "Father",
          "lastName": "Scans Ant",
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "parallelCodes": {}
        },
        {
          "id": 566264,
          "timestamp": null,
          "value": 0,
          "note": null,
          "authorUsername": null,
          "studentUsername": "teststudent9",
          "classificationIdentifier": "homework_total",
          "firstName": "Marcel",
          "lastName": "Scholtz",
          "email": "teststudent@fit.cvut.cz",
          "personalNumber": null,
          "parallelCodes": {}
        }
      ]
    });
  }

  static mockSingleStudentClassifications() {
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        "userId": null,
        "username": "teststudent1",
        "firstName": "Joe",
        "lastName": "Reacher",
        "fullName": "Joe Reacher",
        "email": "teststudent@fit.cvut.cz",
        "personalNumber": null,
        "grade": 5,
        "studentClassificationFullDtos": [
          {
            "id": 10295,
            "identifier": "homework1",
            "parentId": 10294,
            "parentIdentifier": "homework_total",
            "courseCode": "PI-ARB",
            "semesterCode": "B202",
            "evaluationType": "MANUAL",
            "classificationType": "HOMEWORK",
            "valueType": "NUMBER",
            "classificationTextDtos": [
              {
                "identifier": "cs",
                "name": "Domácí úkol 1"
              },
              {
                "identifier": "en",
                "name": "Homework 1"
              }
            ],
            "skillDtos": [],
            "hidden": false,
            "index": 0,
            "minimumValue": 0,
            "minimumRequiredValue": 0,
            "maximumValue": 10,
            "expression": null,
            "aggregatedIdentifier": null,
            "aggregationFunction": null,
            "aggregationScope": null,
            "value": 10,
            "note": "",
            "lastUpdated": 1619215327215
          },
          {
            "id": 10294,
            "identifier": "homework_total",
            "parentId": null,
            "parentIdentifier": null,
            "courseCode": "PI-ARB",
            "semesterCode": "B202",
            "evaluationType": "EXPRESSION",
            "classificationType": "HOMEWORK",
            "valueType": "NUMBER",
            "classificationTextDtos": [
              {
                "identifier": "cs",
                "name": "Domácí úkoly celkem"
              },
              {
                "identifier": "en",
                "name": "Homeworks total"
              }
            ],
            "skillDtos": [],
            "hidden": false,
            "index": 0,
            "minimumValue": 0,
            "minimumRequiredValue": 20,
            "maximumValue": 40,
            "expression": "SUM(`homework\\d+`)",
            "aggregatedIdentifier": null,
            "aggregationFunction": null,
            "aggregationScope": null,
            "value": 34,
            "note": null,
            "lastUpdated": 1619215327287
          },
          {
            "id": 10296,
            "identifier": "homework2",
            "parentId": 10294,
            "parentIdentifier": "homework_total",
            "courseCode": "PI-ARB",
            "semesterCode": "B202",
            "evaluationType": "MANUAL",
            "classificationType": "HOMEWORK",
            "valueType": "NUMBER",
            "classificationTextDtos": [
              {
                "identifier": "cs",
                "name": "Domácí úkol 2"
              },
              {
                "identifier": "en",
                "name": "Homework 2"
              }
            ],
            "skillDtos": [],
            "hidden": false,
            "index": 1,
            "minimumValue": 0,
            "minimumRequiredValue": 0,
            "maximumValue": 10,
            "expression": null,
            "aggregatedIdentifier": null,
            "aggregationFunction": null,
            "aggregationScope": null,
            "value": 6,
            "note": "",
            "lastUpdated": 1617020922083
          },
          {
            "id": 10301,
            "identifier": "semestral_test1",
            "parentId": null,
            "parentIdentifier": null,
            "courseCode": "PI-ARB",
            "semesterCode": "B202",
            "evaluationType": "MANUAL",
            "classificationType": "SEMESTRAL_TEST",
            "valueType": "NUMBER",
            "classificationTextDtos": [
              {
                "identifier": "cs",
                "name": "Semestrální test 1"
              },
              {
                "identifier": "en",
                "name": "Semestral test 1"
              }
            ],
            "skillDtos": [],
            "hidden": false,
            "index": 1,
            "minimumValue": 0,
            "minimumRequiredValue": 10,
            "maximumValue": 30,
            "expression": null,
            "aggregatedIdentifier": null,
            "aggregationFunction": null,
            "aggregationScope": null,
            "value": 22,
            "note": "",
            "lastUpdated": 1619215245823
          },
          {
            "id": 10302,
            "identifier": "semestral_test2",
            "parentId": null,
            "parentIdentifier": null,
            "courseCode": "PI-ARB",
            "semesterCode": "B202",
            "evaluationType": "MANUAL",
            "classificationType": "SEMESTRAL_TEST",
            "valueType": "NUMBER",
            "classificationTextDtos": [
              {
                "identifier": "cs",
                "name": "Semestrální test 2"
              },
              {
                "identifier": "en",
                "name": "Semestral test 2"
              }
            ],
            "skillDtos": [],
            "hidden": false,
            "index": 2,
            "minimumValue": 0,
            "minimumRequiredValue": 10,
            "maximumValue": 30,
            "expression": null,
            "aggregatedIdentifier": null,
            "aggregationFunction": null,
            "aggregationScope": null,
            "value": 30,
            "note": "",
            "lastUpdated": 1619215245825
          },
          {
            "id": 10297,
            "identifier": "homework3",
            "parentId": 10294,
            "parentIdentifier": "homework_total",
            "courseCode": "PI-ARB",
            "semesterCode": "B202",
            "evaluationType": "MANUAL",
            "classificationType": "HOMEWORK",
            "valueType": "NUMBER",
            "classificationTextDtos": [
              {
                "identifier": "cs",
                "name": "Domácí úkol 3"
              },
              {
                "identifier": "en",
                "name": "Homework 3"
              }
            ],
            "skillDtos": [],
            "hidden": false,
            "index": 2,
            "minimumValue": 0,
            "minimumRequiredValue": 0,
            "maximumValue": 10,
            "expression": null,
            "aggregatedIdentifier": null,
            "aggregationFunction": null,
            "aggregationScope": null,
            "value": 10,
            "note": "",
            "lastUpdated": 1619215245803
          },
          {
            "id": 10298,
            "identifier": "homework4",
            "parentId": 10294,
            "parentIdentifier": "homework_total",
            "courseCode": "PI-ARB",
            "semesterCode": "B202",
            "evaluationType": "MANUAL",
            "classificationType": "HOMEWORK",
            "valueType": "NUMBER",
            "classificationTextDtos": [
              {
                "identifier": "cs",
                "name": "Domácí úkol 4"
              },
              {
                "identifier": "en",
                "name": "Homework 4"
              }
            ],
            "skillDtos": [],
            "hidden": false,
            "index": 3,
            "minimumValue": 0,
            "minimumRequiredValue": 0,
            "maximumValue": 10,
            "expression": null,
            "aggregatedIdentifier": null,
            "aggregationFunction": null,
            "aggregationScope": null,
            "value": 8,
            "note": "",
            "lastUpdated": 1619215245815
          },
          {
            "id": 10299,
            "identifier": "points_total",
            "parentId": null,
            "parentIdentifier": null,
            "courseCode": "PI-ARB",
            "semesterCode": "B202",
            "evaluationType": "EXPRESSION",
            "classificationType": "POINTS_TOTAL",
            "valueType": "NUMBER",
            "classificationTextDtos": [
              {
                "identifier": "cs",
                "name": "Body celkem"
              },
              {
                "identifier": "en",
                "name": "Points total"
              }
            ],
            "skillDtos": [],
            "hidden": false,
            "index": 3,
            "minimumValue": 0,
            "minimumRequiredValue": 50,
            "maximumValue": 100,
            "expression": "number points = SUM(`homework\\d+`, `semestral_test\\d+`); points",
            "aggregatedIdentifier": null,
            "aggregationFunction": null,
            "aggregationScope": null,
            "value": 86,
            "note": null,
            "lastUpdated": 1619215327287
          },
          {
            "id": 10300,
            "identifier": "mark",
            "parentId": null,
            "parentIdentifier": null,
            "courseCode": "PI-ARB",
            "semesterCode": "B202",
            "evaluationType": "EXPRESSION",
            "classificationType": "FINAL_SCORE",
            "valueType": "STRING",
            "classificationTextDtos": [
              {
                "identifier": "cs",
                "name": "Známka"
              },
              {
                "identifier": "en",
                "name": "Mark"
              }
            ],
            "skillDtos": [],
            "hidden": false,
            "index": 4,
            "minimumValue": null,
            "minimumRequiredValue": null,
            "maximumValue": null,
            "expression": "number minimum = 50, points = SUM(`homework\\d+`, `semestral_test\\d+`);boolean conditionsMet = points_total >= minimum;string passMark = MARK(points);auto failMark = 'F';conditionsMet ? passMark : failMark",
            "aggregatedIdentifier": null,
            "aggregationFunction": null,
            "aggregationScope": null,
            "value": "B",
            "note": null,
            "lastUpdated": 1616062647621
          }
        ],
        "parallelCodes": {
          "LABORATORY": "TEST_PARALLEL",
          "LECTURE": "TEST_PARALLEL",
          "TUTORIAL": "TEST_PARALLEL"
        }
      }
    });
  }

  static mockDefinitionCreated(definition: Definition) {
    mockedAxios.post.mockImplementationOnce(async (url, data, config) => {
      TypeTests.testDefinitionCreateDTO([definition], data);
      return {
        data: {}
      };
    })
  }

  static mockDefinitionCreatedFail(definition: Definition) {
    mockedAxios.post.mockImplementationOnce(async (url, data, config) => {
      TypeTests.testDefinitionCreateDTO([definition], data);
      throw {
        response: {
          status: 400,
          statusText: 'Bad Request'
        }
      };
    })
  }

  static mockDefinitionUpdated(definition: Definition) {
    mockedAxios.put.mockImplementationOnce(async (url, data, config) => {
      TypeTests.testDefinitionUpdateDTO([definition], data);
      return {
        data: {}
      };
    })

  }

  static mockDefinitionDeleted(course: string, definition: string) {
    mockedAxios.delete.mockImplementationOnce(async (url, config) => {
      TypeTests.testUrlDefinitionDelete(course, definition, url);
      return {
        data: {}
      };
    });
  }

  static mockDefinitionDeletedFail(course: string, definition: string) {
    mockedAxios.delete.mockImplementationOnce(async (url, config) => {
      TypeTests.testUrlDefinitionDelete(course, definition, url);
      throw {
        response: {
          status: 400,
          statusText: 'Bad Request'
        }
      };
    });
  }

  static mockSaveStudentClassifications(classifications: Classification | Classification[]) {
    mockedAxios.put.mockImplementationOnce(async (url, data, config) => {
      TypeTests.testClassificationDTO(classifications, data);
      return {
        data: {}
      };
    });
  }

  static mockSaveStudentClassificationsFail(classifications: Classification | Classification[]) {
    mockedAxios.put.mockImplementationOnce(async (url, data, config) => {
      TypeTests.testClassificationDTO(classifications, data);
      throw {
        response: {
          status: 400,
          statusText: 'Bad Request'
        }
      };
    });
  }

  static checkCallCounts(counter: { [name: string]: number } = {}) {
    [{axios: mockedAxios.post, title: 'post'},
      {axios: mockedAxios.get, title: 'get'},
      {axios: mockedAxios.put, title: 'put'},
      {axios: mockedAxios.delete, title: 'delete'}].forEach(
      (method) => {
        if (method.title in counter)
          expect(method.axios).toHaveBeenCalledTimes(counter[method.title]);
        else
          expect(method.axios).toHaveBeenCalledTimes(0);
      }
    );
  }
}
  