# Capacitor Updater Server


**this program is quite dumb by choice; it does not mean to replace the capgo's suite of tools, but rather provide a simple way to just have auto-updates features.**

Designed to work in tandem with [capacitor update](https://github.com/Cap-go/capacitor-updater).
This is a bare implementation of the self-hosted version described in Capgo's documentation; if you want more features, check out [capgo.app](https://capgo.app)

## Usage

### Docker

pull the image from ghcr (github container registry)
```bash
docker pull matfire/capacitor-updater-server
```

## How to find new versions

**beware: the installed version of the application is called builtin**

as of me writing this documentation, there is only one way to find files in your system.

### Local

Use a local csv file to determine the most recent version.

specify these two environment variables
```bash
STORAGE=local
STORAGE_FILE_PATH=<path_to_your_csv_file>
```
The structure of the csv file should be the following
**nb: order is very important here, as the program does not do any kind of validation**
`version_name,version_build,url,previous_version`
where:
- version_name is the version you are dealing with
- version_build is the native code version (`versionName` in `build.gradle` or `CURRENT_PROJECT_VERSION` in `project.pbxproj`)
- url is the url from which to download the .zip file for the update
- previous_version is the version the version you are entering replaces

for example:
`1.0.3,1.0,https://example.com/0.0.3.zip,1.0.2`
means: download the 1.0.3 version if the current version is 1.0.2 and the build version (the native code version) is 1.0