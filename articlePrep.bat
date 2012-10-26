set jsdocLoc=C:\Users\kastor\Documents\GitHub\jsdoc\
set jsdocDocsLoc=C:\Users\kastor\Documents\GitHub\jsdoc3.github.com\

set jsdoc=%jsdocLoc%jsdoc
set describeTagsLoc=Jake\API\describeTags\

set describeTagsOutDir=%jsdocDocsLoc%%describeTagsLoc%

REM generating API information about tags and putting files into the docs project
call %jsdoc% --describeTags htmlFiles -d %describeTagsOutDir%


REM pulling content out of jake articles and placing in extended docs
REM cd "%jsdocDocsLoc%"
REM call jake -f kastor

REM rebuilding documentation project
cd "%jsdocDocsLoc%"
call jake
