import {app} from "../../../scripts/app.js";
import App from "@/App.vue";

const {ComfyButton} = window.comfyAPI.button


app.registerExtension({
    name: 'ComfyUI.OpenCut.TopMenu',
    setup() {
        function openOpenCut() {
            app.extensionManager?.dialog.showExtensionDialog({
                key: "global-opencut",
                title: "ComfyUI OpenCut",
                component: App,
                dialogComponentProps: {
                    style: "width: 80vw; height: 80vh;",
                    maximizable: !0
                }
            });
        }

        app.menu?.settingsGroup.append(
            new ComfyButton({
                icon: 'video',
                tooltip: 'comfyui-opencut',
                content: 'OpenCut',
                action: openOpenCut,
            }),
        )
    },
})