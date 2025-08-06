import { app as l } from "../../../scripts/app.js";
import { defineComponent as c, ref as r, onMounted as f, onBeforeUnmount as m, createElementBlock as p, openBlock as v, normalizeClass as d, createElementVNode as s } from "vue";
const C = /* @__PURE__ */ c({
  __name: "App",
  setup(i) {
    const e = r(), t = r(), a = r(!1), n = r(null);
    return f(async () => {
      e.value && (n.value = new MutationObserver((u) => {
        u.forEach((o) => {
          o.type === "attributes" && o.attributeName === "maximized" && (a.value = o.target.getAttribute("maximized") === "true");
        });
      }), n.value.observe(e.value, {
        attributes: !0,
        attributeFilter: ["maximized"]
      }));
    }), m(() => {
      n.value && (n.value.disconnect(), n.value = null);
    }), (u, o) => (v(), p("div", {
      ref_key: "viewerContentRef",
      ref: e,
      class: d(["flex w-full", [a.value ? "h-full" : "h-[70vh]"]])
    }, [
      s("div", {
        ref_key: "mainContentRef",
        ref: t,
        class: "flex-1 relative"
      }, o[0] || (o[0] = [
        s("iframe", {
          src: "/opencut",
          class: "demo-iframe h-full w-full"
        }, null, -1)
      ]), 512)
    ], 2));
  }
}), _ = (i, e) => {
  const t = i.__vccOpts || i;
  for (const [a, n] of e)
    t[a] = n;
  return t;
}, x = /* @__PURE__ */ _(C, [["__scopeId", "data-v-879fc492"]]), { ComfyButton: y } = window.comfyAPI.button;
l.registerExtension({
  name: "ComfyUI.OpenCut.TopMenu",
  setup() {
    var e;
    function i() {
      var t;
      (t = l.extensionManager) == null || t.dialog.showExtensionDialog({
        key: "global-opencut",
        title: "ComfyUI OpenCut",
        component: x,
        dialogComponentProps: {
          style: "width: 80vw; height: 80vh;",
          maximizable: !0
        }
      });
    }
    (e = l.menu) == null || e.settingsGroup.append(
      new y({
        icon: "video",
        tooltip: "comfyui-opencut",
        content: "OpenCut",
        action: i
      })
    );
  }
});
