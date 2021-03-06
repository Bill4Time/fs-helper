// Core Libraries/Frameworks
var fs = require('fs');
var path = require('path');

// Third-Party Libraries/Frameworks
var _ = require('lodash');

var fs_helper = {};

/** getDirPathsRecursivelyByNameSync
 * @param  { String } current_directory              [This is the directory to search.]
 * @param  { Array of Strings } subdirectory_names   [This is the list of directory names that if matched will have their path added to the subdirectories_found.]
 * @param  { Array of Strings } subdirectories_found [This is the data structure that contains the subdirectories found.]
 * @return { Array of Strings}                       [This is an array of strings that are the absolute paths that contains a directory with a name that's in subdirectory_names.]
 */
var getDirPathsRecursivelyByNameSync = function getDirPathsRecursivelyByNameSync(current_directory, subdirectory_names, subdirectories_found) {
	var subdirectories = getDirPathsSync(current_directory);
	if(_.isNull(subdirectories_found) || _.isUndefined(subdirectories_found)) {
		subdirectories_found = [];
	}

	for(var i = 0; i < subdirectories.length; i++) {
		var current_base_name = path.basename(subdirectories[i]);
		// didn't match partial dir name,
		if(_.indexOf(subdirectory_names, current_base_name) == -1) {
			var subdirectory = path.join(current_directory, subdirectories[i]);
			subdirectories_found = _.union(subdirectories_found, getDirPathsRecursivelyByNameSync(subdirectories_found, subdirectories[i], subdirectory_names));
		}
		// did match partial dir name
		else {
			subdirectories_found = _.union(subdirectories_found, [subdirectories[i]]);
		}
	}

	return subdirectories_found;
}

/** getDirPathsSync
 * 		Takes in an absolute path and returns the absolute paths of the subdirectories it contains.
 * @param  { String } current_directory [The directory to search]
 * @return { Array of Strings }         [The directories residing in current_directory]
 */
var getDirPathsSync = function getDirPathsSync(current_directory) {
	directories = fs.readdirSync(current_directory);
	directories_to_return = [];

	for(var i = 0; i < directories.length; i++) {
		var fullPath = path.join(current_directory, directories[i]);
		stat = fs.statSync(fullPath);

		if(stat.isDirectory()) {
			directories_to_return.push(fullPath);
		}
	}

	return directories_to_return;
}

/** getDirDifference
 * 		This returns the difference in the root_directory vs the subdirectory_path. This is done by getting the 
 * 		top most directory name of the subdirectory path and identifying where that exists in the root directory's path
 * 		Then the path from that location to the leaf directory is returned
 * 		Example: root: C:\Users\Logan\Repositories\public-site-2.0\public\templates
 * 				 subdirectory: C:\Users\Logan\Repositories\public-site-2.0\public\templates\siteVersions\legal\partials\headers\defaultHeader.hbs 
				 returns: templates/siteVersions/legal/partials/headers/defaultHeader 
 * @param  { String } root_directory    [ This the root directory to compare to ]
 * @param  { String } subdirectory_path [ This is the subdirectory path to try and locate the difference from ]
 * @return { String }                   [ This returns the difference in the directory path from the root directory to the leaf directory ]
 */
var getDirDifference = function(root_directory, subdirectory_path) {
	var root_directory_basename = path.basename(root_directory);
	var root_template_index_in_subdirectory_path = subdirectory_path.indexOf(root_directory_basename);
	var root_to_extension_path = subdirectory_path.slice([root_template_index_in_subdirectory_path]);

	var extension_length = path.extname(root_to_extension_path).length;

	var name_space_path = root_to_extension_path.slice(0, -extension_length);

	return name_space_path;
};

/** getFilePathsByExtensionSync
 * @param  { String } directory_path           [ This is the directory to search. ]
 * @param  { Array of Strings } extensions     [ These are the file extensions to retrieve. ]
 * @return { Array of Strings }                [ This returns an array of files that have an extension that was provided. ]
 */
var getFilePathsByExtensionSync = function getFilePathsByExtensionSync(directory_path, extensions) {
	var files = [];

	var directory_files = fs.readdirSync(directory_path);

	_.map(directory_files, function(directory_file) {
		var current_file_path = path.join(directory_path, directory_file);
		var file_stat = fs.statSync(current_file_path);
		var file_extension = path.extname(current_file_path).substring(1);
		// console.log('is file: ' + file_stat.isFile());
		// console.log('directory file: ' + directory_file);
		// console.log('file extension: ' + file_extension);

		if(file_stat.isFile()) {
			// the file it found has an extensions that's in the file extensions array
			if(_.indexOf(extensions, file_extension) != -1) {
				// console.log('found file type!~');
				files.push(current_file_path);
			}
		}
	});

	return files;
};

fs_helper.getDirPathsRecursivelyByNameSync = getDirPathsRecursivelyByNameSync;
fs_helper.getDirPathsSync = getDirPathsSync;
fs_helper.getFilePathsByExtensionSync = getFilePathsByExtensionSync; 
fs_helper.getDirDifference = getDirDifference; 

module.exports = fs_helper;