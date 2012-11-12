
$(function() {
  var getDirectory, packApplication, runApplication, skele;
  getDirectory = function() {
	var folder, props;
	folder = "";
	props = {
	  multiple: false,
	  directories: true,
	  files: false
	};
	Ti.UI.currentWindow.openFolderChooserDialog((function(f) {
	  if (f.length) {
		return folder = f[0];
	  } else {
		return folder = false;
	  }
	}), props);
	return folder;
  };
  skele = function(location) {
	var file;
	file = Ti.Filesystem.getFile(Ti.Filesystem.getResourcesDirectory(), 'skele/helloworld.zip');
	if (file.exists) {
	  return Ti.Codec.extractZip(file, location, function() {
		$(".disabled").removeClass("disabled");
		return alert("Skeleton Installed");
	  });
	}
  };
  packApplication = function(builder, dir, dest) {
	var launcher, output;
	launcher = Ti.Process.createProcess({
	  args: ["python", builder, "-p", "-n", "-t bundle", "-d", dest, dir]
	});
	$("#end").hide();
	output = false;
	launcher.setOnReadLine(function(data) {
	  if (output === false) {
		$(".container").fadeOut();
		$(".output").fadeIn();
		output = true;
	  }
	  return $(".console ul").append("<li>" + data.toString() + "</li>");
	});
	launcher.setOnExit(function(d) {
	  $(".output").fadeOut();
	  $(".container").fadeIn();
	  return $(".disabled").removeClass("disabled");
	});
	return launcher.launch();
  };
  runApplication = function(builder, dir, dest) {
	var launcher, output;
	launcher = Ti.Process.createProcess({
	  args: ["python", builder, "-r", "-v", "-n", "-t bundle", "-d", dest, dir]
	});
	output = false;
	launcher.setOnReadLine(function(data) {
	  if (output === false) {
		$(".container").fadeOut();
		$(".output").fadeIn();
		output = true;
	  }
	  return $(".console ul").append("<li>" + data.toString() + "</li>");
	});
	launcher.setOnExit(function(d) {
	  $(".output").fadeOut();
	  $(".container").fadeIn();
	  return $(".disabled").removeClass("disabled");
	});
	launcher.launch();
	return $('.console #end').click(function() {
	  return launcher.terminate();
	});
  };
  $("#skeleton").click(function() {
	var dir;
	dir = getDirectory();
	$(this).addClass("disabled");
	return skele(dir);
  });
  $("#run").click(function() {
	var builder, dest, dir, sdk_path, sdks, _i, _len;
	dir = getDirectory();
	sdks = Ti.API.getInstalledSDKs();
	if (sdks.length > 1) {
	  for (_i = 0, _len = sdk.length; _i < _len; _i++) {
		sdks = sdk[_i];
		if (sdk === '1.3.0-beta') {
		  sdk_path = sdks.getPath();
		}
	  }
	} else {
	  sdk_path = sdks[0].getPath();
	}
	$(this).addClass("disabled");
	$(".console ul").empty();
	dest = Ti.Filesystem.getFile(dir, "dist", Ti.platform);
	if (dest.exists() === false) {
	  dest.createDirectory(true);
	}
	builder = Ti.Filesystem.getFile(sdk_path, "tidebuilder.py");
	return runApplication(builder, dir, dest);
  });
  return $("#package").click(function() {
	var builder, dest, dir, sdk_path, sdks, _i, _len;
	dir = getDirectory();
	sdks = Ti.API.getInstalledSDKs();
	if (sdks.length > 1) {
	  for (_i = 0, _len = sdk.length; _i < _len; _i++) {
		sdks = sdk[_i];
		if (sdk === '1.3.0-beta') {
		  sdk_path = sdks.getPath();
		}
	  }
	} else {
	  sdk_path = sdks[0].getPath();
	}
	$(this).addClass("disabled");
	$(".console ul").empty();
	dest = Ti.Filesystem.getFile(dir, "dist", Ti.platform);
	if (dest.exists() === false) {
	  dest.createDirectory(true);
	}
	builder = Ti.Filesystem.getFile(sdk_path, "tidebuilder.py");
	return packApplication(builder, dir, dest);
  });
});
