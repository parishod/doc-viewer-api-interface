# doc-viewer-api-interface
The project is not in development and not yet ready for production.
# API
`/viewer/index.html?url=http://anotherdomain.com/file.docx`

## Tasks

1. Supported API's and file formats supported by them are listed in `config/services.json`.
2. Read the url parameter passed to the html page and should open it in an iFrame passing it to supported API.

# Notes for Developers

- If you have any issues, create an issue on project's [github page](https://github.com/parishod/doc-viewer-api-interface/issues)
- You may modify the code and create a pull request before merging.
- Keep code clean:
    - Use lint and recommended code formatting tools
    - Avoid code comments
    - Avoid inline JS and CSS
    - Do NOT use any libraries/frameworks unless necessary.
    - Try using modern language features (like ES6) but make sure they are at least supported by browser versions released five months earlier. Or use transpilers (like Babel for Javascript)

## Style guides
- [JavaScript style guide by Airbnb](https://github.com/airbnb/javascript)