define(function (require, exports, module) {

	var fileInfo = {};

	function addIcon(extension, icon, color, size) {
		fileInfo[extension] = {
			icon: icon,
			color: color,
			size: size
		};
	}

	function addAlias(extension, other) {
		fileInfo[extension] = fileInfo[other];
	}

	function getDefaultIcon(extension) {
		if (extension === '') {
			return {
				color: '#94a3a7',
				icon: '\uf011'
			};
		}

		var hue = 0;
		var saturnation = 90;
		var lightness = 50;

		for (var i = 0; i < extension.length; ++i) {
			hue += extension.charCodeAt(i) * 42 * (i + 2);
			hue %= 256;
			saturnation = (saturnation + (extension.charCodeAt(i) % 30) + 70) / 2;
			lightness = (lightness + (extension.charCodeAt(i) * 3 % 40) + 30) / 2;
		}

		return {
			color: 'hsl(' + Math.round(hue) + ', ' + Math.round(saturnation) + '%, ' + Math.round(lightness) + '%)',
			icon: '\uf12f'
		};
	}

	// XML
	addIcon('xml', '\uf05f', '#ff6600');
	addIcon('html', '\uf13b', '#d28445');
	addAlias('htm', 'html');

	// Stylesheets
	addIcon('css', '\uf13c', '#6a9fb5');
	addIcon('scss', '\uf13c', '#c6538c');
	addAlias('sass', 'scss');
	addIcon('less', '\uf13c', '#3b6bb2');
	addIcon('styl', '\uf13c', '#b3d107');

	// JavaScript
	addIcon('js', '\ue097', '#f4bf75');
	addIcon('ejs', '\uf05f', '#f4bf75');
	addIcon('ts', '\uf05f', '#0074c1');
	addIcon('coffee', '\ue0b3', '#c9905e');
	addIcon('json', '\uf096', '#F4BF75');
	addIcon('ls', '\uf269', '#369bd7');

	// Server side
	addIcon('php', '\ue09a', '#6976c3');
	addIcon('sql', '\uf096', '#c67f07');

	// Java
	addIcon('java', '\ue098', '#75b4de');
	addAlias('class', 'java');
  
    // Ruby
    addIcon('rb', '\ue091', '#a0422e', 16);
    addAlias('erb',   'rb');
	addAlias('rdoc',  'rb');
    addIcon('haml', '\uf24b', '#ff9900');
  
    // Python
    addIcon('py', '\ue09e', '#75b4de');
    addAlias('pyc',   'py');
	addAlias('pyo',  'py');
	addAlias('pyd',  'py');

	// Shell and friends
	addIcon('sh', '\ue0b7');
	addIcon('bat', '\ue0b7');
	addIcon('command', '\ue0b7');

	// Templating
	addIcon('jade', '\uf13b', '#01dfa5');

	// Images
	addIcon('png', '\uf147', '#dbb1a9');
	addIcon('jpg', '\uf147', '#dedfa3');
	addAlias('jpeg', 'jpg');
	addIcon('tiff', '\uf147', '#ff4000');
	addIcon('ico', '\uf147', '#b6d2d1');
	addIcon('svg', '\uf147', '#c0c5eb');

	addIcon('gif', '\uf012', '#aaecc0');

	// Videos
	addIcon('mp4', '\uf24d');
	addAlias('webm', 'mp4');
	addAlias('ogg', 'mp4');

	// Audio
	addIcon('mp3', '\uf258');
	addAlias('wav', 'mp3');

	// Fonts
	addIcon('ttf', '\uf241', '#ff0000');
    addIcon('eot', '\uf241', '#ff9900');
    addIcon('woff', '\uf241', '#ff33cc');

	// Readme
	addIcon('md', '\uf0c9', '#c36b35');
	addAlias('markdown', 'md');

	// Git
	addIcon('gitignore', '\uf084', '#a0422e', 18);
	addIcon('gitmodules', '\uf020');
	addIcon('gitattributes', '\uf020');

	// Webservers
	addIcon('htaccess', '\uf02f');
	addIcon('htpasswd', '\uf02f');
	addIcon('conf', '\uf02f');

	// Archive
	addIcon('zip', '\uf013');
	addIcon('rar', '\uf013');
	addIcon('7z', '\uf013');
	addIcon('tgz', '\uf013');
	addIcon('tar', '\uf013');
	addIcon('gz', '\uf013');
	addIcon('bzip', '\uf013');

	// Settings
	addIcon('project', '\uf013');
	addAlias('jscsrc', 'project');
	addAlias('jshintrc', 'project');
	addAlias('csslintrc', 'project');
	addAlias('todo', 'project');
	addAlias('classpath', 'project');

	// Other text files
	addIcon('txt', '\uf011');
	addIcon('log', '\uf011');
	addIcon('npmignore', '\uf084', '#a0422e', 18);
	addIcon('yml', '\uf011');
	addIcon('ls', '\uf011');
	addIcon('org', '\uf011');
  
    // Other Files
    addIcon('map', '\uf203');


	var WorkingSetView = brackets.getModule('project/WorkingSetView');
	var ExtensionUtils = brackets.getModule("utils/ExtensionUtils");
	var FileTreeView = brackets.getModule("project/FileTreeView");
	var FileUtils = brackets.getModule("file/FileUtils");

	ExtensionUtils.loadStyleSheet(module, "styles/style.css");


	var provider = function (entry) {
		if (!entry.isFile) {
			return;
		}

		var ext = FileUtils.getSmartFileExtension(entry.fullPath) || entry.name.substr(1);
		if (fileInfo.hasOwnProperty(ext)) {
			data = fileInfo[ext];
		} else {
			data = fileInfo['txt'];
		}
      
		var $new = $('<ins>');
		$new.text(data.icon);
		$new.addClass('jstree-icon file-icon');
		$new.css({
			color: data.color,
			fontSize: (data.size || 16) + 'px'
		});
		return $new;
	};
	
	FileTreeView.addIconProvider(provider);
	WorkingSetView.addIconProvider(provider);
});