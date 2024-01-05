# PersonalChat

Developed an AI chatbot website to answer questions about myself.
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.0.8.

# Chat Library

Integrated the chat library into any projects as the following

- run `npm i nuttakit-chat`
- add the `ChatComponent` into your project
- add the element `<nuttakit-chat />` into your template

- You can customize the configure by adding `{ provide: ENVIRONMENT, useValue: <<the environment value>> }` into your providers.
- Example of the environment value
```
{
  profileImages: {
    'received': 'assets/<<file name>>',
    'sending': 'assets/<<file name>>',
    'sent': 'assets/<<file name>>'
  },
  chatImages: {
    'dark-mode': 'assets/<<file name>>',
    'light-mode': 'assets/<<file name>>',
    'send': 'assets/<<file name>>'
  },
  isMockup: false,
  apiUrl: '<<api url>>',
};
```

# API

There are 2 APIs
- `get <<url>>/practice/new` with `{message: encodeURIComponent(message)}, responseType: 'text'}` params to get the bot response; it returns string value
- `get <<url>>/practice` to get the first message from bot; it returns string value

# Technologies Used

Angular, Node.js, Express, Firebase, Google Makersuite, Github, Github Actions

# SCREEENSHOT/VIDEO SAMPLE

[![Personal Chat VDO](https://img.youtube.com/vi/RkraJ-xJ9Ns/0.jpg)](https://www.youtube.com/watch?v=RkraJ-xJ9Ns)

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
