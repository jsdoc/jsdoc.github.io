REM This file is used for regenerating the tags definition files. 
set jsdocLoc=C:\Users\kastor\Documents\GitHub\jsdoc\
set jsdocDocsLoc=C:\Users\kastor\Documents\GitHub\jsdoc3.github.com\

set jsdoc=%jsdocLoc%jsdoc
set describeTagsLoc=Jake\API\describeTags\

set describeTagsOutDir=%jsdocDocsLoc%%describeTagsLoc%

REM generating API information about tags and putting files into the docs project
call %jsdoc% --describeTags htmlFiles -d %describeTagsOutDir%

REM rebuilding documentation project
cd "%jsdocDocsLoc%"
call jake
