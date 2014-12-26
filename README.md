#fs-helper

## Overview

This is a node module created in order help provide additonal functions for commonly performed file system operations.

## Installation
```javascript
// to install in the local directory
npm install fs-helper

// to install in the local directory and save to the package.json
npm install fs-helper --save
```

## Methods

### getDirPathsRecursivelyByNameSync(current_directory, subdirectory_names, [subdirectories_found])
#### Description
This function takes in the top level directory to search, an array of directory names that are the desired name to be located. There is also an optional parameter "subdirectories_found", which is used for recursive calls to this function. 

Then it recursively searches sub-directories for directory names that are contained in the "subdirectory_names". If a directory is found that exists in "subdirectory_names" it is added to the "subdirectories_found" array.

This returns an array of the paths to each subdirectory with the matching directory path that was found.

#### Example Usage
Directory Structure:  
/Users/username/node project/  
|__directories  
&nbsp;&nbsp;&nbsp;&nbsp;|__example directory  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__file.txt  
&nbsp;&nbsp;&nbsp;&nbsp;|__not example directory  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__file.txt  
|__other directories  
&nbsp;&nbsp;&nbsp;&nbsp;|__example directory  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__file.txt  
&nbsp;&nbsp;&nbsp;&nbsp;|__not example directory  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__file.txt  

```javascript
var fsHelper = require('fs-helper');
var subdir_paths = fsHelper.getDirPathsRecursivelyByNameSync('/Users/username/node project/', ['example directory']);
```

The result of this operation is that subdir_paths will contain the strings:  
- /Users/username/node project/directories/example directory
- /Users/username/node project/other directories/example directory
 
### getDirPathsSync(current_directory)
#### Description
This function takes in the absolute path to a directory and returns an array containing the absolute path for each subdirectory.

#### Example Usage
Directory Structure:  
/Users/username/node project/  
|__directories  
&nbsp;&nbsp;&nbsp;&nbsp;|__example directory  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__file.txt  
&nbsp;&nbsp;&nbsp;&nbsp;|__not example directory  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__file.txt  
|__other directories  
&nbsp;&nbsp;&nbsp;&nbsp;|__example directory  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__file.txt  
&nbsp;&nbsp;&nbsp;&nbsp;|__not example directory  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__file.txt  

```javascript
var fsHelper = require('fs-helper');
var subdirectories = fsHelper.getDirPathsRecursivelyByNameSync('/Users/username/node project')
```

The result of this operation is that subdirectories will contain the paths:
- /Users/username/node project/directories
- /Users/username/node project/other directories

### getDirDifference(root_directory, subdirectory_path)
#### Description
This returns the difference in the root_directory vs the subdirectory_path. This is done by getting the top most directory name of the subdirectory path and identifying where that exists in the root directory's path. Then the path from that location to the leaf directory is returned.

#### Example Usage
root: /Users/username/node project/public/templates
subdirectory: /Users/username/node project/public/public/templates/siteVersions/index.hbs 

The result of this operation is a string that's returned.
- templates/siteVerions/index.hbs

### getFilePathsByExtensionSync(directory_path, extensions) {
#### Description
This takes in a directory path to search as well as an array of file extensions you're looking for. Then it returns an array containing a path for each file found in the directory that has an extension specified

#### Example Usage
Directory Structure:  
/Users/username/node project/  
|__directories  
&nbsp;&nbsp;&nbsp;&nbsp;|__example.txt
&nbsp;&nbsp;&nbsp;&nbsp;|__example.html
&nbsp;&nbsp;&nbsp;&nbsp;|__example.css
  
```javascript
var fsHelper = require('fs-helper');
var paths = fsHelper.getFilePathsByExtensionSync('/Users/username/node project/directories', ['html', 'css']);
```

The result of this operation will be an array containing the paths to the html and css files.
- /Users/username/node project/directories/example.html
- /Users/username/node project/directories/example.css
