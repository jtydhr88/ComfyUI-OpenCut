class ComfyUIOpenCut:
    def __init__(self):
        pass

    @classmethod
    def INPUT_TYPES(s):
        return {
            "required": {
            },
        }

    RETURN_TYPES = ()

    FUNCTION = "run"

    OUTPUT_NODE = True

    CATEGORY = "OpenCut"

    def run(self,  **kwargs):
        return None,

NODE_CLASS_MAPPINGS = {
    "ComfyUIOpenCut": ComfyUIOpenCut
}

NODE_DISPLAY_NAME_MAPPINGS = {
    "ComfyUIOpenCut": "OpenCut"
}