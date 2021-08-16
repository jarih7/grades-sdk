# Grades SDK

GradesSDK is a tool for integration of Grades classification system into your app. It provides a set of functions and  for simple communication with the Grades service, eliminating the need of using HTTP requests during your development.

Links:
* [GitLab Project](https://gitlab.fit.cvut.cz/hampejar/grades-sdk)
* [NPM module page](https://www.npmjs.com/package/grades-sdk)
* [Apps Manager portal](https://auth.fit.cvut.cz/manager/index.jsf)

## Installing

```
npm install grades-sdk
```

## Preparation
In order to gain access to Grades API, it is first necessary to perform the following two-step process:

1. Create a project in the [Apps Manager portal](https://auth.fit.cvut.cz/manager/index.jsf)
2. Add a new application to your project
3. Pass the client ID and SECRET of the added app to the GradesSDK constructor as shown below. The module will manage the authentication from now on.

## Configuration

```javascript
const sdk = require('grades-sdk');
const {GradesURL} = require("grades-sdk/lib/apiRequestor");

const grades = new sdk.GradesSDK(GradesURL.Live, clientId, clientSecret);
const myCourse = grades.getCourse('NI-XYZ');
```

All set! The ```grades``` instance can be used to retrieve the semester code or to return a ```Course``` instance. To manage a course – its definition hierarchy, student groups and student classifications, the ```Course``` instance (named ```myCourse``` in the code snippet above) can be used.

## Examples
The following code snippets show how the module can be used to perform a number of basic tasks.

### Getting current semester code

```javascript
async function getSemesterCode() {
    const semesterCode = await grades.getSemesterCode()
    console.log(semesterCode);
}
```

### Getting course info

```javascript
async function getInfoForMyCourse() {
    const courseInfo = await myCourse.getCourseInfo();
    console.log(courseInfo);
}
```

### Getting the course's definition hierarchy

```javascript
async function getDHForMyCourse() {
    const definitionHierarchy = await myCourse.definitions.getDefinitionHierarchy();
    console.log(definitionHierarchy);
}
```

### Adding a new definition to the course's definition hierarchy
It will be necessary to add the following require statement to the top of your file to gain access to the ```Definition``` class provided by the module.

```javascript
const {Definition} = require("grades-sdk/lib/definition");
```

The ```Definition``` constructor accepts any object that implements the ```DefnitionInterface```. More detailed information about the classes and interfaces provided by this module can be found in the documentation. -> Just pull this project and open the ```docs/index.html``` file in a browser.

```javascript
async function addDefinitionIntoDH() {
	const newDefinition = new Definition({
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
	
    await myCourse.definitions.createDefinitions(newDefinition);
}
```

### Deleting a definition from the course's definition hierarchy

```javascript
async function deleteDefinition(definitionIdentifier) {
  await myCourse.definitions.deleteDefinitions(definitionIdentifier);
  console.log("Definition deleted");
}
```

### Getting the classifications of a student group

```javascript
async function getGroupClassifications(groupCode) {
  const studentsClassifications = await myCourse.classifications
    .getStudentClassificationsForGroup(groupCode);
}
```
