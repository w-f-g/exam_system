module.exports = {
  apps: [
    {
      name: 'exam_system--user',
      script: './dist/apps/user/main.js',
    },
    {
      name: 'exam_system--exam',
      script: './dist/apps/exam/main.js',
    },
    {
      name: 'exam_system--answer',
      script: './dist/apps/answer/main.js',
    },
    {
      name: 'exam_system--analyse',
      script: './dist/apps/analyse/main.js',
    },
  ],
}
