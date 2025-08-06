from .ComfyUIOpenCut import NODE_CLASS_MAPPINGS
import os
import nodes
from aiohttp import web
import importlib
import execution
import logging
from pathlib import Path
import uuid
import json
import datetime

js_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), "js")

nodes.EXTENSION_WEB_DIRS["ComfyUI-OpenCut"] = js_dir

__all__ = ['NODE_CLASS_MAPPINGS']

from server import PromptServer

routes = PromptServer.instance.routes

@routes.get('/opencut')
async def serve_opencut_index(request):
    opencut_path = Path(__file__).parent / 'opencut-ui' / 'index.html'
    if opencut_path.exists():
        return web.FileResponse(opencut_path)
    else:
        return web.Response(text="OpenCut UI not found", status=404)

@routes.get('/opencut/{path:.*}')
async def serve_opencut_static(request):
    path = request.match_info.get('path', '')

    if '..' in path or path.startswith('/'):
        return web.Response(text="Invalid path", status=400)

    opencut_path = Path(__file__).parent / 'opencut-ui' / path

    if opencut_path.is_dir():
        index_path = opencut_path / 'index.html'
        if index_path.exists():
            return web.FileResponse(index_path)

    if opencut_path.exists() and opencut_path.is_file():
        return web.FileResponse(opencut_path)

    if path.startswith('editor/') and '/' in path[7:]:
        editor_html_path = opencut_path.with_suffix('.html')
        if editor_html_path.exists() and editor_html_path.is_file():
            return web.FileResponse(editor_html_path)

    static_extensions = ['.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.ico', '.txt', '.map', '.woff', '.woff2', '.ttf', '.svg', '.json', '.webp']

    is_route = not any(path.endswith(ext) for ext in static_extensions) and not path.endswith('.html')
    
    if is_route:
        index_path = Path(__file__).parent / 'opencut-ui' / 'index.html'
        if index_path.exists():
            return web.FileResponse(index_path, headers={
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0'
            })

    return web.Response(text="File not found", status=404)

@routes.post('/opencut/api/projects')
async def create_project(request):
    try:
        data = await request.json()
        project_id = str(uuid.uuid4())
        project = {
            'id': project_id,
            'name': data.get('name', 'Untitled Project'),
            'createdAt': datetime.datetime.now().isoformat(),
            'updatedAt': datetime.datetime.now().isoformat()
        }
        return web.json_response(project)
    except Exception as e:
        return web.json_response({'error': str(e)}, status=500)

@routes.get('/opencut/api/projects/{project_id}')
async def get_project(request):
    project_id = request.match_info['project_id']
    project = {
        'id': project_id,
        'name': 'Sample Project',
        'createdAt': datetime.datetime.now().isoformat(),
        'updatedAt': datetime.datetime.now().isoformat()
    }
    return web.json_response(project)

@routes.put('/opencut/api/projects/{project_id}')
async def update_project(request):
    project_id = request.match_info['project_id']
    try:
        return web.json_response({'id': project_id, 'updated': True})
    except Exception as e:
        return web.json_response({'error': str(e)}, status=500)