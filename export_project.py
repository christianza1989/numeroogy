#!/usr/bin/env python3
"""
Project Exporter Script
Exports all relevant project files into a single text file for sharing with AI models.
"""

import os
import sys
from pathlib import Path

# UI component library path exclusions
exclude_path_starts = [
    'src/components/ui/',
    'src/components/ui-custom/',
    'articlegenerator/src/components/ui/',
    'articlegenerator/src/components/ui-custom/',
]

def should_include_file(filepath):
    """
    Determine if a file should be included in the export.
    """
    # Get the file extension and name
    file_path = Path(filepath)
    file_name = file_path.name
    file_extension = file_path.suffix.lower()

    # Exclude certain directories
    exclude_dirs = {
        'node_modules', '.git', '__pycache__', '.next', 'dist', 'build',
        '.vscode', '.idea', 'coverage', '.nyc_output', 'logs', '.next',
        'wordpress-data', 'functions/lib', 'articlegenerator/.next', 'public'
    }

    # Check if any parent directory is in exclude list
    for part in file_path.parts:
        if part in exclude_dirs:
            return False

    # Exclude UI component libraries (simplified path checking)
    norm_path = os.path.normpath(str(file_path)).replace('\\', '/')
    for exclude_start in exclude_path_starts:
        if norm_path.startswith(exclude_start):
            return False

    # Exclude specific file types (binaries and temporary files)
    exclude_extensions = {
        '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.woff', '.woff2',
        '.ttf', '.eot', '.pyc', '.pyo', '.log', '.tmp', '.cache',
        '.zip', '.tar', '.gz', '.rar', '.7z', '.exe', '.dll', '.so',
        '.dylib', '.class', '.jar'
    }

    # Exclude specific files
    exclude_files = {
        '.DS_Store', 'Thumbs.db', 'desktop.ini', '.gitignore',
        'export_project.py',  # Don't include this script itself
        'pnpm-lock.yaml',
        'package-lock.json', # Large generated lock file
        'tsconfig.tsbuildinfo'  # Build info file
    }

    if file_extension in exclude_extensions:
        return False

    if file_name in exclude_files:
        return False

    # Include text-based files
    include_extensions = {
        '.js', '.jsx', '.ts', '.tsx', '.py', '.java', '.cpp', '.c', '.h',
        '.cs', '.php', '.rb', '.go', '.rs', '.swift', '.kt', '.scala',
        '.html', '.htm', '.css', '.scss', '.sass', '.less', '.json',
        '.xml', '.yaml', '.yml', '.toml', '.ini', '.cfg', '.conf',
        '.md', '.txt', '.rst', '.tex', '.sh', '.bash', '.zsh', '.fish',
        '.ps1', '.bat', '.cmd', '.dockerfile', '.makefile', 'Makefile',
        '.gitignore', '.env', '.env.local', '.env.example'
    }

    # Include files without extension that might be scripts or configs
    if not file_extension and not file_name.startswith('.'):
        return True

    return file_extension in include_extensions or file_name.startswith('.')

def is_text_file(filepath):
    """
    Check if a file is a text file by trying to read it.
    """
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            f.read(1024)  # Read first 1KB
        return True
    except (UnicodeDecodeError, IOError):
        return False

def export_project(root_dir='.', output_file='project_export.txt'):
    """
    Export all relevant project files to a single text file.
    """
    root_path = Path(root_dir).resolve()
    output_path = Path(output_file)

    print(f"Exporting project from: {root_path}")
    print(f"Output file: {output_path}")

    file_count = 0
    total_size = 0

    with open(output_path, 'w', encoding='utf-8') as out_file:
        # Write header
        out_file.write("=" * 80 + "\n")
        out_file.write("PROJECT EXPORT\n")
        out_file.write(f"Root Directory: {root_path}\n")
        out_file.write(f"Generated: {os.path.basename(__file__)}\n")
        out_file.write("=" * 80 + "\n\n")

        # Walk through directory tree
        def should_traverse_dir(dirpath):
            """Check if we should traverse this directory"""
            rel_path = os.path.relpath(dirpath, root_path)
            norm_rel_path = rel_path.replace('\\', '/')
            # Check for complete excluded paths
            for exclude_start in exclude_path_starts:
                if norm_rel_path.startswith(exclude_start):
                    return False
            return True

        for root, dirs, files in os.walk(root_path):
            # Filter directories in-place to avoid traversing excluded dirs
            dirs[:] = [d for d in dirs if should_include_file(os.path.join(root, d)) and should_traverse_dir(os.path.join(root, d))]

            for file in files:
                filepath = os.path.join(root, file)

                if should_include_file(filepath):
                    try:
                        # Get relative path for cleaner output
                        rel_path = os.path.relpath(filepath, root_path)

                        if is_text_file(filepath):
                            with open(filepath, 'r', encoding='utf-8') as f:
                                content = f.read()

                            file_size = len(content.encode('utf-8'))
                            total_size += file_size
                            file_count += 1

                            # Write file header
                            out_file.write("-" * 80 + "\n")
                            out_file.write(f"FILE: {rel_path}\n")
                            out_file.write(f"SIZE: {file_size} bytes\n")
                            out_file.write("-" * 80 + "\n")

                            # Write file content
                            out_file.write(content)
                            out_file.write("\n\n")

                            print(f"Exported: {rel_path} ({file_size} bytes)")
                        else:
                            out_file.write("-" * 80 + "\n")
                            out_file.write(f"FILE: {rel_path}\n")
                            out_file.write("TYPE: Binary file (skipped)\n")
                            out_file.write("-" * 80 + "\n\n")
                            print(f"Skipped (binary): {rel_path}")

                    except Exception as e:
                        out_file.write("-" * 80 + "\n")
                        out_file.write(f"FILE: {rel_path}\n")
                        out_file.write(f"ERROR: {str(e)}\n")
                        out_file.write("-" * 80 + "\n\n")
                        print(f"Error reading: {rel_path} - {str(e)}")

    # Write summary
    with open(output_path, 'a', encoding='utf-8') as out_file:
        out_file.write("=" * 80 + "\n")
        out_file.write("EXPORT SUMMARY\n")
        out_file.write(f"Files exported: {file_count}\n")
        out_file.write(f"Total size: {total_size} bytes ({total_size/1024:.1f} KB)\n")
        out_file.write("=" * 80 + "\n")

    print(f"\nExport complete!")
    print(f"Files exported: {file_count}")
    print(f"Total size: {total_size} bytes ({total_size/1024:.1f} KB)")
    print(f"Output saved to: {output_path}")

def main():
    """
    Main function to run the exporter.
    """
    if len(sys.argv) > 1:
        root_dir = sys.argv[1]
    else:
        root_dir = '.'

    if len(sys.argv) > 2:
        output_file = sys.argv[2]
    else:
        output_file = 'project_export.txt'

    export_project(root_dir, output_file)

if __name__ == '__main__':
    main()
