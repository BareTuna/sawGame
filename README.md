# Starter Project

A starter project powered by Vite (french for fast and pronounced like 'veet').

## Instructions

After you clone (download) this repository from GitHub, run the following command to install the required NPM packages. You only need to do this once.

```bash
npm install
```

Run the following command to start the local development server:

```bash
npm start
```

Visit http://localhost:8080/ in your browser (Chrome and/or Firefox are recommended) to view your site. With the development server running, any change you make is compiled and seen automatically in the browser.

**NOTE**: All your HTML/CSS/Javascript code should go into the correct folders/files under the `src/` folder. Do not touch the contents of the `dist/` folder; they are generated by Vite based on what you have under the `src\` folder when you run the deployment command below.

When you are done with development and ready to deploy your application, run the following command:

```bash
npm run deploy
```

or

```bash
npm run build
```

This command will compile everything you have under the `src/` folder into the `dist/` folder. You then copy the contents of the `dist/` folder including subfolders into your web server.

This project is equipped with eslint which should report any problems you might have in your JavaScript. The linter will runn automatically when you run the preview two commands. You can call the linter directly by running the command:

```bash
npm run lint
```

This project is also equipped with prettier which you can call to format your code (html, js, css, and scss) by calling the command:

```bash
npm run format
```
