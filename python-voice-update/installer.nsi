Unicode true
!include "MUI2.nsh"
!include "FileFunc.nsh"
!include "LogicLib.nsh"
Name "像学习语文一样学习编程"
OutFile "@OUTPUT@"
InstallDir "E:\ai\python-learning"
RequestExecutionLevel admin
SetCompressor zlib
ShowInstDetails show
ShowUninstDetails show
!define APPKEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\bf2648cb-33f8-5f42-9949-68f4a66f5318"
!define MUI_ICON "@ICON@"
!define MUI_UNICON "@ICON@"
!define MUI_ABORTWARNING
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES
!insertmacro MUI_LANGUAGE "SimpChinese"
VIProductVersion "1.0.5.0"
VIAddVersionKey /LANG=2052 "ProductName" "像学习语文一样学习编程"
VIAddVersionKey /LANG=2052 "FileDescription" "像学习语文一样学习编程 安装程序"
VIAddVersionKey /LANG=2052 "FileVersion" "1.0.5.0"
VIAddVersionKey /LANG=2052 "ProductVersion" "1.0.5"
VIAddVersionKey /LANG=2052 "LegalCopyright" ""
Var TestMode
Function .onInit
 SetShellVarContext all
 ${GetParameters} $0
 ClearErrors
 ${GetOptions} $0 "/TEST" $1
 ${IfNot} ${Errors}
  StrCpy $TestMode "1"
 ${Else}
  ReadRegStr $2 HKLM "${APPKEY}" "InstallLocation"
  ${If} $2 != ""
   IfFileExists "$2\像学习语文一样学习编程.exe" 0 +2
   StrCpy $INSTDIR $2
  ${EndIf}
 ${EndIf}
FunctionEnd
Function un.onInit
 SetShellVarContext all
 IfFileExists "$INSTDIR\.voice-test-install" 0 +2
 StrCpy $TestMode "1"
FunctionEnd
Section "主程序" SEC_MAIN
 SetOutPath "$INSTDIR"
 SetOverwrite on
 File /r "@STAGE@\*.*"
 WriteUninstaller "$INSTDIR\Uninstall 像学习语文一样学习编程.exe"
 ${If} $TestMode == "1"
  FileOpen $0 "$INSTDIR\.voice-test-install" w
  FileWrite $0 "isolated installer test"
  FileClose $0
 ${EndIf}
 ${If} $TestMode != "1"
  ; All-users context reuses the existing public desktop link, never a user-desktop duplicate.
  IfFileExists "$DESKTOP\语文式 Python 学习.lnk" +2 0
  CreateShortCut "$DESKTOP\语文式 Python 学习.lnk" "$INSTDIR\像学习语文一样学习编程.exe" "" "$INSTDIR\resources\app-icon.ico" 0
  CreateDirectory "$SMPROGRAMS\像学习语文一样学习编程"
  CreateShortCut "$SMPROGRAMS\像学习语文一样学习编程\语文式 Python 学习.lnk" "$INSTDIR\像学习语文一样学习编程.exe" "" "$INSTDIR\resources\app-icon.ico" 0
  CreateShortCut "$SMPROGRAMS\像学习语文一样学习编程\卸载.lnk" "$INSTDIR\Uninstall 像学习语文一样学习编程.exe"
  WriteRegStr HKLM "${APPKEY}" "DisplayName" "像学习语文一样学习编程 1.0.5"
  WriteRegStr HKLM "${APPKEY}" "DisplayVersion" "1.0.5"
  WriteRegStr HKLM "${APPKEY}" "DisplayIcon" "$INSTDIR\像学习语文一样学习编程.exe,0"
  WriteRegStr HKLM "${APPKEY}" "InstallLocation" "$INSTDIR"
  WriteRegStr HKLM "${APPKEY}" "UninstallString" '$\"$INSTDIR\Uninstall 像学习语文一样学习编程.exe$\"'
  WriteRegDWORD HKLM "${APPKEY}" "NoModify" 1
  WriteRegDWORD HKLM "${APPKEY}" "NoRepair" 1
 ${EndIf}
SectionEnd
Section "Uninstall"
 SetShellVarContext all
 !include "uninstall-files.nsh"
 Delete "$INSTDIR\Uninstall 像学习语文一样学习编程.exe"
 Delete "$INSTDIR\.voice-test-install"
 RMDir "$INSTDIR"
 ${If} $TestMode != "1"
 Delete "$DESKTOP\语文式 Python 学习.lnk"
 Delete "$SMPROGRAMS\像学习语文一样学习编程\语文式 Python 学习.lnk"
 Delete "$SMPROGRAMS\像学习语文一样学习编程\卸载.lnk"
 RMDir "$SMPROGRAMS\像学习语文一样学习编程"
 DeleteRegKey HKLM "${APPKEY}"
 ${EndIf}
SectionEnd
