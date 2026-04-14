
# Project Title

To projekt aplikacji webowej do liczenia punktów w darta, który stworzyłem, żeby połączyć naukę frontendu z praktyką testerską. Całość przetestowałem automatycznie w Playwright, a do repozytorium dodałem pełne CI/CD oparte na GitHub Actions. Traktuję ten projekt jako przykład tego, jak podchodzę do jakości — od testów E2E, przez dokumentację, aż po automatyzację procesu testowego. 


## Acknowledgements
Podczas pracy nad tym projektem korzystałem z kursu “Playwright – From Zero to Hero” na Udemy, który pomógł mi uporządkować wiedzę i zrozumieć dobre praktyki automatyzacji testów. Dodatkowo inspirowałem się dokumentacją Playwright oraz przykładami ze społeczności, które ułatwiły mi budowę stabilnych testów i konfigurację CI/CD.

## Features

- Wybór rodzaju rozgrywki
- Wybór ilości uczestników (2-6)
- Zapisanie ostatniej niedokończonej rozgrywki
- Zliczanie punktów podczas rozgrywki



## Installation

Install my-project with npm

```bash
  npm install my-project
```
###Usage(run app)
 npm start

###Usage(run test)
npx playwright test --ui

###Usage(report)
npx playwright show-report


## Structure of tests

tests/
  e2e/
  a11y/
  api/

## CI/CD

-testy uruchamiają się przy każdym pushu
-generuje raport HTML
-zapisuje artefakty (video, trace, screenshoty)