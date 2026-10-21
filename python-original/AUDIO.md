# 音频范围

原工程有 1016 条旧预录 MP3，体积较大，本目录只保留 `public/audio_map.json` 及 [original-audio-manifest.json](original-audio-manifest.json) 的路径、大小和 SHA256，不提交旧 MP3。没有提供不存在的下载链接或把旧录音冒充新配音。

拥有原始文件时，可按清单放回 `public/audio/`。原播放器会优先查旧映射，找不到文件时回退到本机 SpeechSynthesis，语速为 1.0；因此无录音时的音色由设备决定。

如确需重新生成原项目录音，可自行安装 `edge-tts` 后运行：

```powershell
python -m pip install edge-tts==7.3.1
python scripts/generate_audio.py
```

这是需要网络的可选操作，本次没有执行。原生成脚本使用正则扫描源码，旧映射中可能含非教学片段；它不是当前 1.0.5 的精确可达文字盘点器，重新合成也不承诺得到与历史文件一致的字节。运行前应备份本目录映射。

当前 Python 1.0.5 的 460 条精确原文晓晓录音、清单和对应播放器适配属于旁边的 `python-voice-update/`。它们与这套旧映射不是同一合同；本目录没有自动接入新播放器。三项目根目录的维护说明描述当前资产制作流程。
