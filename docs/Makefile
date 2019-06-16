build:
	rm -rf docs
	gitbook build
	mv _book docs
	git add .
	git commit -m "Build"
	git push origin master

pdf:
	gitbook pdf
	mv book.pdf js-study.pdf
