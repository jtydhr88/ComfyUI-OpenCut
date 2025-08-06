import { app as s } from "../../../scripts/app.js";
import { defineComponent as f, ref as r, watch as m, onMounted as p, onBeforeUnmount as v, createElementBlock as d, openBlock as C, createElementVNode as c } from "vue";
const _ = /* @__PURE__ */ f({
  __name: "App",
  setup(l) {
    const e = r(), o = r(), i = r(!1), a = r(null), u = () => {
      var n;
      if ((n = e.value) != null && n.parentElement) {
        const t = e.value.parentElement;
        i.value ? t.classList.remove("h-full") : t.classList.add("h-full");
      }
    };
    return m(i, () => {
      u();
    }), p(async () => {
      e.value && (u(), a.value = new MutationObserver((n) => {
        n.forEach((t) => {
          t.type === "attributes" && t.attributeName === "maximized" && (i.value = t.target.getAttribute("maximized") === "true");
        });
      }), a.value.observe(e.value, {
        attributes: !0,
        attributeFilter: ["maximized"]
      }));
    }), v(() => {
      var n;
      (n = e.value) != null && n.parentElement && e.value.parentElement.classList.remove("h-full"), a.value && (a.value.disconnect(), a.value = null);
    }), (n, t) => (C(), d("div", {
      ref_key: "viewerContentRef",
      ref: e,
      class: "flex w-full h-full"
    }, [
      c("div", {
        ref_key: "mainContentRef",
        ref: o,
        class: "flex-1 relative"
      }, t[0] || (t[0] = [
        c("iframe", {
          src: "/opencut",
          class: "demo-iframe h-full w-full"
        }, null, -1)
      ]), 512)
    ], 512));
  }
}), w = (l, e) => {
  const o = l.__vccOpts || l;
  for (const [i, a] of e)
    o[i] = a;
  return o;
}, x = /* @__PURE__ */ w(_, [["__scopeId", "data-v-5772e9c3"]]), { ComfyButton: y } = window.comfyAPI.button;
s.registerExtension({
  name: "ComfyUI.OpenCut.TopMenu",
  setup() {
    var e;
    function l() {
      var o;
      (o = s.extensionManager) == null || o.dialog.showExtensionDialog({
        key: "global-opencut",
        title: "ComfyUI OpenCut",
        component: x,
        dialogComponentProps: {
          style: "width: 80vw; height: 80vh;",
          maximizable: !0
        }
      });
    }
    (e = s.menu) == null || e.settingsGroup.append(
      new y({
        icon: "video",
        tooltip: "comfyui-opencut",
        content: "OpenCut",
        action: l
      })
    );
  }
});
