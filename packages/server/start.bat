set SCRIPT=user,exam,answer,analyse

for %%s in (%SCRIPT%) do (
  start cmd /c "pnpm start:dev %%s"
)
