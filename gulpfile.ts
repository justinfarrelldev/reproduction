import gulp from 'gulp';
import shelljs from 'shelljs';
import { MODULE_MAP } from './src/moduleMap';

const defaultTask = (cb) => {
  // place code for your default task here
  console.log('Hello world!');
  cb();
};
gulp.task('start', async () => {
  if (!process.argv[4]) {
    console.error('No argument was passed to "npm run start".');
    return;
  }
  const moduleToStart: string = process.argv[4].replace(/-/g, '');
  if (!moduleToStart) {
    console.error('No argument was passed to "npm run start".');
    return;
  }

  if (
    MODULE_MAP.filter((module) => module.name === moduleToStart).length === 0
  ) {
    console.error(`Module "${moduleToStart}" not found in module map.`);
    return;
  }
  shelljs.exec(`webpack serve --entry ./src/${moduleToStart}/index.html`);
});

exports.default = defaultTask;
