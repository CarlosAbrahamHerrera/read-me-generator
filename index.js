// Include packages needed for this application
import fs from 'fs';
import inquirer from 'inquirer';


// Array of questions for user input
const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'What is your project title?'
  },
  {
    type: 'input',
    name: 'description',
    message: 'Provide a description of your project:'
  },
  {
    type: 'input',
    name: 'installation',
    message: 'What are the installation instructions?'
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Provide usage information:'
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your application:',
    choices: ['MIT', 'GPLv3', 'Apache 2.0', 'BSD 3-Clause', 'None']
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Provide contribution guidelines:'
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Provide test instructions:'
  },
  {
    type: 'input',
    name: 'github',
    message: 'Enter your GitHub username:'
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:'
  }
];

// Function to generate markdown for README
function generateMarkdown(data) {
  // Create a license badge if a license is chosen
  let licenseBadge = '';
  if (data.license && data.license !== 'None') {
    licenseBadge = `![License](https://img.shields.io/badge/License-${data.license.replace(/ /g, '%20')}-blue.svg)`;
  }

  return `
# ${data.title}

${licenseBadge}

## Description
${data.description}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${data.installation}

## Usage
${data.usage}

## License
This application is covered under the ${data.license} license.

## Contributing
${data.contributing}

## Tests
${data.tests}

## Questions
If you have any questions about the repo, please contact me at ${data.email}.  
You can view more of my projects at [${data.github}](https://github.com/${data.github}).
`;
}

// Function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) =>
    err ? console.error(err) : console.log(`Success! Your README has been generated as ${fileName}`)
  );
}

// Function to initialize app
function init() {
  inquirer.prompt(questions)
    .then((answers) => {
      const markdown = generateMarkdown(answers);
      writeToFile('README.md', markdown);
    })
    .catch((err) => {
      console.error('Error generating README:', err);
    });
}

// Function call to initialize app
init();
