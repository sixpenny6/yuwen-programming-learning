"""Package active C/C++ source and the safe Python voice patch, never private baselines."""
from pathlib import Path
import argparse
import hashlib
import json
import re
import subprocess
import zipfile

root = Path(__file__).resolve().parents[1]
version = json.loads((root / 'package.json').read_text(encoding='utf-8'))['version']
python_version = '1.0.5'
spacing_revision = '1.3.1' if version == '1.3.1' else None
course_revision = '1.3.0' if spacing_revision else version if version.startswith('1.3.') else None
destination = root / f'releases/语文式C与C++教学软件-原版153页-源码-{version}.zip'
active_src = {'original', 'adapted-data', 'speech', 'main.tsx', 'styles.css', 'lexer.ts', 'types.ts', 'teaching-code-spacing.ts'}
historical_scripts = {
    'verify-cpp.mjs', 'verify-courses.mjs', 'test-ui.cjs', 'restore-original-ui.mjs',
    'adapt-literacy.mjs', 'adapt-original-ide.mjs', 'generate-natural-narration.py',
    'narration-text.mjs', 'prepare-narration.mjs', 'publish-narration.mjs',
    'test-narration-text.mjs', 'test-narration-ui.cjs', 'publish-python-narration.mjs',
    'verify-narration.mjs', 'test-hybrid-narration-ui.cjs', 'probe-native-narration.cjs',
    'generate-yaoyao-narration.ps1', 'prepare-yaoyao-narration.mjs',
    'publish-yaoyao-narration.mjs', 'verify-yaoyao-narration.mjs',
    'c-author-review.cjs',
}
text_suffixes = {'.ts', '.tsx', '.js', '.cjs', '.mjs', '.py', '.ps1', '.json', '.jsonl', '.md',
                 '.html', '.css', '.yaml', '.yml', '.txt', '.svg', '.c', '.cpp', '.lock', '.nsi', '.nsh'}
inherited_reports = {'original-courses.json', 'original-ui.json', 'original-ai.json',
                     'original-spacing.json', 'installation-1.1.0-verification.json'}
current_reports = {
    'official-installation.json', 'desktop-shortcuts.json', 'python-official-installation.json',
    'narration-inventory.json', 'python-narration-inventory.json', 'xiaoxiao-narration-input.json',
    'xiaoxiao-narration-input-verification.json', 'xiaoxiao-generation-verification.json',
    'xiaoxiao-publication.json', 'xiaoxiao-verification.json', 'python-voice-build.json',
    'layout-final-summary.json', 'layout-final/python.json', 'layout-final/c.json', 'layout-final/cpp.json',
    'layout-final/interactions-python.json', 'layout-final/interactions-c.json', 'layout-final/interactions-cpp.json',
}
inherited_audio_reports = {'xiaoxiao-ui.json'}
layout_reference_reports = {'layout-baseline-summary.json', 'layout-baseline/python/snapshot.json',
                            'layout-baseline/c/snapshot.json', 'layout-baseline/cpp/snapshot.json'}
revision_reports = set()
if course_revision:
    revision_prefix = f'course-{course_revision}/'
    revision_reports = {revision_prefix + name for name in [
        'course-verification.json', 'c-features.json', 'cpp-features.json', 'beginner-audit.json', 'unchanged-python.json', 'narration-inventory.json', 'narration-input.json', 'narration-plan.json',
        'narration-generation.json', 'narration-publication.json', 'narration-verification.json', 'narration-ui.json',
        'layout/c.json', 'layout/cpp.json', 'layout/interactions-c.json', 'layout/interactions-cpp.json',
        'baseline/narration-inventory.json', 'baseline/xiaoxiao-narration-input.json',
        'baseline/xiaoxiao-generation-verification.json', 'baseline/xiaoxiao-publication.json',
        'baseline/xiaoxiao-verification.json', 'baseline/xiaoxiao-ui.json',
        'baseline/official-installation-1.2.4.json', 'baseline/desktop-shortcuts-1.2.4.json']}
reference_reports = {'python-installed-baseline.json', 'python-voice-baseline.json', 'python-voice-runtime.json'}
raw_derivation_reports = {'yaoyao-narration-input.json'}
spacing_reports = {f'spacing-{spacing_revision}/' + name for name in [
    'baseline.json', 'static.json', 'ui.json', 'reachable-narration.json',
    'baseline/official-installation.json', 'baseline/desktop-shortcuts.json',
    'baseline/c-1.3.0-manifest.json', 'baseline/cpp-1.3.0-manifest.json']} if spacing_revision else set()
required_reports = inherited_reports | current_reports | inherited_audio_reports | layout_reference_reports | revision_reports | spacing_reports | {'python-installed-baseline.json'}
voice_policy = {'id': 'microsoft-xiaoxiao-neural-normal', 'name': '晓晓', 'engine': 'Microsoft Edge Online TTS',
                'speaker': 'zh-CN-XiaoxiaoNeural', 'synthesisRate': '+0%', 'playbackRate': 1, 'pitch': '+0Hz', 'volume': '+0%'}
fallback_policy = {'lang': 'zh-CN', 'rate': 1, 'preferredVoices': ['Xiaoxiao'], 'enabled': False}
group_policy = {'c-cpp': ('public/narration', {'c', 'cpp'}, 646),
                'python': ('python-voice-update/narration', {'python'}, 460)}
language_counts = {'c': 494, 'cpp': 493, 'python': 460}


def sha_bytes(content):
    return hashlib.sha256(content).hexdigest()


def digest(path):
    value = hashlib.sha256()
    with path.open('rb') as source:
        for chunk in iter(lambda: source.read(1024 * 1024), b''):
            value.update(chunk)
    return value.hexdigest()


def read_json(relative):
    return json.loads((root / relative).read_text(encoding='utf-8-sig'))


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def candidates():
    files = set()
    for directory in ['src', 'scripts', 'public', 'electron', 'tests', 'python-voice-update']:
        parent = root / directory
        if not parent.exists():
            continue
        for path in parent.rglob('*'):
            relative = path.relative_to(root)
            if not path.is_file() or any(part in {'__pycache__', 'node_modules', '.git', 'private-baseline', 'private-backups', 'build'} for part in relative.parts):
                continue
            if path.name in {'ai-config.json', 'product.json'} or path.name.startswith('.env') or path.suffix in {'.pyc', '.pem', '.pfx', '.p12'}:
                continue
            if directory == 'src' and relative.parts[1] not in active_src:
                continue
            if directory == 'scripts' and path.name in historical_scripts:
                continue
            if directory == 'public' and relative.parts[1] != 'narration':
                continue
            if directory == 'python-voice-update' and not (
                    relative.parts[1] in {'reference', 'narration'} or
                    relative.as_posix() in {'python-voice-update/build.mjs', 'python-voice-update/page-bridge.js',
                                           'python-voice-update/installer.nsi', 'python-voice-update/patch-version.py',
                                           'python-voice-update/patch-layout.mjs', 'python-voice-update/patch-layout.test.mjs',
                                           'python-voice-update/.gitignore', 'python-voice-update/legacy-audio-manifest.json',
                                           'python-voice-update/legacy-yaoyao-audio-manifest.json'}):
                continue
            if path.name.endswith('.pending.json') or '.part.' in path.name:
                continue
            files.add(path)
    for name in ['package.json', 'pnpm-lock.yaml', 'pnpm-workspace.yaml', 'products.json', 'tsconfig.json',
                 'vite.config.ts', 'tailwind.config.cjs', 'postcss.config.cjs', 'index.html', '.gitignore',
                 'README.md', 'BUILD.md', 'PROVENANCE.md', 'VALIDATION.md', 'NARRATION.md', 'CURRICULUM.md', 'SPACING.md', 'requirements-build.txt', 'requirements-narration.txt']:
        path = root / name
        if path.is_file():
            files.add(path)
    for name in inherited_reports | current_reports | inherited_audio_reports | layout_reference_reports | revision_reports | spacing_reports | reference_reports | raw_derivation_reports:
        path = root / 'test-results' / name
        if path.is_file():
            files.add(path)
    if spacing_revision and (root / f'test-results/spacing-{spacing_revision}/ui.json').is_file():
        for language in read_json(f'test-results/spacing-{spacing_revision}/ui.json').get('languages', []):
            for name in language.get('screenshots', []):
                require(re.fullmatch(r'(?:c|cpp)-(?:760x540|1400x1000)-page\d+(?:-step\d+)?\.png', name), 'Unexpected spacing screenshot path')
                image = root / f'test-results/spacing-{spacing_revision}' / name
                require(image.is_file(), 'Spacing screenshot is missing')
                files.add(image)
    samples = root / 'test-results/xiaoxiao-samples'
    if samples.exists():
        files.update(path for path in samples.iterdir() if path.is_file() and path.suffix in {'.json', '.jsonl', '.mp3'})
    for language, product_version in [('c', version), ('cpp', version), ('python', python_version)]:
        path = root / 'releases' / f'{language}-{product_version}-manifest.json'
        if path.is_file():
            files.add(path)
    for language in ['c', 'cpp']:
        for resolution, pages in [('1400x1000', [20, 75, 114, 152]), ('760x540', [4, 20, 152])]:
            for page in pages:
                path = root / 'test-results/original-ui' / f'{language}-{resolution}-page-{page}.png'
                if path.is_file():
                    files.add(path)
    selected_layout = [
        'layout-baseline/cpp-1400x1000-page95-step-0.png',
        'layout-final/cpp-760x540-page95-step-1.png',
        'layout-final/cpp-760x540-page137-step-2.png',
        'layout-final/c-760x540-page117-step-0.png',
        'layout-final/python-1400x1000-page95-step-0.png',
        'layout-final/python-760x540-lab-result.png',
        'layout-final/cpp-760x540-lab-result.png',
    ]
    for name in selected_layout:
        path = root / 'test-results' / name
        if path.is_file():
            files.add(path)
    if course_revision:
        for language in ['c', 'cpp']:
            for page in [36, 87, 95, 97, 120, 126, 132, 138] if language == 'c' else [30, 40, 87, 116, 122, 124, 130, 132, 134, 138]:
                for state in ['step-0', 'step-1']:
                    path = root / f'test-results/course-{course_revision}/layout/{language}-760x540-page{page}-{state}.png'
                    if path.is_file():
                        files.add(path)
        for name in ['c-author-review.json', 'cpp-selected-review.json', 'c-author-760x540-page87-step0-top.png',
                     'c-author-760x540-page138-step0-top.png', 'c-author-760x540-page138-step5-bottom.png']:
            path = root / f'test-results/course-{course_revision}/layout/{name}'
            if path.is_file():
                files.add(path)
        for name in ['c-author-review.json', 'cpp-selected-review.json']:
            path = root / f'test-results/course-{course_revision}/layout/{name}'
            if path.is_file():
                for item in json.loads(path.read_text(encoding='utf-8-sig')).get('screenshots', []):
                    image_name = item.get('file', item.get('path', ''))
                    require(re.fullmatch(r'test-results/course-' + re.escape(course_revision) + r'/layout/(?:c-author|cpp-selected)-[A-Za-z0-9-]+\.png', image_name),
                            'Unexpected selected-review screenshot path')
                    image = root / image_name
                    require(image.is_file() and digest(image) == item.get('sha256'), 'Selected-review screenshot SHA mismatch')
                    files.add(image)
    return sorted(files)


def check_private_text(text, name):
    # Only a filename is reported. Never print a credential match or source excerpt.
    if re.search(r'(?:sk-[A-Za-z0-9_-]{20,}|hf_[A-Za-z0-9]{20,})', text):
        raise RuntimeError('Private credential found in archive text: ' + name)


def validate(files):
    names = {path.relative_to(root).as_posix() for path in files}
    required = {'src/main.tsx', 'src/original/App.tsx', 'src/lexer.ts', 'src/types.ts',
                'src/speech/player.ts', 'tests/player.test.mjs', 'NARRATION.md', 'CURRICULUM.md', 'postcss.config.cjs',
                'scripts/verify-original-courses.mjs', 'scripts/original-baseline.json',
                'scripts/collect-narration.mjs', 'scripts/verify-xiaoxiao-input.mjs',
                'scripts/generate-xiaoxiao-narration.py', 'scripts/publish-xiaoxiao-narration.mjs',
                'scripts/verify-xiaoxiao-narration.mjs', 'scripts/test-unified-narration-ui.cjs', 'requirements-narration.txt',
                'scripts/update-python-voice.ps1', 'scripts/verify-python-installation.cjs',
                'scripts/snapshot-python-narration-source.mjs', 'electron/ai-config.example.json',
                'python-voice-update/build.mjs', 'python-voice-update/page-bridge.js',
                'python-voice-update/installer.nsi', 'python-voice-update/patch-version.py',
                'python-voice-update/patch-layout.mjs', 'python-voice-update/patch-layout.test.mjs',
                'python-voice-update/reference/source-manifest.json', 'python-voice-update/legacy-audio-manifest.json',
                'python-voice-update/legacy-yaoyao-audio-manifest.json', 'test-results/yaoyao-narration-input.json'}
    if spacing_revision:
        required |= {'src/teaching-code-spacing.ts', 'src/original/components/TeachingTokens.tsx',
                     'tests/teaching-code-spacing.test.mjs', 'scripts/test-teaching-spacing.cjs',
                     'scripts/prepare-spacing-baseline.mjs', 'SPACING.md'}
    require(required <= names, 'Missing active source files: ' + ', '.join(sorted(required - names)))
    for name in names:
        parts = Path(name).parts
        forbidden = name.startswith(('src/courses/', 'src/legacy/', 'original-source/', 'vendor/', 'build/',
                                     'public/audio/', 'voice-baseline/')) or name in {'src/App.tsx', 'public/audio_map.json'}
        forbidden = forbidden or any(part.startswith('.env') or part in {'private-baseline', 'private-backups'} for part in parts)
        forbidden = forbidden or name.endswith(('/ai-config.json', '/app.asar', '/build-report.json'))
        forbidden = forbidden or name.startswith('python-voice-update/build/') or Path(name).suffix.lower() == '.exe'
        require(not forbidden, 'Forbidden archive path: ' + name)
    for path in files:
        if path.suffix.lower() in text_suffixes or path.name == '.gitignore':
            check_private_text(path.read_text(encoding='utf-8-sig'), path.relative_to(root).as_posix())
    return names


def validate_reference(names):
    prefix = 'python-voice-update/reference/'
    manifest = read_json(prefix + 'source-manifest.json')
    require(manifest.get('schemaVersion') == 1 and manifest.get('inventorySha256') == digest(root / 'test-results/python-narration-inventory.json'),
            'Python safe reference must identify the frozen narration inventory')
    records = manifest.get('files', [])
    require(len(records) == 27 and len({item['path'] for item in records}) == 27, 'Python safe reference must contain 27 unique source files')
    expected = {prefix + 'source-manifest.json'}
    for item in records:
        require(item['path'].endswith(('.ts', '.tsx')) and '..' not in Path(item['path']).parts, 'Unexpected Python reference path')
        name = prefix + item['path']
        require(name in names and item.get('byteIdentical') is True and digest(root / name) == item.get('sha256') and
                (root / name).stat().st_size == item.get('size'), 'Python source reference SHA/size mismatch: ' + name)
        expected.add(name)
    require({name for name in names if name.startswith(prefix)} == expected, 'Unlisted Python static reference file')


def validate_narration(files):
    if course_revision:
        return validate_revision_narration(files)
    names = {path.relative_to(root).as_posix() for path in files}
    input_file = 'test-results/xiaoxiao-narration-input.json'
    source = read_json(input_file)
    input_sha = digest(root / input_file)
    proof = read_json('test-results/xiaoxiao-narration-input-verification.json')
    require(source.get('schemaVersion') == 1 and source.get('voice') == voice_policy, 'Exact Xiaoxiao normal-rate voice policy required')
    require(proof.get('ok') and proof.get('inputSha256') == input_sha and proof.get('uniqueRawKeys') == 907 and
            proof.get('rawTextChanged') is False and proof.get('normalizationApplied') is False, 'Frozen raw-text input evidence mismatch')
    keys, entries = source.get('keys', []), source.get('entries', [])
    require(len(keys) == len(entries) == 907, 'All 907 raw narration strings are required')
    language_keys, expected_languages = {}, {}
    inventories = {**read_json('test-results/narration-inventory.json')['languages'],
                   **read_json('test-results/python-narration-inventory.json')['languages']}
    require(set(inventories) == {'c', 'cpp', 'python'}, 'All three source inventories are required')
    for language, inventory in inventories.items():
        raw = {item['text'] for item in inventory['texts']}
        require(inventory.get('pageCount') == 153 and len(raw) == language_counts[language], 'Static narration count/page mismatch: ' + language)
        language_keys[language] = raw
        for text in raw:
            expected_languages.setdefault(text, set()).add(language)
        slots = [(origin['page'], origin['optionIndex'], origin['category']) for item in inventory['texts'] for origin in item['sources']
                 if origin['category'] in {'quiz-correct-feedback', 'quiz-wrong-feedback'}]
        require(len(slots) == len({(page, option) for page, option, category in slots}) == 143 and
                len({page for page, option, category in slots}) == 47 and
                sum(category == 'quiz-correct-feedback' for page, option, category in slots) == 47,
                'Every original quiz option feedback must be inventoried: ' + language)
        item = proof['languages'][language]
        require(item.get('inventorySha256') == digest(root / item['inventory']) and item.get('allFeedbackKeysIncluded'), 'Inventory provenance mismatch: ' + language)
    require(len(expected_languages) == 907, 'Narration union must contain 907 exact strings')
    expected_ids = {}
    for key, entry in zip(keys, entries):
        text, identifier = key['key'], key['id']
        require(identifier == 'xiaoxiao-' + sha_bytes(text.encode('utf-8'))[:24], 'Narration ID must hash the unmodified UTF-8 string')
        require(entry == {'id': identifier, 'key': text, 'spokenText': text} and set(key['languages']) == expected_languages.get(text), 'Input entry raw text/language mismatch')
        require(identifier not in expected_ids, 'Duplicate narration ID')
        expected_ids[identifier] = text
    require({key['key'] for key in keys} == set(expected_languages), 'Input key union differs from reachable source strings')
    require(source.get('sourceInput') == 'test-results/yaoyao-narration-input.json' and
            source.get('sourceInputSha256') == digest(root / source['sourceInput']) == proof.get('sourceInputSha256'), 'Frozen input must identify its exact unmodified source-text input')
    previous = read_json(source['sourceInput'])
    require([(item['key'], item['languages']) for item in keys] == [(item['key'], item['languages']) for item in previous['keys']] and
            [(item['key'], item['spokenText']) for item in entries] == [(item['key'], item['spokenText']) for item in previous['entries']],
            'Xiaoxiao synthesis must use exactly the previous raw text and language mapping')

    generation = read_json('test-results/xiaoxiao-generation-verification.json')
    require(generation.get('ok') and generation.get('inputSha256') == input_sha and generation.get('sourceInputSha256') == source['sourceInputSha256'] and
            generation.get('voice') == voice_policy and generation.get('edgeTtsVersion') == '7.3.1' and
            generation.get('finalFailures') == 0, 'Actual Xiaoxiao synthesis evidence must pass')
    for field in ['entries', 'filesVerified', 'fullDecodePassed', 'nonSilent', 'rawTextExactMatches', 'voiceContractMatched']:
        require(generation.get(field) == 907, 'Generation evidence incomplete: ' + field)
    require(generation.get('generatorSha256') == digest(root / 'scripts/generate-xiaoxiao-narration.py'), 'Generation must use the archived generator')
    require(generation.get('requirementsSha256') == digest(root / 'requirements-narration.txt') and
            'edge-tts==7.3.1' in (root / 'requirements-narration.txt').read_text(encoding='utf-8'), 'Narration dependency must remain pinned to the verified version')
    require(generation.get('providerVoice', {}).get('ShortName') == voice_policy['speaker'] and
            generation.get('providerVoice', {}).get('SuggestedCodec') == 'audio-24khz-48kbitrate-mono-mp3', 'Provider descriptor must identify the actual requested Xiaoxiao voice')
    generated = {item['id']: item for item in generation.get('files', [])}
    require(set(generated) == set(expected_ids), 'Generation file IDs mismatch')
    require(all(item.get('spokenTextSha256') == sha_bytes(expected_ids[identifier].encode('utf-8')) and
                item.get('mp3') == identifier + '.mp3' and item.get('fullDecodePassed') and item.get('nonSilent') and
                item.get('sampleRate') == 24000 and item.get('channels') == 1
                for identifier, item in generated.items()), 'Every generated clip must retain exact-text provenance, full decode and non-silence evidence')

    publication = read_json('test-results/xiaoxiao-publication.json')
    verification = read_json('test-results/xiaoxiao-verification.json')
    require(publication.get('ok') and publication.get('inputSha256') == input_sha and publication.get('voice') == voice_policy and
            publication.get('uniqueGeneratedClips') == 907, 'Current Xiaoxiao publication must pass')
    require(verification.get('ok') and verification.get('inputSha256') == input_sha and verification.get('voice') == voice_policy,
            'Current full decode verification must identify the frozen input/voice')
    summary = verification.get('summary', {})
    require(summary.get('uniqueClips') == summary.get('fullyDecoded') == 907 and summary.get('productAudioCopies') == 1106 and
            summary.get('allQuizFeedbackOccurrences') == summary.get('newVoiceQuizFeedbackOccurrences') == 429 and
            summary.get('oldVoiceOrSystemEntries') == 0 and not verification.get('errors'), 'All published copies, clips and quiz feedbacks must pass')
    decoded = {item['id']: item for item in verification.get('files', [])}
    require(set(decoded) == set(expected_ids) and all(item.get('fullyDecoded') for item in decoded.values()), 'Complete MP3 frame decode evidence missing')
    products = publication.get('products', [])
    require({item.get('product') for item in products} == set(group_policy) and len(products) == 2, 'Two published resource groups required')
    manifests = {}
    for product in products:
        directory, languages, count = group_policy[product['product']]
        require(product.get('directory') == directory and set(product.get('languages', [])) == languages, 'Unexpected published resource directory')
        manifest_path = directory + '/manifest.json'
        require({manifest_path, directory + '/NOTICE.txt'} <= names, 'Current narration manifest and source notice must be archived')
        manifest = read_json(manifest_path)
        require(digest(root / manifest_path) == product.get('manifestSha256') and manifest.get('schemaVersion') == 1 and
                manifest.get('voice') == voice_policy and manifest.get('fallback') == fallback_policy, 'Published manifest voice/hash mismatch')
        expected_raw = set().union(*(language_keys[language] for language in languages))
        require(set(manifest.get('entries', {})) == expected_raw and len(expected_raw) == count and
                product.get('recordedKeys') == product.get('rawKeys') == count and product.get('systemKeys') == 0, 'All static keys must use new recordings')
        published = {item['id']: item for item in product.get('clips', [])}
        expected_paths = set()
        for text, item in manifest['entries'].items():
            identifier = 'xiaoxiao-' + sha_bytes(text.encode('utf-8'))[:24]
            file = 'narration/clips/' + identifier + '.mp3'
            name = directory + '/clips/' + identifier + '.mp3'
            require(item.get('mode') == 'recorded' and item.get('spokenText') == text and item.get('file') == file and name in names,
                    'Static narration must use exact raw-text Xiaoxiao recording')
            actual = digest(root / name)
            require(actual == item.get('sha256') == generated[identifier].get('sha256') == decoded[identifier].get('sha256') == published.get(identifier, {}).get('sha256'),
                    'Narration source/publication/full-decode SHA mismatch: ' + name)
            require(item.get('duration', 0) > 0 and published[identifier].get('bytes') == (root / name).stat().st_size and name in decoded[identifier].get('copies', []),
                    'Narration duration/size/copy evidence mismatch: ' + name)
            expected_paths.add(name)
        require({name for name in names if name.startswith(directory + '/clips/')} == expected_paths and len(published) == count,
                'Old or unlisted recordings must not be archived in current resources')
        manifests[product['product']] = product['manifestSha256']
    validate_reference(names)
    return {'voice': voice_policy, 'uniqueClips': 907, 'productAudioCopies': 1106,
            'cCppRawKeys': 646, 'pythonRawKeys': 460, 'systemKeys': 0, 'inputSha256': input_sha, 'manifestSha256': manifests}


def validate_revision_narration(files):
    prefix = f'test-results/course-{course_revision}/'
    source = read_json(prefix + 'narration-input.json')
    inventory = read_json(prefix + 'narration-inventory.json')
    plan = read_json(prefix + 'narration-plan.json')
    publication = read_json(prefix + 'narration-publication.json')
    verification = read_json(prefix + 'narration-verification.json')
    generation = read_json(prefix + 'narration-generation.json')
    input_sha = digest(root / (prefix + 'narration-input.json'))
    require(source.get('schemaVersion') == 2 and source.get('revision') == course_revision and source.get('voice') == voice_policy and
            source.get('inventory') == prefix + 'narration-inventory.json' and source.get('inventorySha256') == digest(root / source['inventory']),
            'Current course revision must use its own frozen raw-text input and inventory')
    require(source.get('sourceInput') == prefix + 'baseline/xiaoxiao-narration-input.json' and
            source.get('sourceInputSha256') == digest(root / source['sourceInput']), 'New text revision must identify its prior Xiaoxiao evidence')
    require(set(inventory.get('languages', {})) == {'c', 'cpp'} and inventory.get('sourceFiles'), 'Revision covers only C/C++ with source hashes')
    for item in inventory['sourceFiles']:
        current_sha = digest(root / item['file'])
        if current_sha != item['sha256'] and spacing_revision:
            spacing = read_json(f'test-results/spacing-{spacing_revision}/static.json')
            permitted = {'GenericWordSlide', 'GenericSentenceSlide', 'GenericEssaySlide', 'GenericLiteracyQuiz',
                         'GenericWordQuiz', 'GenericSentenceQuiz', 'GenericEssayQuiz', 'CodePurposeSlide', 'SmartShowcaseSlide'}
            require(item['file'].startswith('src/original/components/') and Path(item['file']).stem in permitted and
                    spacing.get('sourceHashes', {}).get(item['file']) == current_sha,
                    'Only audited teaching renderers may differ from inherited narration source: ' + item['file'])
        else:
            require(current_sha == item['sha256'], 'Course source changed after narration inventory: ' + item['file'])
    merged = {}
    for language in ['c', 'cpp']:
        data = inventory['languages'][language]
        require(data.get('pageCount') == 153, 'All 153 original page slots must remain')
        feedback = [(origin['page'], origin['optionIndex']) for item in data['texts'] for origin in item['sources']
                    if origin['category'] in {'quiz-correct-feedback', 'quiz-wrong-feedback'}]
        require(len(feedback) == len(set(feedback)) == 143 and len({page for page, option in feedback}) == 47, 'All current answer feedbacks required')
        for item in data['texts']:
            merged.setdefault(item['text'], []).append(language)
    expected = [{'key': text, 'id': 'xiaoxiao-' + sha_bytes(text.encode('utf-8'))[:24], 'languages': languages} for text, languages in merged.items()]
    require(source.get('keys') == expected and source.get('entries') == [{'id': item['id'], 'key': item['key'], 'spokenText': item['key']} for item in expected],
            'Every current key must retain its exact original text and content-derived ID')
    require(plan.get('ok') and plan.get('inputSha256') == input_sha and publication.get('ok') and publication.get('inputSha256') == input_sha and
            verification.get('ok') and verification.get('inputSha256') == input_sha and not verification.get('errors'), 'Current incremental generation/publication/verification must pass')
    for item in plan.get('historicalEvidence', []):
        require(digest(root / item['source']) == digest(root / item['snapshot']) == item['sha256'], 'Historical voice evidence bytes must be preserved')
    require(len(plan.get('historicalEvidence', [])) == 6, 'All six prior narration evidence snapshots required')
    require(generation.get('inputSha256') == input_sha and generation.get('voice') == voice_policy and
            generation.get('generatorSha256') == digest(root / 'scripts/generate-xiaoxiao-narration.py') and
            publication.get('generationSha256') == verification.get('generationSha256') == digest(root / (prefix + 'narration-generation.json')),
            'Archived generation rows must match the current input and publisher')
    rows = {item['id']: item for item in generation.get('records', [])}
    decoded = {item['id']: item for item in verification.get('files', [])}
    require(len(rows) == len(decoded) == len(expected) and set(rows) == set(decoded) == {item['id'] for item in expected}, 'All current generated/reused IDs required')
    current_manifest = read_json('public/narration/manifest.json')
    require(current_manifest.get('voice') == voice_policy and current_manifest.get('fallback') == fallback_policy and
            set(current_manifest.get('entries', {})) == set(merged), 'Current C/C++ manifest must contain only the current recorded keys')
    require(publication.get('manifestSha256') == verification.get('manifestSha256') == digest(root / 'public/narration/manifest.json'), 'Current narration manifest hash mismatch')
    for item in expected:
        row, clip, entry = rows[item['id']], decoded[item['id']], current_manifest['entries'][item['key']]
        require(row.get('key') == row.get('spokenText') == item['key'] and row.get('spokenTextSha256') == sha_bytes(item['key'].encode('utf-8')) and
                row.get('speaker') == voice_policy['speaker'] and row.get('synthesisRate') == '+0%' and row.get('playbackRate') == 1 and
                row.get('pitch') == '+0Hz' and row.get('volume') == '+0%' and row.get('edgeTtsVersion') == '7.3.1' and row.get('fullDecodePassed') and row.get('nonSilent'),
                'Every new/reused generation row must retain the exact text and Xiaoxiao contract')
        filename = 'public/narration/clips/' + item['id'] + '.mp3'
        require(entry.get('mode') == 'recorded' and entry.get('spokenText') == item['key'] and entry.get('file') == 'narration/clips/' + item['id'] + '.mp3' and
                digest(root / filename) == entry.get('sha256') == row.get('sha256') == clip.get('sha256'), 'Current MP3 copy hash mismatch')
        require((clip.get('reused') and clip.get('historicalFullDecode')) or
                (not clip.get('reused') and clip.get('fullyDecodedThisRevision') and clip.get('nonSilent')), 'New clips need current full decode; reused clips need prior proof')
    python_manifest = read_json('python-voice-update/narration/manifest.json')
    require(digest(root / 'python-voice-update/narration/manifest.json') == '992e522bf121f4ecc0c5aa75a1b582873959bc92d24a6fd071df0495560be196' and
            len(python_manifest['entries']) == 460 and python_manifest['voice'] == voice_policy and python_manifest['fallback'] == fallback_policy,
            'Python 1.0.5 narration must stay frozen')
    for entry in python_manifest['entries'].values():
        require(entry['mode'] == 'recorded' and digest(root / ('python-voice-update/' + entry['file'])) == entry['sha256'], 'Frozen Python audio changed')
    require(source.get('unchangedPython') == publication.get('unchangedPython') == verification.get('unchangedPython'), 'Python unchanged evidence must agree')
    all_product_ids = {item['id'] for item in expected} | {Path(entry['file']).stem for entry in python_manifest['entries'].values()}
    return {'voice': voice_policy, 'uniqueClips': len(all_product_ids), 'cCppUniqueClips': len(expected), 'productAudioCopies': len(expected) + 460,
            'cCppRawKeys': len(expected), 'pythonRawKeys': 460, 'systemKeys': 0, 'inputSha256': input_sha,
            'newClips': verification['summary']['newClips'], 'reusedClips': verification['summary']['reusedHashAndHistoricalDecode'],
            'manifestSha256': {'c-cpp': publication['manifestSha256'], 'python': digest(root / 'python-voice-update/narration/manifest.json')}}


def release_manifest(language):
    product_version = python_version if language == 'python' else version
    return read_json(f'releases/{language}-{product_version}-manifest.json')


def asar_hash(manifest):
    item = next((item for item in manifest['files'] if item['path'].replace('\\', '/') == 'resources/app.asar'), None)
    require(item is not None, 'Release manifest must include resources/app.asar')
    return item['sha256']


def inherited_course_manifest(language):
    if spacing_revision:
        return read_json(f'test-results/spacing-{spacing_revision}/baseline/{language}-{course_revision}-manifest.json')
    return release_manifest(language)


def validate_final_reports(narration):
    missing = [name for name in sorted(required_reports) if not (root / 'test-results' / name).is_file()]
    require(not missing, 'Final verification reports required: ' + ', '.join(missing))
    require(read_json('test-results/original-courses.json').get('ok') and read_json('test-results/original-spacing.json').get('ok'), 'Inherited original course/spacing evidence must pass')
    ui = read_json('test-results/original-ui.json')
    require(isinstance(ui, list) and {item.get('language') for item in ui} == {'c', 'cpp'} and all(item.get('pages') == 153 for item in ui), 'Inherited UI must retain both 153-page products')
    installation = read_json('test-results/installation-1.1.0-verification.json').get('results', [])
    require({item.get('language') for item in installation} == {'c', 'cpp'} and all(item.get('installedRuntime') and item.get('uninstalled') and item.get('userFilePreserved') for item in installation), 'Inherited installer engine evidence must pass')
    baseline = read_json('test-results/python-installed-baseline.json')
    require(baseline.get('ok') and baseline.get('package', {}).get('version') == '1.0.2' and baseline.get('audio', {}).get('matchedWithOriginalSource') == 1016,
            'Actual installed Python 1.0.2 baseline must be verified')
    legacy = read_json('python-voice-update/legacy-audio-manifest.json')
    legacy_files = legacy.get('files', [])
    require(legacy.get('schemaVersion') == 1 and len(legacy_files) == len({item['path'] for item in legacy_files}) == 1016 and
            all(re.fullmatch(r'resources/app\.asar\.unpacked/dist/audio/[a-f0-9]{8}\.mp3', item['path']) and item.get('size', 0) > 0 and
                re.fullmatch(r'[a-f0-9]{64}', item.get('sha256', '')) for item in legacy_files), 'Only 1016 fixed original audio paths may be considered for backup')
    legacy_rows = sorted((item['path'].removeprefix('resources/app.asar.unpacked/dist'), item['sha256']) for item in legacy_files)
    legacy_aggregate = sha_bytes('\n'.join(url + '\0' + sha for url, sha in legacy_rows).encode('utf-8'))
    require(legacy_aggregate == baseline['audio'].get('aggregatePathAndSha256'), 'Legacy file backup list must match the actual original Python recordings')
    previous_voice = read_json('python-voice-update/legacy-yaoyao-audio-manifest.json')
    previous_files = previous_voice.get('files', [])
    previous_input = read_json('test-results/yaoyao-narration-input.json')
    expected_previous = {'resources/app.asar.unpacked/dist/narration/clips/' + item['id'] + '.mp3'
                         for item in previous_input['keys'] if 'python' in item['languages']}
    require(previous_voice.get('schemaVersion') == 1 and previous_voice.get('sourceVersion') == '1.0.3' and
            previous_voice.get('sourceVoice', {}).get('speaker') == 'Microsoft Yaoyao' and len(previous_files) == 460 and
            {item['path'] for item in previous_files} == expected_previous and
            all(item.get('size', 0) > 0 and re.fullmatch(r'[a-f0-9]{64}', item.get('sha256', '')) for item in previous_files),
            'Prior Python Yaoyao cleanup list must cover exactly its 460 known raw-text recordings')

    installed = read_json('test-results/official-installation.json')
    results = installed.get('results', [])
    require(installed.get('installedForUser') and {item.get('language') for item in results} == {'c', 'cpp'}, 'Both final C/C++ installed products must be verified')
    for item in results:
        manifest = release_manifest(item['language'])
        require(item.get('version') == version and item.get('pages') == 153 and item.get('filesVerified') == len(manifest['files']) and
                item.get('manifestMatched') and item.get('launched'), 'Installed C/C++ products must match the current manifest/version')
    shortcuts = read_json('test-results/desktop-shortcuts.json')
    require(isinstance(shortcuts, list) and {item.get('language') for item in shortcuts} == {'c', 'cpp'} and
            all(item.get('version') == version and item.get('target') and item.get('icon') for item in shortcuts), 'Both current C/C++ shortcuts must be verified')

    python = read_json('test-results/python-official-installation.json')
    manifest = release_manifest('python')
    require(python.get('ok') and not python.get('errors') and python.get('version') == python_version and python.get('pages') == 153 and python.get('filesVerified') == len(manifest['files']) and
            python.get('manifestMatched') and python.get('launched') and python.get('asarSha256') == asar_hash(manifest) and
            python.get('narrationManifestSha256') == narration['manifestSha256']['python'] and
            python.get('payloadManifestSha256') == digest(root / f'releases/python-{python_version}-manifest.json'),
            'Actual Python update must match its final manifest/ASAR/voice')
    require(python.get('shortcut', {}).get('target') and python.get('shortcut', {}).get('icon') and python.get('deployment') == 'in-place-files' and
            python.get('registryModified') is False, 'Python in-place deployment and existing shortcut evidence required')
    require(python.get('legacyAudio', {}).get('originalRecordingsRemaining') == 0 and
            python.get('legacyAudio', {}).get('yaoyaoRecordingsRemaining') == 0, 'Known obsolete Python recordings must no longer be active files')
    require(python.get('yaoyaoCleanupManifestSha256') == digest(root / 'python-voice-update/legacy-yaoyao-audio-manifest.json') and
            python.get('yaoyaoReleaseManifestSha256') == previous_voice.get('sourceManifestSha256'), 'Actual installation must identify the same prior-voice cleanup metadata')
    require(python.get('directory') == baseline.get('directory') and python.get('shortcut', {}).get('target') == baseline.get('shortcut', {}).get('target') and
            python.get('shortcut', {}).get('path') == baseline.get('shortcut', {}).get('path'), 'Python update must preserve the real installed directory and Public Desktop shortcut')
    guards = manifest.get('voicePatchGuards', {})
    ranges, segments = guards.get('guardedBundleRanges', []), guards.get('unchangedBundleSegments', [])
    require(len(ranges) >= 50 and len(segments) == len(ranges) + 1 and
            all(re.fullmatch(r'[a-f0-9]{64}', item.get('sha256', '')) for item in segments),
            'Python layout patch must retain audited ranges and unchanged segment hashes')
    require(manifest.get('product', {}).get('version') == python_version and guards.get('onlyGuardedVoiceAndLayoutRangesChanged') and
            guards.get('courseDataAndAIByteIdentical') and guards.get('layoutUpdated') and guards.get('legacyAudioMapAndVoiceRouterRemoved') and
            guards.get('otherOriginalFilesByteIdentical') == 2931 and
            guards.get('playerSourceSha256') == digest(root / 'src/speech/player.ts'), 'Python release must preserve non-voice source and use the current player')
    build = read_json('test-results/python-voice-build.json')
    require(build.get('ok') and build.get('readyForPlayback') and build.get('version') == python_version and
            build.get('asarSha256') == asar_hash(manifest) and build.get('guards') == guards and
            build.get('narration', {}).get('manifestSha256') == narration['manifestSha256']['python'],
            'Safe Python build evidence must identify the final unchanged non-voice files, ASAR and narration')
    native = build.get('nativeVersion', {})
    require(native.get('fileVersion') == python_version + '.0' and native.get('productVersion') == python_version and
            native.get('iconResourcesUnchanged'), 'Python native EXE version must be current and its original icon unchanged')
    layout = build.get('layout', {})
    if spacing_revision:
        require(layout == manifest.get('layout') and
                layout.get('autoFitSourceSha256') == '4379953ce3f4d503cd384c05028ead1467f3d0ea3739b1facc6a2b3646eb997d' and
                layout.get('stylesheetSha256') == 'e597988604865727fa87e4124e01966581ba4b850d30cb4a6855671ff3628f3b',
                'Unchanged Python retains its frozen 1.0.5 layout provenance, not the new C/C++ spacing stylesheet')
    else:
        require(layout.get('autoFitSourceSha256') == digest(root / 'src/original/components/AutoFitScale.tsx') and
                layout.get('stylesheetSha256') == digest(root / 'src/original/components/course-layout.css'),
                'Python must reuse the current shared AutoFit and stylesheet')

    ui = read_json('test-results/xiaoxiao-ui.json')
    languages = ui.get('languages', [])
    require(ui.get('ok') and not ui.get('errors') and len(languages) == 3 and {item.get('language') for item in languages} == {'python', 'c', 'cpp'} and
            ui.get('voice') == voice_policy and ui.get('inputSha256') == digest(root / 'test-results/xiaoxiao-narration-input.json'), 'Inherited complete Xiaoxiao UI products must pass')
    for item in languages:
        language = item['language']
        current_version = '1.0.4' if language == 'python' else '1.2.3'
        baseline_publication = read_json('test-results/xiaoxiao-publication.json')
        expected_sha = next(product['manifestSha256'] for product in baseline_publication['products'] if product['product'] == ('python' if language == 'python' else 'c-cpp'))
        snapshot = read_json(f'test-results/layout-baseline/{language}/snapshot.json')
        require(item.get('passed') and item.get('product', {}).get('version') == current_version and item.get('voice') == voice_policy and
                item.get('manifestSha256') == expected_sha and item.get('asarSha256') == snapshot.get('asarSha256'),
                'Inherited complete voice UI must match its original pre-layout version/ASAR and the unchanged current audio manifest')
        require(item.get('staticCoverage') == {'rawKeys': language_counts[language], 'allRecorded': True, 'allExactRawText': True}, 'UI static key coverage mismatch')
        feedback = item.get('quizFeedbackAudit', {})
        cases = feedback.get('cases', [])
        require(feedback.get('quizPages') == 47 and feedback.get('optionFeedbacks') == feedback.get('nativeStarts') == len(cases) == 143 and
                len({(case['page'], case['option']) for case in cases}) == 143 and all(case.get('nativeStart') and case.get('source') == 'recorded' and
                case.get('voiceId') == voice_policy['id'] for case in cases), 'Every quiz feedback must start the actual new recording: ' + language)
        inventory_path = 'test-results/python-narration-inventory.json' if language == 'python' else 'test-results/narration-inventory.json'
        inventory = read_json(inventory_path)['languages'][language]
        expected_cases = {(origin['page'], origin['optionIndex'], record['text'], origin['correct']) for record in inventory['texts']
                          for origin in record['sources'] if origin['category'] in {'quiz-correct-feedback', 'quiz-wrong-feedback'}}
        actual_cases = {(case['page'], case['option'], case['text'], case['correct']) for case in cases}
        require(actual_cases == expected_cases, 'UI quiz cases must match every exact source feedback position: ' + language)
        natural = item.get('representativeNaturalPlayback', [])
        require(len(natural) == 13 and all(case.get('nativeStart') and case.get('nativeEnd') and case.get('rate') == 1 and case.get('voiceId') == voice_policy['id'] for case in natural),
                'All representative entrances must naturally complete at normal speed: ' + language)
        require(item.get('systemSpeechCalls') == 0 and not item.get('httpRequestsBlocked') and not item.get('pageErrors') and item.get('offline') and
                (item.get('rapidClicks') or {}).get('passed') and (item.get('pageChangeCancellation') or {}).get('passed'), 'Recorded-only offline flow and cancellation must pass: ' + language)
    if course_revision:
        validate_course_revision_reports(narration)
        if spacing_revision:
            validate_spacing_reports(narration)
    else:
        validate_layout_reports(narration)


def validate_course_revision_reports(narration):
    prefix = f'test-results/course-{course_revision}/'
    unchanged_python = read_json(prefix + 'unchanged-python.json')
    require(unchanged_python.get('ok') and unchanged_python.get('version') == python_version and
            unchanged_python.get('asarSha256') == asar_hash(release_manifest('python')) and
            unchanged_python.get('narrationManifestSha256') == narration['manifestSha256']['python'] and
            unchanged_python.get('setupSha256') == digest(root / f'releases/像学习语文一样学习编程 Setup {python_version}.exe'),
            'Python application, released installer and narration must remain unchanged')
    for language in ['c', 'cpp']:
        require(read_json(prefix + language + '-features.json').get('ok'), 'Final beginner feature/boundary report required: ' + language)
    beginner = read_json(prefix + 'beginner-audit.json')
    require(beginner.get('scanCompleted') and not beginner.get('codeFindings'), 'Final beginner audit must contain no remaining advanced code constructs')
    for name, value in beginner.get('sourceHashes', {}).items():
        require(digest(root / name) == value, 'Beginner content audit is stale: ' + name)
    course = read_json(prefix + 'course-verification.json')
    require(course.get('ok') and course.get('summary', {}).get('examplesPassed') == 92 and
            course.get('summary', {}).get('associations') == 92 and course.get('summary', {}).get('associationFailures') == 0,
            'Current 92 programs and their same-ID teaching/purpose associations must pass')
    for name, value in course.get('sourceHashes', {}).items():
        if name.startswith('src/'):
            require(digest(root / name) == value, 'Current course evidence is stale: ' + name)
    inventory = read_json(prefix + 'narration-inventory.json')
    voice_ui = read_json(prefix + 'narration-ui.json')
    require(voice_ui.get('ok') and not voice_ui.get('errors') and voice_ui.get('revision') == course_revision and
            voice_ui.get('inputSha256') == narration['inputSha256'] and
            {item['language'] for item in voice_ui.get('languages', [])} == {'c', 'cpp'}, 'Both current C/C++ voice UIs must pass')
    for language in ['c', 'cpp']:
        expected_sha = asar_hash(inherited_course_manifest(language))
        report = read_json(prefix + f'layout/{language}.json')
        coverage = report.get('coverage', {})
        require(report.get('ok') and report.get('scanCompleted') and report.get('version') == course_revision and report.get('asarSha256') == expected_sha and
                report.get('inventorySha256') == digest(root / (prefix + 'narration-inventory.json')) and not report.get('findings') and
                not report.get('errors') and not report.get('httpRequests') and not report.get('pageErrors'), 'Current C/C++ full layout matrix must match shipped stage')
        require(coverage.get('requestedPages') == list(range(1, 154)) and coverage.get('resolutions') == ['760x540', '1000x700', '1400x1000', '1920x1080'] and
                coverage.get('stateMeasurements') == len(report.get('states', [])) == 2340 and coverage.get('quizFeedbacks') == 572 and
                coverage.get('stepStates') == coverage.get('stepButtonsReachable') == 1524 and all(s.get('helpRect') and s.get('helpChecks', 0) > 0 for s in report['states']),
                'Every page, step, quiz feedback and floating FAQ requires current four-size coverage')
        smoke = read_json(prefix + f'layout/interactions-{language}.json')
        require(smoke.get('ok') and smoke.get('asarSha256') == expected_sha and smoke.get('manifestSha256') == narration['manifestSha256']['c-cpp'] and
                len(smoke.get('sizes', [])) == 4 and all(s.get('passed') for s in smoke['sizes']), 'Current four-size interaction smoke required')
        cases = smoke.get('ipcFeatureCases', [])
        require({c.get('id') for c in cases} == {13, 10 if language == 'c' else 9} and all(c.get('passed') and c.get('event') == 'exit' and c.get('code') == 0 and
                c.get('sourceFileSha256') == digest(root / c['sourceFile']) for c in cases), 'Current file and language-feature examples must pass the real application runner IPC')
        item = next(item for item in voice_ui['languages'] if item['language'] == language)
        require(item.get('passed') and item.get('product', {}).get('version') == course_revision and item.get('asarSha256') == expected_sha and
                item.get('manifestSha256') == narration['manifestSha256']['c-cpp'] and item.get('voice') == voice_policy and
                item.get('staticCoverage', {}).get('rawKeys') == len(inventory['languages'][language]['texts']), 'Current voice UI identity/static coverage mismatch')
        feedback = item.get('quizFeedbackAudit', {})
        expected = {(source['page'], source['optionIndex'], record['text'], source['correct']) for record in inventory['languages'][language]['texts']
                    for source in record['sources'] if source['category'] in {'quiz-correct-feedback', 'quiz-wrong-feedback'}}
        actual = {(case['page'], case['option'], case['text'], case['correct']) for case in feedback.get('cases', [])}
        require(feedback.get('nativeStarts') == 143 and actual == expected and all(c.get('nativeStart') and c.get('source') == 'recorded' and c.get('voiceId') == voice_policy['id'] for c in feedback['cases']),
                'Every current answer feedback must start its actual recording')
        require(len(item.get('representativeNaturalPlayback', [])) >= 3 and all(c.get('nativeStart') and c.get('nativeEnd') and c.get('rate') == 1 for c in item['representativeNaturalPlayback']) and
                item.get('systemSpeechCalls') == 0 and not item.get('httpRequestsBlocked') and not item.get('pageErrors') and
                item.get('rapidClicks', {}).get('passed') and item.get('pageChangeCancellation', {}).get('passed'), 'Current normal-speed playback and cancellation checks required')
    python_layout = read_json('test-results/layout-final/python.json')
    require(python_layout.get('scanCompleted') and not python_layout.get('findings') and python_layout.get('version') == python_version and
            python_layout.get('asarSha256') == asar_hash(release_manifest('python')) and python_layout.get('coverage', {}).get('stateMeasurements') == 2340,
            'Unchanged Python retains its exact 1.0.5 layout-stage evidence; no new Python UI claim')


def validate_spacing_reports(narration):
    prefix = f'test-results/spacing-{spacing_revision}/'
    baseline, static, ui = (read_json(prefix + name + '.json') for name in ['baseline', 'static', 'ui'])
    require(baseline.get('ok') and baseline.get('version') == spacing_revision and baseline.get('inheritedVersion') == course_revision,
            'Spacing release requires its immutable prior-version snapshots')
    for item in baseline.get('snapshots', []):
        require(digest(root / item['snapshot']) == item['sha256'], 'Inherited release/installation snapshot changed')
    require(len(baseline.get('snapshots', [])) == 4, 'Both old release manifests and official/shortcut reports must be frozen')
    for item in baseline.get('inherited', []) + baseline.get('dataHashes', []) + baseline.get('manifests', []):
        require(digest(root / item['file']) == item['sha256'], 'Inherited course/audio evidence changed during spacing fix')
    require(len(baseline.get('dataHashes', [])) == 26 and len(baseline.get('manifests', [])) == 2,
            'Every C/C++ data file and both audio manifests must be unchanged')
    require(static.get('ok') and not static.get('errors') and static.get('version') == spacing_revision and
            len(static.get('fixtures', [])) >= 7 and all(case.get('passed') and case.get('actual') == case.get('expected') for case in static['fixtures']),
            'Independent spacing lexeme and exact-byte fixtures must pass')
    for name, value in static.get('sourceHashes', {}).items():
        require(digest(root / name) == value, 'Spacing render/data source changed after audit: ' + name)
    required_sources = {'src/teaching-code-spacing.ts', 'src/original/components/TeachingTokens.tsx'}
    require(required_sources <= set(static.get('sourceHashes', {})), 'Shared spacing source must be in the static rendering audit')
    require({item['language'] for item in static.get('languages', [])} == {'c', 'cpp'} and
            all(item.get('passed') and item.get('serverStates') == 428 and item.get('inactiveShowcase', {}).get('serverStates') == 230 for item in static['languages']),
            'Every active component record/state and inactive Showcase rendering requires independent lexical verification')
    speech = static.get('speechInventory', {})
    require(speech.get('unchangedRawKeys') and speech.get('allFeedbacksUnchanged') and speech.get('counts') == {'c': 501, 'cpp': 476} and
            speech.get('file') == prefix + 'reachable-narration.json' and speech.get('sha256') == digest(root / speech['file']),
            'Spacing changes must preserve every exact raw speech key')
    old = read_json(f'test-results/course-{course_revision}/narration-inventory.json')
    current = read_json(speech['file'])
    for language in ['c', 'cpp']:
        require(sorted(item['text'] for item in old['languages'][language]['texts']) == sorted(item['text'] for item in current['languages'][language]['texts']),
                'Current exact narration inventory differs from inherited text')
    require(ui.get('ok') and not ui.get('errors') and ui.get('version') == version and
            ui.get('staticReportSha256') == digest(root / (prefix + 'static.json')) and
            {item['language'] for item in ui.get('languages', [])} == {'c', 'cpp'}, 'Current native DOM spacing suite must pass')
    for item in ui['languages']:
        require(item.get('passed') and item.get('version') == version and item.get('asarSha256') == asar_hash(release_manifest(item['language'])) and
                item.get('manifestSha256') == narration['manifestSha256']['c-cpp'] and not item.get('pageErrors') and not item.get('httpRequests') and item.get('systemCalls') == 0,
                'Spacing UI must identify the shipped current ASAR and unchanged recorded-only voice')
        require([page['page'] for page in item.get('pages', [])] == list(range(1, 154)) and len(item.get('targetStates', [])) >= 26,
                'All native initial page states plus targeted first/last states are required')
        require(any(value.get('count', 0) > 0 for value in item.get('spaces', [])) and
                all(value.get('minWidth') is None or value['minWidth'] > .1 for value in item['spaces']), 'Inserted ASCII spaces require nonzero physical text ranges')
        require(len(item.get('narration', [])) == 3 and all(value.get('nativeStart') and value.get('voiceId') == voice_policy['id'] for value in item['narration']),
                'Token, line and answer-feedback recorded-media routes require current native starts')


def validate_layout_reports(narration):
    summary = read_json('test-results/layout-final-summary.json')
    require(summary.get('ok') and summary.get('phase') == 'final' and len(summary.get('languages', [])) == 3,
            'Final three-language layout summary must pass')
    urls = {'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/' + name for name in
            ['pyodide-lock.json', 'pyodide.asm.wasm', 'python_stdlib.zip', 'pyodide.asm.js']}
    expected_sizes = ['760x540', '1000x700', '1400x1000', '1920x1080']
    for item in summary['languages']:
        language = item['language']
        require(language in language_counts and item.get('layoutPassed') and item.get('actionableRecords') == 0,
                'Each final language must have no actionable layout finding')
        report = read_json(item['sourceReport'])
        current_version = python_version if language == 'python' else version
        require(item.get('sourceReportSha256') == digest(root / item['sourceReport']) and report.get('scanCompleted') and
                report.get('version') == current_version and report.get('asarSha256') == asar_hash(release_manifest(language)) and
                not report.get('findings') and not report.get('errors'), 'Final geometry report must bind the current shipped ASAR')
        coverage = report.get('coverage', {})
        require(coverage.get('requestedPages') == list(range(1, 154)) and coverage.get('resolutions') == expected_sizes and
                coverage.get('basePages') == 612 and coverage.get('stateMeasurements') == len(report.get('states', [])) == 2340 and
                coverage.get('quizFeedbacks') == 572 and coverage.get('stepStates') == coverage.get('stepButtonsReachable') == 1524 and
                all(state.get('helpRect') and state.get('helpChecks', 0) > 0 for state in report['states']),
                'Complete four-size page/step/feedback and floating FAQ coverage required')
        if language == 'python':
            require(all(url in urls for url in report.get('httpRequests', [])) and
                    all(re.search(r'^Failed to fetch$|importScripts.*pyodide', error) for error in report.get('pageErrors', [])) and
                    item.get('runtimeDependencyBoundary', {}).get('fullPythonRuntimeVerified') is False,
                    'Only the preserved blocked original Pyodide dependency boundary may be excluded from layout pass')
        else:
            require(report.get('ok') and not report.get('pageErrors') and not report.get('httpRequests'), 'C/C++ layout runtime must be error-free')
        evidence = item.get('interactions', {})
        smoke = read_json(evidence['report'])
        require(evidence.get('sha256') == digest(root / evidence['report']) and smoke.get('ok') and smoke.get('version') == current_version and
                smoke.get('asarSha256') == report['asarSha256'] and smoke.get('manifestSha256') == narration['manifestSha256']['python' if language == 'python' else 'c-cpp'] and
                [s['size'] for s in smoke['sizes']] == expected_sizes and all(s.get('passed') for s in smoke['sizes']),
                'Current four-size menu/help/editor/result smoke must pass')
        routes = smoke.get('voiceRouting', [])
        require(len(routes) == 3 and all(s.get('nativeStart') and s.get('source') == 'recorded' and s.get('voiceId') == voice_policy['id'] and
                s.get('rate') == 1 for s in routes) and sum(s.get('nativeEnd') is True for s in routes) == 1,
                'Three representative real recorded routes and one natural completion required per current product')


def validate_reachable_source():
    current_arguments = ['--output', f'test-results/course-{course_revision}/narration-inventory.json'] if course_revision else []
    for arguments in [current_arguments, ['--python-reference']]:
        result = subprocess.run(['node', 'scripts/collect-narration.mjs', *arguments, '--dry-run'],
                                cwd=root, capture_output=True, text=True, encoding='utf-8', timeout=60)
        require(result.returncode == 0, 'Current reachable source no longer matches the frozen narration inventory')
        require(json.loads(result.stdout).get('matchesFrozenRawKeys') is True, 'Collector dry-run must confirm exact frozen strings')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--list', action='store_true', help='Scan safe candidate sources without creating a ZIP')
    args = parser.parse_args()
    files = candidates()
    names = validate(files)
    validate_reference(names)
    if args.list:
        print(json.dumps({'archive': str(destination), 'cCppVersion': version, 'pythonVersion': python_version,
                          'sourceFiles': len(files), 'sourceBytes': sum(path.stat().st_size for path in files),
                          'cCppNarrationFiles': sum(name.startswith('public/narration/clips/') for name in names),
                          'pythonNarrationFiles': sum(name.startswith('python-voice-update/narration/clips/') for name in names),
                          'pythonSafeReferenceFiles': sum(name.startswith('python-voice-update/reference/') for name in names),
                          'missingFinalReports': sorted(name for name in required_reports if not (root / 'test-results' / name).is_file()),
                          'excluded': ['private AI configuration', 'original-source', 'Python private-baseline/private-backups/build/ASAR/Setup/build-report',
                                       'vendor/runtime/compiler/node_modules', 'old voice-baseline and Qwen/hybrid/Yaoyao audio', 'unlisted historical reports']}, ensure_ascii=False, indent=2))
        return
    missing = [name for name in sorted(required_reports) if not (root / 'test-results' / name).is_file()]
    require(not missing, 'Final verification reports required: ' + ', '.join(missing))
    narration = validate_narration(files)
    validate_final_reports(narration)
    validate_reachable_source()
    require(sum(name.startswith('test-results/original-ui/') and name.endswith('.png') for name in names) == 14, 'All 14 selected inherited screenshots are required')
    entries = [{'path': path.relative_to(root).as_posix(), 'size': path.stat().st_size, 'sha256': digest(path)} for path in files]
    destination.parent.mkdir(parents=True, exist_ok=True)
    temporary = destination.with_suffix('.zip.part')
    prefix = 'programming-learning/'
    contents = {'schemaVersion': 1, 'version': version, 'pythonVoiceUpdateVersion': python_version, 'edition': 'original-153-pages',
                'narration': narration, 'reachableSourceCollectorDryRunMatched': True,
                'pythonSourceScope': 'safe-voice-and-layout-patch-and-static-reference; private original 1.0.2 baseline required to rebuild Python',
                'evidence': {'inheritedVersion': '1.1.0', 'inheritedReports': sorted(inherited_reports),
                             'inheritedCompleteAudioUiVersions': {'c': '1.2.3', 'cpp': '1.2.3', 'python': '1.0.4'},
                             'inheritedCompleteAudioUiReports': sorted(inherited_audio_reports),
                             'audioAssetsRegeneratedThisRelease': bool(course_revision and not spacing_revision and narration.get('newClips')),
                             'audioSynthesisScope': 'none; unchanged 1.3.0 C/C++ and Python-1.0.5 assets' if spacing_revision else 'new-C-and-Cpp-text-only; Python-1.0.5-assets-unchanged' if course_revision else 'none; unchanged prior Xiaoxiao assets',
                             'pythonRetestedThisRelease': False if course_revision else True,
                             'layoutReferenceReports': sorted(layout_reference_reports),
                             'currentCourseRevisionReports': [] if spacing_revision else sorted(revision_reports),
                             'inheritedCourseRevision': course_revision if spacing_revision else None,
                             'inheritedCourseRevisionReports': sorted(revision_reports) if spacing_revision else [],
                             'currentSpacingReports': sorted(spacing_reports),
                             'pythonReferenceVersion': '1.0.2', 'pythonReferenceReports': sorted(reference_reports),
                             'rawTextDerivationReports': sorted(raw_derivation_reports),
                             'currentCAndCppVersion': version, 'currentPythonVersion': python_version,
                             'currentReports': sorted({'official-installation.json', 'desktop-shortcuts.json'} | spacing_reports) if spacing_revision else sorted((current_reports - {name for name in current_reports if name.startswith('layout-') or name in {'xiaoxiao-generation-verification.json', 'xiaoxiao-publication.json', 'xiaoxiao-verification.json'}}) | revision_reports) if course_revision else sorted(current_reports),
                             'inheritedLayoutReports': sorted(name for name in current_reports if name.startswith('layout-')) if course_revision else [],
                             'inheritedNarrationAssetReports': ['xiaoxiao-generation-verification.json', 'xiaoxiao-publication.json', 'xiaoxiao-verification.json'] if course_revision else [],
                             'historicalVoicesExcluded': ['1.2.0 Qwen', '1.2.1 original-recording/system hybrid', '1.2.2 Yaoyao']}, 'files': entries}
    try:
        with zipfile.ZipFile(temporary, 'w', compression=zipfile.ZIP_DEFLATED, compresslevel=6) as output:
            for path in files:
                output.write(path, prefix + path.relative_to(root).as_posix())
            output.writestr(prefix + 'SOURCE-CONTENTS.json', json.dumps(contents, ensure_ascii=False, indent=2))
        with zipfile.ZipFile(temporary) as archive:
            require(archive.testzip() is None, 'Source ZIP CRC verification failed')
            require(len(archive.namelist()) == len(entries) + 1 and len(set(archive.namelist())) == len(entries) + 1, 'Source ZIP entry set mismatch')
            for entry in entries:
                name = entry['path']
                content = archive.read(prefix + name)
                require(len(content) == entry['size'] and sha_bytes(content) == entry['sha256'], 'Source ZIP SHA/size verification failed: ' + name)
                if Path(name).suffix.lower() in text_suffixes or Path(name).name == '.gitignore':
                    check_private_text(content.decode('utf-8-sig'), name)
            check_private_text(archive.read(prefix + 'SOURCE-CONTENTS.json').decode('utf-8'), 'SOURCE-CONTENTS.json')
        temporary.replace(destination)
    except Exception:
        if temporary.exists():
            temporary.unlink()
        raise
    print(json.dumps({'archive': str(destination), 'files': len(entries) + 1, 'bytes': destination.stat().st_size,
                      'sha256': digest(destination), 'crcPassed': True, 'allSourceEntryHashesPassed': True, 'secretScanPassed': True}, ensure_ascii=False, indent=2))


if __name__ == '__main__':
    main()
