publish:
	npm publish --dry-run

install:
	npm install

make lint:
	npx eslint .

lint-fix:
	npx eslint --fix .

run-stylish:
	node bin/gendiff.js file1.json file2.yml

run-plain:
	node bin/gendiff.js -f plain file1.json file2.yml

test:
	npm test

test-watch:
	npx jest --watch

test-coverage:
	npx jest --coverage