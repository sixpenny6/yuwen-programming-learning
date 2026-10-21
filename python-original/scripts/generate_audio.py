#!/usr/bin/env python3
"""
Edge TTS 音频预生成脚本
========================
功能：扫描项目中的中文文案，使用微软 Edge TTS 生成高质量语音文件

使用方法：
    cd scripts
    python generate_audio.py

依赖安装：
    pip install edge-tts

作者：AI Assistant
"""

import asyncio
import hashlib
import json
import os
import re
from pathlib import Path
from typing import Set, Dict

# 尝试导入 edge_tts
try:
    import edge_tts
except ImportError:
    print("❌ 缺少依赖：请运行 `pip install edge-tts` 安装")
    exit(1)

# ==================== 配置区 ====================

# 语音设置（微软神经网络语音）
VOICE = "zh-CN-XiaoxiaoNeural"  # 女声，自然流畅
# VOICE = "zh-CN-YunxiNeural"   # 男声，备选

# 目录配置
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_DIR = PROJECT_ROOT / "data"
COMPONENTS_DIR = PROJECT_ROOT / "components"
OUTPUT_DIR = PROJECT_ROOT / "public" / "audio"
MAP_FILE = PROJECT_ROOT / "public" / "audio_map.json"

# 扫描的文件类型
FILE_PATTERNS = ["*.ts", "*.tsx"]

# 并发控制
MAX_CONCURRENT = 10

# 需要排除的内容（正则表达式）
EXCLUDE_PATTERNS = [
    r'^[a-zA-Z0-9_\.\s\-\+\*\/\=\<\>\!\@\#\$\%\^\&\(\)\[\]\{\}\;\:\,\?]+$',  # 纯英文/符号
    r'^\d+$',  # 纯数字
    r'^[\s\n\r\t]+$',  # 纯空白
    r'^(true|false|null|undefined)$',  # JS 关键字
    r'^https?://',  # URL
    r'^[A-Z][a-zA-Z]+\s*$',  # 纯英文单词（如组件名）
]

# ==================== 工具函数 ====================

def extract_chinese_strings(file_path: Path) -> Set[str]:
    """从文件中提取包含中文的字符串"""
    strings = set()
    
    try:
        content = file_path.read_text(encoding='utf-8')
    except Exception as e:
        print(f"⚠️  读取文件失败 {file_path}: {e}")
        return strings
    
    # 匹配双引号和单引号内的字符串
    # 使用非贪婪匹配，处理转义字符
    patterns = [
        r'"([^"\\]*(?:\\.[^"\\]*)*)"',  # 双引号字符串
        r"'([^'\\]*(?:\\.[^'\\]*)*)'",  # 单引号字符串
        r'`([^`\\]*(?:\\.[^`\\]*)*)`',  # 模板字符串（简单处理）
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, content)
        for match in matches:
            # 清理转义字符
            cleaned = match.replace('\\n', ' ').replace('\\t', ' ').replace('\\"', '"').replace("\\'", "'")
            # 检查是否包含中文
            if re.search(r'[\u4e00-\u9fff]', cleaned):
                # 排除过短或过长的内容
                if 2 <= len(cleaned) <= 200:
                    strings.add(cleaned)
    
    return strings


def should_exclude(text: str) -> bool:
    """检查文本是否应该被排除"""
    for pattern in EXCLUDE_PATTERNS:
        if re.match(pattern, text):
            return True
    return False


def generate_hash(text: str) -> str:
    """生成文本的 MD5 哈希值（前8位）"""
    return hashlib.md5(text.encode('utf-8')).hexdigest()[:8]


def load_existing_map() -> Dict[str, str]:
    """加载现有的映射表"""
    if MAP_FILE.exists():
        try:
            with open(MAP_FILE, 'r', encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {}


def save_map(audio_map: Dict[str, str]):
    """保存映射表"""
    with open(MAP_FILE, 'w', encoding='utf-8') as f:
        json.dump(audio_map, f, ensure_ascii=False, indent=2)


# ==================== 核心逻辑 ====================

async def generate_audio(text: str, output_path: Path, semaphore: asyncio.Semaphore) -> bool:
    """使用 Edge TTS 生成单个音频文件"""
    async with semaphore:
        try:
            communicate = edge_tts.Communicate(text, VOICE)
            await communicate.save(str(output_path))
            return True
        except Exception as e:
            print(f"❌ 生成失败 [{text[:20]}...]: {e}")
            return False


async def main():
    print("=" * 60)
    print("🎙️  Edge TTS 音频预生成工具")
    print("=" * 60)
    print(f"📁 项目根目录: {PROJECT_ROOT}")
    print(f"🎤 使用语音: {VOICE}")
    print(f"📂 输出目录: {OUTPUT_DIR}")
    print()

    # 确保输出目录存在
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # Step 1: 扫描文件，提取中文字符串
    print("📖 正在扫描源文件...")
    all_strings: Set[str] = set()
    
    # 手动添加动态拼接的文本（来自 App.tsx OverviewSlide）
    manual_texts = [
        "识字。认得每一个基础的汉字与标点符号。例如：认得代码里的最小单位（系统字、名字、符号）",
        "组词。将汉字进行组合，组成有意义的词语。例如：用最小单元组成能表达小功能的短语（词组）",
        "造句。将词语按语法规则组合成完整的句子。例如：用最小单元组成短语，写出一句完整的代码",
        "写作。用句子组成段落，用段落组成文章。例如：把多个功能段落组合起来，完成一个完整任务",
    ]
    all_strings.update(manual_texts)
    print(f"   ✓ 手动添加: {len(manual_texts)} 条总览页文案")
    
    scan_dirs = [DATA_DIR, COMPONENTS_DIR]
    for scan_dir in scan_dirs:
        if not scan_dir.exists():
            print(f"⚠️  目录不存在，跳过: {scan_dir}")
            continue
        
        for pattern in FILE_PATTERNS:
            for file_path in scan_dir.rglob(pattern):
                strings = extract_chinese_strings(file_path)
                all_strings.update(strings)
                if strings:
                    print(f"   ✓ {file_path.name}: 找到 {len(strings)} 条文案")
    
    # 过滤
    filtered_strings = {s for s in all_strings if not should_exclude(s)}
    print(f"\n📊 扫描完成: 共发现 {len(all_strings)} 条，过滤后 {len(filtered_strings)} 条")
    
    # Step 2: 加载现有映射表，进行增量判断
    print("\n🔍 检查增量更新...")
    existing_map = load_existing_map()
    audio_map = existing_map.copy()
    
    to_generate = []
    for text in filtered_strings:
        file_hash = generate_hash(text)
        file_name = f"{file_hash}.mp3"
        file_path = OUTPUT_DIR / file_name
        url_path = f"/audio/{file_name}"
        
        if file_path.exists() and text in audio_map:
            # 已存在，跳过
            continue
        
        to_generate.append((text, file_path, url_path))
    
    print(f"   已存在: {len(filtered_strings) - len(to_generate)} 条")
    print(f"   待生成: {len(to_generate)} 条")
    
    if not to_generate:
        print("\n✅ 无需生成新音频，映射表已是最新！")
        return
    
    # Step 3: 并发生成音频
    print(f"\n🚀 开始生成音频（并发数: {MAX_CONCURRENT}）...")
    semaphore = asyncio.Semaphore(MAX_CONCURRENT)
    
    tasks = []
    for text, file_path, url_path in to_generate:
        task = asyncio.create_task(generate_audio(text, file_path, semaphore))
        tasks.append((text, file_path, url_path, task))
    
    success_count = 0
    fail_count = 0
    
    for i, (text, file_path, url_path, task) in enumerate(tasks):
        result = await task
        if result:
            audio_map[text] = url_path
            success_count += 1
            # 进度显示
            progress = (i + 1) / len(tasks) * 100
            print(f"   [{progress:5.1f}%] ✓ {text[:30]}{'...' if len(text) > 30 else ''}")
        else:
            fail_count += 1
    
    # Step 4: 保存映射表
    print(f"\n💾 保存映射表到 {MAP_FILE}...")
    save_map(audio_map)
    
    # 统计
    print("\n" + "=" * 60)
    print("📊 生成完成！")
    print(f"   ✅ 成功: {success_count} 条")
    print(f"   ❌ 失败: {fail_count} 条")
    print(f"   📁 总计: {len(audio_map)} 条音频文件")
    print("=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
